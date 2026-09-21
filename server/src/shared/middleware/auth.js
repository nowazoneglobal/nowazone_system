const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../../modules/auth/models/User');
const redisClient = require('../config/redis');

// ─── Authentication ────────────────────────────────────────────────────────────

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new AppError('Not authorized — no token provided', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Reject temp 2FA tokens used against protected routes
    if (decoded.temp) {
      return next(new AppError('Complete 2FA verification first', 401));
    }

    // Check token blacklist (populated on logout)
    const blacklisted = await redisClient.get(`blacklist:${token}`);
    if (blacklisted) {
      return next(new AppError('Token has been revoked', 401));
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      return next(new AppError('User no longer exists or is inactive', 401));
    }
    if (user.tokenInvalidBefore && decoded.iat && decoded.iat * 1000 < user.tokenInvalidBefore.getTime()) {
      return next(new AppError('Session has been revoked. Please login again.', 401));
    }

    req.user  = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError')  return next(new AppError('Invalid token', 401));
    if (error.name === 'TokenExpiredError')  return next(new AppError('Token expired', 401));
    next(error);
  }
};

const getAllowedOrigins = () => {
  const envOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
  return Array.from(
    new Set([
      ...envOrigins,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
      'http://localhost:2424',
      'http://127.0.0.1:2424',
      'https://systems.nowazone.com',
      'https://www.nowazone.com',
      'https://nowazone.com',
      'https://nowazone-system.vercel.app',
    ])
  );
};

const isPublicRoute = (path) => {
  const clean = (path || '').split('?')[0];
  return (
    clean.startsWith('/api/forms/contact') ||
    clean.startsWith('/api/forms/assessment') ||
    clean.startsWith('/api/forms/appointment') ||
    clean.startsWith('/api/forms/download') ||
    clean.startsWith('/api/subscribers/subscribe') ||
    clean.startsWith('/api/subscribers/unsubscribe') ||
    clean.startsWith('/api/jobs/upload-resume') ||
    clean.startsWith('/api/jobs/public/submit-profile') ||
    /\/api\/jobs\/[^/]+\/apply/.test(clean) ||
    clean.startsWith('/api/auth/login') ||
    clean.startsWith('/api/auth/register') ||
    clean.startsWith('/api/auth/forgot-password') ||
    clean.startsWith('/api/auth/reset-password') ||
    clean.startsWith('/api/auth/google') ||
    clean.startsWith('/api/auth/github') ||
    clean.startsWith('/api/auth/linkedin') ||
    clean.startsWith('/api/auth/refresh') ||
    clean.startsWith('/api/auth/logout') ||
    clean.startsWith('/api/crm/leads/public') ||
    clean.startsWith('/api/settings/public') ||
    clean.startsWith('/api/chatbot/public')
  );
};

const csrfProtection = (req, res, next) => {
  // Safe methods are CSRF-immune
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  // Public form submission and unauthenticated auth routes bypass CSRF
  const reqPath = req.originalUrl || req.path || '';
  if (isPublicRoute(reqPath)) return next();

  // Bearer-authenticated clients (API / mobile) handle CSRF via token secrecy
  if (req.headers.authorization?.startsWith('Bearer ')) return next();

  // No auth cookie means the request is unauthenticated — no session to hijack
  if (!req.cookies?.accessToken) return next();

  const csrfCookie  = req.cookies['csrf-token'];
  const csrfHeader  = req.headers['x-csrf-token'];

  // If double-submit token pair is supplied, validate it securely
  if (csrfCookie && csrfHeader) {
    const cookieBuf = Buffer.from(csrfCookie);
    const headerBuf = Buffer.from(csrfHeader);

    if (
      cookieBuf.length === headerBuf.length &&
      crypto.timingSafeEqual(cookieBuf, headerBuf)
    ) {
      return next();
    }
    return next(new AppError('CSRF token mismatch', 403));
  }

  // For cross-origin SPAs where JavaScript cannot read cookies from a different backend domain,
  // origin verification against allowed origins provides the CSRF defense
  let origin = req.headers.origin;
  if (!origin && req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin;
    } catch {
      origin = undefined;
    }
  }

  if (origin && getAllowedOrigins().includes(origin.toLowerCase())) {
    return next();
  }

  return next(new AppError('CSRF token missing', 403));
};

// ─── Authorisation ─────────────────────────────────────────────────────────────

/** Permission-based access control.
 *  super_admin is always granted. Pass individual permission strings. */
const authorize = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) return next(new AppError('Not authorized', 401));

    const userRoles = req.user.roles?.length ? req.user.roles : (req.user.role ? [req.user.role] : []);
    if (userRoles.includes('super_admin')) return next();

    const hasPermission = permissions.some((p) => req.user.permissions.includes(p));
    if (!hasPermission) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};

/** Role-based access control. super_admin always passes. */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new AppError('Not authorized', 401));
    const userRoles = req.user.roles?.length ? req.user.roles : (req.user.role ? [req.user.role] : []);
    if (userRoles.includes('super_admin')) return next();

    const hasRole = roles.some((r) => userRoles.includes(r));
    if (!hasRole) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

module.exports = { protect, csrfProtection, authorize, restrictTo };
