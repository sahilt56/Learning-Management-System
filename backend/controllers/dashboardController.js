const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Task = require('../models/Task');
const Achievement = require('../models/Achievement');
const ScheduleEvent = require('../models/ScheduleEvent');
const LiveClass = require('../models/LiveClass');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Classroom = require('../models/Classroom');

// @desc    Get dashboard overview data
// @route   GET /api/dashboard/overview
// @access  Private
const getOverview = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch enrollments with populated course details
    const enrollments = await Enrollment.find({ user: user._id }).populate('course');
    
    // Format courses for the frontend
    const courses = enrollments.map(en => ({
      title: en.course.title,
      professor: en.course.professor,
      icon: en.course.icon,
      bg: en.course.bg,
      progress: en.progress,
      lessonsLeft: en.lessonsLeft,
      active: en.active
    }));

    // Fetch tasks
    const tasksData = await Task.find({ user: user._id });
    const tasks = tasksData.map(t => ({
      title: t.title,
      subtitle: t.subtitle,
      group: t.group,
      icon: t.icon,
      iconBg: t.iconBg,
      iconColor: t.iconColor,
      active: t.active
    }));

    // Fetch achievements
    const achievementsData = await Achievement.find({ user: user._id });
    const achievements = achievementsData.map(a => ({
      title: a.title,
      bg: a.bg,
      border: a.border,
      buttonBg: a.buttonBg
    }));

    // Fetch schedule events
    const scheduleEvents = await ScheduleEvent.find({ user: user._id });
    const schedule = scheduleEvents.map(s => ({
      date: s.date,
      type: s.type
    }));

    // Fetch joined classrooms
    const classroomsData = await Classroom.find({ students: user._id }).populate('instructor', 'name');
    const classrooms = classroomsData.map(c => ({
      _id: c._id,
      name: c.name,
      classroomId: c.classroomId,
      instructor: c.instructor ? c.instructor.name : 'Unknown'
    }));

    res.json({
      courses,
      tasks,
      achievements,
      schedule,
      classrooms
    });
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    res.status(500).json({ message: 'Server Error fetching dashboard data' });
  }
};

// @desc    Seed database with dummy data for the user
// @route   POST /api/dashboard/seed
// @access  Private
const seedData = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear existing data for this user
    await Enrollment.deleteMany({ user: user._id });
    await Task.deleteMany({ user: user._id });
    await Achievement.deleteMany({ user: user._id });
    await ScheduleEvent.deleteMany({ user: user._id });

    // Seed Courses
    const course1 = await Course.findOneAndUpdate(
      { title: "Product Management" },
      { professor: "Linda Cruz", icon: "ClipboardList", bg: "bg-purple-100" },
      { upsert: true, returnDocument: 'after' }
    );
    const course2 = await Course.findOneAndUpdate(
      { title: "Advanced Geography" },
      { professor: "Linda Cruz", icon: "Globe", bg: "bg-orange-100" },
      { upsert: true, returnDocument: 'after' }
    );
    const course3 = await Course.findOneAndUpdate(
      { title: "Mass Communication" },
      { professor: "Jonathan Reyes", icon: "Megaphone", bg: "bg-red-100" },
      { upsert: true, returnDocument: 'after' }
    );

    // Seed Enrollments
    await Enrollment.create([
      { user: user._id, course: course1._id, progress: 65, lessonsLeft: 3 },
      { user: user._id, course: course2._id, progress: 85, lessonsLeft: 3, active: true },
      { user: user._id, course: course3._id, progress: 85, lessonsLeft: 3 }
    ]);

    // Seed Tasks
    await Task.create([
      { user: user._id, title: "Demo Speech", subtitle: "Mass Communication", group: "TODAY", dueDate: new Date(), icon: "Mic", iconBg: "bg-red-100", iconColor: "text-red-500" },
      { user: user._id, title: "Globalization Essay", subtitle: "Advanced Geography", group: "TODAY", dueDate: new Date(), icon: "FileText", iconBg: "bg-orange-100", iconColor: "text-orange-500" },
      { user: user._id, title: "Management Quiz", subtitle: "Product Management", group: "THIS WEEK", dueDate: new Date(), icon: "Clock", iconBg: "bg-purple-100", iconColor: "text-purple-500", active: true },
      { user: user._id, title: "Docu Reaction Paper", subtitle: "Advanced Geography", group: "THIS WEEK", dueDate: new Date(), icon: "FileText", iconBg: "bg-orange-100", iconColor: "text-orange-500" }
    ]);

    // Seed Achievements
    await Achievement.create([
      { user: user._id, title: "Inorganic Chemistry Certificate", bg: "bg-yellow-100", border: "border-yellow-400", buttonBg: "bg-yellow-400" },
      { user: user._id, title: "Social Philosophy Certificate", bg: "bg-purple-100", border: "border-purple-400", buttonBg: "bg-purple-400" }
    ]);

    // Seed Schedule Events (just marking some arbitrary dates for the calendar)
    const today = new Date();
    const d1 = new Date(today.getFullYear(), today.getMonth(), 11);
    const d2 = new Date(today.getFullYear(), today.getMonth(), 16);
    const d3 = new Date(today.getFullYear(), today.getMonth(), 19);

    await ScheduleEvent.create([
      { user: user._id, date: d1, type: "exam" },
      { user: user._id, date: d2, type: "class" },
      { user: user._id, date: d3, type: "class" }
    ]);

    res.json({ message: 'Dummy data seeded successfully!' });
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ message: 'Server Error while seeding data' });
  }
};

