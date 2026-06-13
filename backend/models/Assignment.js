const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
