const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Course = require('../models/Course');

// POST /api/enroll
// Enroll a user by email into a course (simulated payment)
const enrollUser = async (req, res) => {
  const { name, email, courseId } = req.body;

  if (!name || !email || !courseId) {
    return res.status(400).json({ message: 'Name, email and courseId are required.' });
  }

  try {
    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Find user by email (if they have an account)
    let user = await User.findOne({ email: email.toLowerCase().trim() });

    // If user doesn't have an account yet, we still store enrollment by email
    // We'll create a pending enrollment record with the email
    if (user) {
      // Check if already enrolled
      const existing = await Enrollment.findOne({ user: user._id, course: courseId });
      if (existing) {
        return res.status(200).json({ message: 'Already enrolled', alreadyEnrolled: true });
      }

      // Create enrollment linked to user account
      const enrollment = await Enrollment.create({
        user: user._id,
        course: courseId,
        progress: 0,
        lessonsLeft: 0,
        active: true,
        enrolledEmail: email.toLowerCase().trim(),
        enrolledName: name,
      });

      // Increment studentsCount on course
      await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });

      return res.status(201).json({ message: 'Enrollment successful!', enrollment });
    } else {
      // User doesn't have an account yet - store email-based enrollment
      // When they sign up later with this email, enrollment will be linked
      const PendingEnrollment = require('../models/PendingEnrollment');
      
      // Check if already pending
      const existing = await PendingEnrollment.findOne({ email: email.toLowerCase().trim(), course: courseId });
      if (existing) {
        return res.status(200).json({ message: 'Already enrolled', alreadyEnrolled: true });
      }

      const pending = await PendingEnrollment.create({
        email: email.toLowerCase().trim(),
        name,
        course: courseId,
      });

      await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });

      return res.status(201).json({ message: 'Enrollment pending - will activate on login!', pending });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/enroll/my-courses?email=xxx
// Get enrolled courses for a user by email (used in dashboard)
const getEnrolledCourses = async (req, res) => {
  const { email, firebaseUid } = req.query;

  try {
    let user = null;

    if (firebaseUid) {
      user = await User.findOne({ firebaseUid });
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    }

    if (!user) {
      return res.status(200).json({ courses: [] });
    }

    // Get enrollments for this user
    const enrollments = await Enrollment.find({ user: user._id, active: true })
      .populate('course')
      .sort({ createdAt: -1 });

    const courses = enrollments
      .filter(e => e.course) // filter out deleted courses
      .map(e => ({
        ...e.course.toObject(),
        progress: e.progress,
        lessonsLeft: e.lessonsLeft,
        enrolledAt: e.createdAt,
      }));

    res.status(200).json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { enrollUser, getEnrolledCourses };
