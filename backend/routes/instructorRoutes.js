const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getDashboard, 
  getAnalytics, 
  createAssignment, 
  getSubmissions, 
  getLiveClasses, 
  createLiveClass, 
  seedInstructorData,
  getInstructorCourses,
  updateCourse,
  getClassrooms,
  createClassroom,
  deleteClassroom
} = require('../controllers/instructorController');
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// GET route to fetch instructor courses
router.get('/courses', verifyFirebaseToken, getInstructorCourses);

// POST route to create a course with image upload
router.post('/courses', verifyFirebaseToken, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'teacherPhoto', maxCount: 1 }]), createCourse);

// PUT route to update a course
router.put('/courses/:id', verifyFirebaseToken, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'teacherPhoto', maxCount: 1 }]), updateCourse);

// Dashboard routes
router.get('/dashboard', verifyFirebaseToken, getDashboard);
router.get('/analytics', verifyFirebaseToken, getAnalytics);

// Assignment routes
router.post('/assignments', verifyFirebaseToken, createAssignment);
router.get('/submissions', verifyFirebaseToken, getSubmissions);

// Live Classes routes
router.get('/live-classes', verifyFirebaseToken, getLiveClasses);
router.post('/live-classes', verifyFirebaseToken, createLiveClass);

// Classroom routes
router.get('/classrooms', verifyFirebaseToken, getClassrooms);
router.post('/classrooms', verifyFirebaseToken, createClassroom);
router.delete('/classrooms/:id', verifyFirebaseToken, deleteClassroom);

// Seed Data
router.post('/seed', verifyFirebaseToken, seedInstructorData);

module.exports = router;
