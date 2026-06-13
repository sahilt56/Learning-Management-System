const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  group: {
    type: String, // 'TODAY', 'THIS WEEK', 'UPCOMING'
    required: true
  },
  icon: {
    type: String, // e.g. "Mic", "FileText", "Clock"
    default: "FileText"
  },
  iconBg: {
    type: String,
    default: "bg-blue-100"
  },
  iconColor: {
    type: String,
    default: "text-blue-500"
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
