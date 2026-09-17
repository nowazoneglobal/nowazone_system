require('dotenv').config();
const dns = require('dns');

// Fix for Windows / ISP DNS blocking MongoDB SRV queries (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if unsupported in environment
}

const mongoose = require('mongoose');
const User = require('../modules/auth/models/User');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is undefined in .env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const resetSuperAdmin = async () => {
  try {
    await connectDB();

    // Support CLI arguments: node seedSuperAdmin.js <email> <password>
    // OR environment variables: SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD
    const args = process.argv.slice(2);
    const email = (args[0] || process.env.SUPER_ADMIN_EMAIL || 'admin@nowazone.com').trim().toLowerCase();
    const password = args[1] || process.env.SUPER_ADMIN_PASSWORD || 'Nowazone@Admin2026!';

    console.log(`\n🔑 Resetting/Seeding Super Admin account for: ${email}`);

    let user = await User.findOne({ email }).select('+password +failedLoginAttempts +lockoutUntil');

    if (user) {
      user.password = password;
      user.role = 'super_admin';
      user.roles = ['super_admin'];
      user.permissions = ['*'];
      user.isActive = true;
      user.failedLoginAttempts = 0;
      user.lockoutUntil = null;
      user.tokenInvalidBefore = new Date();

      await user.save();
      console.log(`\n🎉 SUCCESS: Super Admin password has been RESET successfully!`);
    } else {
      user = new User({
        name: 'Super Admin',
        email,
        password,
        role: 'super_admin',
        roles: ['super_admin'],
        permissions: ['*'],
        isActive: true,
      });

      await user.save();
      console.log(`\n🚀 SUCCESS: New Super Admin user created successfully!`);
    }

    console.log(`--------------------------------------------------`);
    console.log(` Email:    ${email}`);
    console.log(` Password: ${password}`);
    console.log(` Role:     super_admin`);
    console.log(` Status:   Active (Lockout cleared)`);
    console.log(`--------------------------------------------------\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting Super Admin:', error.message);
    process.exit(1);
  }
};

resetSuperAdmin();
