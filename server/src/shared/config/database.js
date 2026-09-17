const mongoose = require('mongoose');
const ChatbotFaq = require('../../modules/chatbot/models/ChatbotFaq');
const ChatbotConfig = require('../../modules/chatbot/models/ChatbotConfig');

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('[Database] WARNING: MONGODB_URI environment variable is not defined! Configure it in Cloud Run Variables & Secrets.');
    return null;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);

    // Ensure indexes are in sync
    ChatbotFaq.syncIndexes().catch((err) => {
      console.error('[Database] Failed to sync ChatbotFaq indexes:', err.message);
    });

    // Ensure chatbot config defaults
    ChatbotConfig.updateOne(
      {},
      { $set: { minConfidence: 0.3, temperature: 0.5 } }
    ).catch((err) => {
      console.error('[Database] Failed to patch ChatbotConfig:', err.message);
    });

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('[Database] MongoDB disconnected. Attempting reconnection...');
    });

    return conn;
  } catch (error) {
    isConnected = false;
    console.error('[Database] Database connection failed:', error.message);
    console.warn('[Database] Retrying connection in 5 seconds...');
    // Retry in background without killing the container
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
module.exports.isConnected = () => isConnected || mongoose.connection.readyState === 1;
