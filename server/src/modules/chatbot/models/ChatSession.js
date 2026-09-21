const mongoose = require('mongoose');

const sessionMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'bot', 'agent'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ['faq', 'fallback', 'escalation_notice', 'system'],
      default: 'system',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    faqId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatbotFaq',
      default: null,
    },
  },
  { timestamps: true }
);

const chatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    channel: {
      type: String,
      enum: ['dashboard', 'widget', 'api'],
      default: 'dashboard',
    },
    status: {
      type: String,
      enum: ['open', 'escalated', 'resolved', 'closed'],
      default: 'open',
    },
    escalatedTicketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      default: null,
    },
    visitorName: {
      type: String,
      default: 'Website Visitor',
    },
    visitorEmail: {
      type: String,
      default: null,
    },
    visitorPhone: {
      type: String,
      default: null,
    },
    pageUrl: {
      type: String,
      default: '/',
    },
    lastMessage: {
      type: String,
      default: '',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    unreadByAdmin: {
      type: Number,
      default: 0,
    },
    unreadByClient: {
      type: Number,
      default: 0,
    },
    messages: [sessionMessageSchema],
  },
  { timestamps: true }
);

chatSessionSchema.index({ user: 1, status: 1, lastMessageAt: -1 });
chatSessionSchema.index({ channel: 1, status: 1, lastMessageAt: -1 });

module.exports = mongoose.model('ChatSession', chatSessionSchema);

