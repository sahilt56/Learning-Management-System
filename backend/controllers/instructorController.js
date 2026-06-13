const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const LiveClass = require('../models/LiveClass');
const Classroom = require('../models/Classroom');

// @desc    Create a new course
// @route   POST /api/instructor/courses
// @access  Private (Instructor only ideally, but we'll use verifyFirebaseToken)
const createCourse = async (req, res) => {
  try {
    const { title, description, price, originalPrice, category, level, duration, badge, teacherNames, whatYouWillLearn, batchStartDate } = req.body;
    
    // Find the user by Firebase UID
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if images were uploaded via Multer and Cloudinary
    let thumbnailUrl = '';
    let customTeacherPhoto = '';
    if (req.files) {
      if (req.files['coverImage'] && req.files['coverImage'][0]) {
        thumbnailUrl = req.files['coverImage'][0].path;
      }
      if (req.files['teacherPhoto'] && req.files['teacherPhoto'][0]) {
        customTeacherPhoto = req.files['teacherPhoto'][0].path;
      }
    }

    // Assign a random icon and color for the CourseGrid display based on category or just random
    const icons = ['ClipboardList', 'Globe', 'Megaphone', 'BookOpen', 'FileText'];
    const bgs = ['bg-purple-100', 'bg-blue-100', 'bg-red-100', 'bg-orange-100', 'bg-green-100'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomBg = bgs[Math.floor(Math.random() * bgs.length)];

    // Create the new course
    const newCourse = await Course.create({
      title,
      description,
      price: price || 0,
      originalPrice: originalPrice || 0,
      category,
      level: level || 'All Levels',
      duration: duration || 'Not specified',
      badge: badge || '',
      batchStartDate: batchStartDate ? new Date(batchStartDate) : undefined,
      whatYouWillLearn: whatYouWillLearn ? JSON.parse(whatYouWillLearn) : undefined,
      teacherNames: teacherNames ? JSON.parse(teacherNames) : [user.name],
      customTeacherPhoto,
      thumbnailUrl,
      instructor: user._id,
      professor: user.name, // Ensure professor name is also saved correctly
      icon: randomIcon,
      bg: randomBg
    });

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: 'Server Error while creating course' });
  }
};

