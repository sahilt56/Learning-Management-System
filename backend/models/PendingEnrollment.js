const mongoose = require('mongoose');

const pendingEnrollmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  activated: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('PendingEnrollment', pendingEnrollmentSchema);
