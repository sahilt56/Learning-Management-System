const express = require('express');
const router = express.Router();
const { getOverview, seedData, getLiveClasses, joinLiveClass, getAssignments, submitAssignment, getClassrooms, joinClassroom } = require('../controllers/dashboardController');
const { verifyFirebaseToken } = require('../middleware/authMiddleware');

router.get('/overview', verifyFirebaseToken, getOverview);
router.get('/classrooms', verifyFirebaseToken, getClassrooms);
router.post('/classrooms/join', verifyFirebaseToken, joinClassroom);
router.get('/live-classes', verifyFirebaseToken, getLiveClasses);
router.post('/live-classes/join', verifyFirebaseToken, joinLiveClass);
router.get('/assignments', verifyFirebaseToken, getAssignments);
router.post('/assignments/submit', verifyFirebaseToken, submitAssignment);
router.post('/seed', verifyFirebaseToken, seedData);

module.exports = router;
