const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const {
  requireAdmin,
  getStats,
  getUsers,
  updateUserRole,
  deleteUser,
  getCourses,
  deleteCourse,
  getEnrollments,
} = require('../controllers/adminController');

// All routes require Firebase auth + admin role
router.use(verifyFirebaseToken, requireAdmin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/courses', getCourses);
router.delete('/courses/:id', deleteCourse);
router.get('/enrollments', getEnrollments);

module.exports = router;
