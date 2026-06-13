const express = require('express');
const router = express.Router();
const { enrollUser, getEnrolledCourses } = require('../controllers/enrollmentController');

// POST /api/enroll - Enroll user (simulate payment)
router.post('/', enrollUser);

// GET /api/enroll/my-courses - Get enrolled courses for dashboard
router.get('/my-courses', getEnrolledCourses);

module.exports = router;
