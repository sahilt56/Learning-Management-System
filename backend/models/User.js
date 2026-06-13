const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  headline: {
    type: String,
    default: 'Instructor',
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise', 'none'],
    default: 'none',
  },
  // Add other fields as necessary (e.g., enrolledCourses)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
