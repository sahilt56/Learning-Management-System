const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all public courses (e.g. for Home Page)
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('instructor', 'name profilePicture headline')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: 'Server Error fetching courses' });
  }
};

// @desc    Get single course details
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name profilePicture headline');
      
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: 'Server Error fetching course details' });
  }
};

module.exports = {
  getCourses,
  getCourseById
};