// @desc    Get Instructor Dashboard Overview Stats
// @route   GET /api/instructor/dashboard
const getDashboard = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const activeCourses = await Course.countDocuments({ instructor: user._id });
    const totalEnrollments = 0; // Temporarily 0 until actual enrollment schema logic is tied to instructor
    const totalRevenue = 0;

    const chartData = [];

    const topCourses = await Course.find({ instructor: user._id }).limit(3);
    const formattedTopCourses = topCourses.map(c => ({
      title: c.title,
      enrollments: 0,
      revenue: '$0'
    }));

    res.json({
      totalEnrollments,
      enrollmentGrowth: 0,
      activeCourses,
      courseGrowth: 0,
      totalRevenue: `$${totalRevenue.toLocaleString()}`,
      revenueGrowth: 0,
      chartData,
      topCourses: formattedTopCourses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get Student Analytics
// @route   GET /api/instructor/analytics
const getAnalytics = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Mock analytics for the charts
    const performanceData = [];
    const attendanceData = [];
    const studentList = [];

    res.json({ performanceData, attendanceData, studentList });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create Assignment
// @route   POST /api/instructor/assignments
const createAssignment = async (req, res) => {
  try {
    const { title, instructions, dueDate, courseId, classroomId } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    const assignmentData = {
      instructor: user._id,
      title,
      instructions,
      dueDate,
      status: 'Published'
    };
    if (courseId) assignmentData.course = courseId;
    if (classroomId) assignmentData.classroom = classroomId;

    await Assignment.create(assignmentData);
    
    res.status(201).json({ message: 'Assignment created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get Submissions
// @route   GET /api/instructor/submissions
const getSubmissions = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const submissions = await Submission.find({ instructor: user._id }).populate('assignment student');
    
    const formatted = submissions.map(s => ({
      id: s._id,
      studentName: s.student ? s.student.name : 'Unknown Student',
      assignmentTitle: s.assignment ? s.assignment.title : 'Deleted Assignment',
      status: s.status,
      grade: s.grade,
      submittedAt: s.submittedAt
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get Live Classes
// @route   GET /api/instructor/live-classes
const getLiveClasses = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const classes = await LiveClass.find({ instructor: user._id }).populate('course').populate('classroom').sort({ date: 1, time: 1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create Live Class
// @route   POST /api/instructor/live-classes
const createLiveClass = async (req, res) => {
  try {
    const { topic, date, time, meetingLink, courseId, classroomId } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    // Generate a unique 6-character ID for the class
    const classId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const classData = {
      instructor: user._id,
      classId,
      topic,
      date,
      time,
      meetingLink,
      expectedStudents: 0
    };
    if (courseId) classData.course = courseId;
    if (classroomId) classData.classroom = classroomId;

    const newClass = await LiveClass.create(classData);

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed Dummy Data for Instructor
// @route   POST /api/instructor/seed
const seedInstructorData = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    // Create Dummy Course if none exists
    const course = await Course.findOneAndUpdate(
      { title: "Advanced UI/UX Design" },
      { professor: user.name, icon: "ClipboardList", bg: "bg-purple-100", instructor: user._id },
      { upsert: true, returnDocument: 'after' }
    );

    // Seed Assignment
    const assignment = await Assignment.findOneAndUpdate(
      { title: "Build a Todo App" },
      { instructor: user._id, course: course._id, instructions: "Use React.", dueDate: new Date() },
      { upsert: true, returnDocument: 'after' }
    );

    // Seed Submissions
    await Submission.deleteMany({ instructor: user._id });
    await Submission.create([
      { assignment: assignment._id, student: user._id, instructor: user._id, status: 'Needs Grading' },
      { assignment: assignment._id, student: user._id, instructor: user._id, status: 'Graded', grade: '95/100' }
    ]);

    // Seed Live Classes
    await LiveClass.deleteMany({ instructor: user._id });
    await LiveClass.create([
      { instructor: user._id, course: course._id, classId: "REACT1", topic: "React Router Deep Dive", date: "2023-10-25", time: "16:00", meetingLink: "https://zoom.us", expectedStudents: 45 },
      { instructor: user._id, course: course._id, classId: "DESIGN", topic: "Q&A Session: UI Design", date: "2023-10-26", time: "10:00", meetingLink: "https://zoom.us", expectedStudents: 112 }
    ]);

    res.json({ message: "Instructor data seeded successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error seeding data' });
  }
};

// @desc    Get Instructor's Courses
// @route   GET /api/instructor/courses
const getInstructorCourses = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const courses = await Course.find({ instructor: user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error fetching courses' });
  }
};

// @desc    Update a course
// @route   PUT /api/instructor/courses/:id
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, originalPrice, category, level, duration, badge, teacherNames, whatYouWillLearn, batchStartDate } = req.body;
    
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let course = await Course.findOne({ _id: id, instructor: user._id });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    let thumbnailUrl = course.thumbnailUrl;
    let customTeacherPhoto = course.customTeacherPhoto;
    
    if (req.files) {
      if (req.files['coverImage'] && req.files['coverImage'][0]) {
        thumbnailUrl = req.files['coverImage'][0].path;
      }
      if (req.files['teacherPhoto'] && req.files['teacherPhoto'][0]) {
        customTeacherPhoto = req.files['teacherPhoto'][0].path;
      }
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.originalPrice = originalPrice !== undefined ? originalPrice : course.originalPrice;
    course.category = category || course.category;
    course.level = level || course.level;
    course.duration = duration || course.duration;
    course.badge = badge !== undefined ? badge : course.badge;
    if (batchStartDate) course.batchStartDate = new Date(batchStartDate);
    
    if (teacherNames) course.teacherNames = JSON.parse(teacherNames);
    if (whatYouWillLearn) course.whatYouWillLearn = JSON.parse(whatYouWillLearn);
    course.thumbnailUrl = thumbnailUrl;
    course.customTeacherPhoto = customTeacherPhoto;

    await course.save();

    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: 'Server Error updating course' });
  }
};

// @desc    Get Instructor's Classrooms
// @route   GET /api/instructor/classrooms
const getClassrooms = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const classrooms = await Classroom.find({ instructor: user._id }).sort({ createdAt: -1 });
    res.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: 'Server Error fetching classrooms' });
  }
};

// @desc    Create a new Classroom
// @route   POST /api/instructor/classrooms
const createClassroom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a unique 6-character ID for the classroom
    const classroomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newClassroom = await Classroom.create({
      name,
      description,
      classroomId,
      instructor: user._id
    });

    res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({ message: 'Server Error while creating classroom' });
  }
};

// @desc    Delete a Classroom
// @route   DELETE /api/instructor/classrooms/:id
const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const classroom = await Classroom.findOneAndDelete({ _id: id, instructor: user._id });
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error("Error deleting classroom:", error);
    res.status(500).json({ message: 'Server Error while deleting classroom' });
  }
};

module.exports = {
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
};
