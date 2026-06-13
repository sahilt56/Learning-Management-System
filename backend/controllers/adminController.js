const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Middleware: Check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required.' });
    }
    req.dbUser = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/stats - Dashboard overview stats
const getStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalEnrollments, students, instructors] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Enrollment.countDocuments({ active: true }),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'instructor' }),
    ]);

    // Recent enrollments (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentEnrollments = await Enrollment.countDocuments({
      active: true,
      createdAt: { $gte: thirtyDaysAgo },
    });

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      students,
      instructors,
      recentEnrollments,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/users - Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';

    const query = {};
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    if (role) query.role = role;

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      User.countDocuments(query),
    ]);

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/admin/users/:id/role - Change user role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/admin/users/:id - Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ user: req.params.id });
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/courses - Get all courses
const getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const query = search ? { title: { $regex: search, $options: 'i' } } : {};

    const [courses, total] = await Promise.all([
      Course.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Course.countDocuments(query),
    ]);

    res.json({ courses, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/admin/courses/:id - Delete course
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ course: req.params.id });
    res.json({ message: 'Course deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/enrollments - Get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const [enrollments, total] = await Promise.all([
      Enrollment.find({ active: true })
        .populate('user', 'name email profilePicture')
        .populate('course', 'title thumbnailUrl price category')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Enrollment.countDocuments({ active: true }),
    ]);

    res.json({ enrollments, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  requireAdmin,
  getStats,
  getUsers,
  updateUserRole,
  deleteUser,
  getCourses,
  deleteCourse,
  getEnrollments,
};
