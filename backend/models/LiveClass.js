const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  classId: {
    type: String,
    required: true,
    unique: true
  },
  joinedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  topic: {
    type: String,
    required: true
  },
  date: {
    type: String, // e.g. "2023-12-25"
    required: true
  },
  time: {
    type: String, // e.g. "14:30"
    required: true
  },
  meetingLink: {
    type: String,
    required: true
  },
  expectedStudents: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);
