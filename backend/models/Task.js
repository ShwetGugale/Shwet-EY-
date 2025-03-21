const mongoose = require('mongoose');
const { create } = require('./Project');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  stage: { type: String, enum: ['Requested', 'To do', 'In Progress', 'Done'], default: 'Requested' },
  order: { type: Number, default: 0 },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);