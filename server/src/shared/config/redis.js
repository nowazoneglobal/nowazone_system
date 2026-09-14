const Redis = require('ioredis');

function isRedisEnabled() {
  if (process.env.ENABLE_REDIS === 'false') return false;
  if (process.env.ENABLE_REDIS === 'true') return true;
  if (
    process.env.REDIS_OPTIONAL === 'true' &&
    (!process.env.REDIS_HOST || process.env.REDIS_HOST === 'your-redis-hostname')
  ) {
    return false;
  }
  if (process.env.REDIS_HOST === 'your-redis-hostname') return false;
  return Boolean(process.env.REDIS_HOST);
}

/**
 * In-memory fallback for environments without Redis.
 * Supports get, set, setex, del, and keys with TTL expiration.
 */
class InMemoryRedisClient {
  constructor() {
    this.storage = new Map();
    this.status = 'ready';
    this.isFallback = true;
  }

  async get(key) {
    const item = this.storage.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.storage.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key, value) {
    this.storage.set(key, { value: String(value), expiresAt: null });
    return 'OK';
  }

  async setex(key, seconds, value) {
    const expiresAt = Date.now() + Number(seconds) * 1000;
    this.storage.set(key, { value: String(value), expiresAt });
    return 'OK';
  }

  async del(...keys) {
    const flatKeys = Array.isArray(keys[0]) ? keys[0] : keys;
    let count = 0;
    for (const k of flatKeys) {
      if (this.storage.delete(k)) count++;
    }
    return count;
  }

  async keys(pattern = '*') {
    const now = Date.now();
    const result = [];
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
    const regex = new RegExp(`^${escaped}$`);
    for (const [key, item] of this.storage.entries()) {
      if (item.expiresAt && now > item.expiresAt) {
        this.storage.delete(key);
        continue;
      }
      if (regex.test(key)) {
        result.push(key);
      }
    }
    return result;
  }

  on() {
    return this;
  }

  once() {
    return this;
  }

  off() {
    return this;
  }

  removeListener() {
    return this;
  }

  quit() {
    return Promise.resolve('OK');
  }

  disconnect() {}
}

let redisClient;

if (!isRedisEnabled()) {
  console.log('[Redis] Running in standalone in-memory mode (Redis skipped).');
  redisClient = new InMemoryRedisClient();
} else {
  const host = process.env.REDIS_HOST || 'localhost';
  const isTLS = host.includes('upstash.io') || process.env.REDIS_TLS === 'true';

  redisClient = new Redis({
    host,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    ...(isTLS && { tls: {} }),
    retryStrategy: (times) => {
      if (times > 5) {
        console.warn('[Redis] Max retries reached. Stopping reconnection attempts.');
        return null;
      }
      return Math.min(times * 100, 2000);
    },
    maxRetriesPerRequest: 3,
    enableOfflineQueue: false,
  });

  redisClient.on('connect', () => {
    console.log('[Redis] Connected successfully');
  });

  redisClient.on('error', (err) => {
    console.warn('[Redis] Connection error:', err.message);
  });
}

redisClient.isRedisEnabled = isRedisEnabled;
module.exports = redisClient;
module.exports.isRedisEnabled = isRedisEnabled;
