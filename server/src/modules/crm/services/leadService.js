const Lead = require('../models/Lead');
const User = require('../../auth/models/User');
const { AppError } = require('../../../shared/middleware/errorHandler');
const externalCrm = require('./externalCrmService');

class LeadService {
  async getLeads({ page, limit, status, assignedTo, followUpDue, search }) {
    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const query = {};
    if (search) {
      const literal = String(search).trim().slice(0, 200).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = ['name', 'email', 'company', 'phone'].map(field => ({ [field]: { $regex: literal, $options: 'i' } }));
    }
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    if (followUpDue === 'true' || followUpDue === true) {
      query.followUpAt = { $ne: null, $lte: new Date() };
    }

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .populate('assignedTo', 'name email')
        .sort({ score: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Lead.countDocuments(query),
    ]);

    return {
      leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async createLead(data, { session = null, reuseExisting = false } = {}) {
    const existingLead = await Lead.findOne({ email: data.email }).session(session);
    if (existingLead) {
      if (reuseExisting) return existingLead;
      throw new AppError('Lead with this email already exists', 400);
    }

    const salesReps = await User.find({ role: 'sales', isActive: true }).session(session);
    if (salesReps.length > 0) {
      const randomRep = salesReps[Math.floor(Math.random() * salesReps.length)];
      data.assignedTo = randomRep._id;
    }

    const [lead] = await Lead.create([data], { session });
    const populated = await lead.populate('assignedTo', 'name email');

    if (!session) this.syncLead(populated).catch(() => {});
    return populated;
  }

  async syncLead(populated) {
    if (!populated || populated.externalCrm?.syncStatus === 'synced') return;

    // Best-effort external CRM sync; never block lead creation on failure.
    return externalCrm.syncLead(populated.toObject())
      .then((crm) => {
        if (!crm) return;
        return Lead.findByIdAndUpdate(
          populated._id,
          {
            externalCrm: {
              provider: crm.provider,
              externalId: crm.externalId,
              syncStatus: 'synced',
              lastSyncAt: new Date(),
            },
          },
          { new: true }
        ).exec().catch(() => {});
      })
      .catch((err) => {
        Lead.findByIdAndUpdate(
          populated._id,
          {
            externalCrm: {
              provider: process.env.CRM_PROVIDER || 'hubspot',
              syncStatus: 'error',
              lastSyncAt: new Date(),
              lastError: err?.message || 'External CRM sync failed',
            },
          },
          { new: true }
        ).exec().catch(() => {});
      });

  }

  async getLeadById(id) {
    const lead = await Lead.findById(id).populate('assignedTo', 'name email');
    if (!lead) {
      throw new AppError('Lead not found', 404);
    }
    return lead;
  }

  async updateLead(id, data) {
    const lead = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('assignedTo', 'name email');

    if (!lead) {
      throw new AppError('Lead not found', 404);
    }

    return lead;
  }

  async deleteLead(id) {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      throw new AppError('Lead not found', 404);
    }
  }
}

module.exports = new LeadService();
