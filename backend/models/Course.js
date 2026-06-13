const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  professor: {
    type: String,
    required: true
  },
  icon: {
    type: String, // String to identify the lucide icon, e.g. "ClipboardList"
    default: "BookOpen"
  },
  bg: {
    type: String, // Tailwind class for background
    default: "bg-blue-100"
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'Development'
  },
  thumbnailUrl: {
    type: String, // URL from Cloudinary
  },
  customTeacherPhoto: {
    type: String, // URL
    required: true
  },
  teacherNames: {
    type: [String],
    required: true
  },
  originalPrice: {
    type: Number,
  },
  whatYouWillLearn: {
    type: [String],
    default: [
      "Build production-ready applications from scratch",
      "Master modern state management and hooks",
      "Implement robust authentication and authorization",
      "Deploy and scale your application globally",
      "Optimize performance and accessibility",
      "Follow industry best practices and design patterns"
    ]
  },
  level: {
    type: String,
    default: 'All Levels'
  },
  duration: {
    type: String,
  },
  badge: {
    type: String,
  },
  batchStartDate: {
    type: Date,
  },
  studentsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
