const express = require('express');
const router = express.Router();
const { syncUser, getUserProfile } = require('../controllers/authController');
const { verifyFirebaseToken } = require('../middleware/authMiddleware');

// Route to sync user data from Firebase to MongoDB
router.post('/sync', verifyFirebaseToken, syncUser);

// Route to get the current user's profile
router.get('/profile', verifyFirebaseToken, getUserProfile);

module.exports = router;