// @desc    Get live classes for enrolled courses
// @route   GET /api/dashboard/live-classes
// @access  Private
const getLiveClasses = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find courses the user is enrolled in
    const enrollments = await Enrollment.find({ user: user._id });
    const courseIds = enrollments.map(e => e.course);

    // Find classrooms the user has joined
    const joinedClassrooms = await Classroom.find({ students: user._id });
    const classroomIds = joinedClassrooms.map(c => c._id);

    // Find live classes for those courses OR classrooms OR where user joined manually
    const classes = await LiveClass.find({
      $or: [
        { course: { $in: courseIds } },
        { classroom: { $in: classroomIds } },
        { joinedStudents: user._id }
      ]
    })
      .populate('instructor', 'name')
      .populate('course', 'title icon bg')
      .populate('classroom', 'name')
      .sort({ date: 1, time: 1 });

    res.json(classes);
  } catch (error) {
    console.error("Error fetching live classes:", error);
    res.status(500).json({ message: 'Server Error fetching live classes' });
  }
};

// @desc    Join a live class by ID
// @route   POST /api/dashboard/live-classes/join
// @access  Private
const joinLiveClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const liveClass = await LiveClass.findOne({ classId: classId.toUpperCase() });
    if (!liveClass) {
      return res.status(404).json({ message: 'Class not found with this ID' });
    }

    if (liveClass.joinedStudents.includes(user._id)) {
      return res.status(400).json({ message: 'You have already joined this class' });
    }

    liveClass.joinedStudents.push(user._id);
    await liveClass.save();

    res.json({ message: 'Successfully joined the class!' });
  } catch (error) {
    console.error("Error joining live class:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get assignments for enrolled courses and joined classrooms
// @route   GET /api/dashboard/assignments
// @access  Private
const getAssignments = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Enrolled courses
    const enrollments = await Enrollment.find({ user: user._id });
    const courseIds = enrollments.map(e => e.course);

    // Joined classrooms
    const classrooms = await Classroom.find({ students: user._id });
    const classroomIds = classrooms.map(c => c._id);

    // Fetch assignments for both
    const assignments = await Assignment.find({
      $or: [
        { course: { $in: courseIds } },
        { classroom: { $in: classroomIds } }
      ]
    })
      .populate('course', 'title')
      .populate('classroom', 'name')
      .sort({ dueDate: 1 });

    // Fetch user submissions
    const submissions = await Submission.find({ student: user._id });
    const submittedIds = submissions.map(s => s.assignment.toString());

    // Group them
    const result = {
      todo: [],
      inProgress: [],
      submitted: []
    };

    assignments.forEach(a => {
      const isSubmitted = submittedIds.includes(a._id.toString());
      if (isSubmitted) {
        result.submitted.push(a);
      } else {
        result.todo.push(a);
      }
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Submit an assignment
// @route   POST /api/dashboard/assignments/submit
// @access  Private
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, fileUrl } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const existingSubmission = await Submission.findOne({ assignment: assignmentId, student: user._id });
    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment' });
    }

    await Submission.create({
      assignment: assignmentId,
      student: user._id,
      instructor: assignment.instructor,
      fileUrl: fileUrl || 'https://example.com/dummy.pdf', // Normally uploaded file URL
      status: 'Submitted'
    });

    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get student's joined classrooms
// @route   GET /api/dashboard/classrooms
// @access  Private
const getClassrooms = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const classrooms = await Classroom.find({ students: user._id }).populate('instructor', 'name');
    res.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Join a classroom by ID
// @route   POST /api/dashboard/classrooms/join
// @access  Private
const joinClassroom = async (req, res) => {
  try {
    const { classroomId } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const classroom = await Classroom.findOne({ classroomId: classroomId.toUpperCase() });
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found with this ID' });
    }

    if (classroom.students.includes(user._id)) {
      return res.status(400).json({ message: 'You have already joined this classroom' });
    }

    classroom.students.push(user._id);
    await classroom.save();

    res.json({ message: 'Successfully joined the classroom!' });
  } catch (error) {
    console.error("Error joining classroom:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getOverview,
  seedData,
  getLiveClasses,
  joinLiveClass,
  getAssignments,
  submitAssignment,
  getClassrooms,
  joinClassroom
};
