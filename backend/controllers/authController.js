const User = require('../models/User');

// @desc    Register or Login User (Sync from Firebase)
// @route   POST /api/auth/sync
// @access  Private (Requires Firebase ID Token)
const syncUser = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user; // from authMiddleware
    const { role, plan } = req.body; // Allow frontend to pass these during signup

    // Check if user exists in MongoDB by firebaseUid
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Check if email already exists (e.g. admin created manually via script)
      const existingByEmail = await User.findOne({ email });
      if (existingByEmail) {
        // Link Firebase UID to existing record (preserves admin role)
        existingByEmail.firebaseUid = uid;
        existingByEmail.profilePicture = existingByEmail.profilePicture || picture || '';
        existingByEmail.name = existingByEmail.name || name || email.split('@')[0];
        await existingByEmail.save();
        user = existingByEmail;
      } else {
        // Create new user
        user = await User.create({
          firebaseUid: uid,
          email,
          name: name || email.split('@')[0],
          profilePicture: picture || '',
          role: role || 'student',
          plan: plan || 'none',
        });
      }
    } else if (role || plan) {
      // If user exists but we are explicitly passing role/plan (e.g. late selection)
      // IMPORTANT: Never downgrade an admin
      if (role && user.role !== role && user.role !== 'admin') {
        user.role = role;
      }
      if (plan && user.plan !== plan) user.plan = plan;
      await user.save();
    }

    res.status(200).json({
      message: 'User synced successfully',
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error("Error in syncUser:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/profile
// @access  Private (Requires Firebase ID Token)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (user) {
      res.json({
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        profilePicture: user.profilePicture
      });
    } else {
      res.status(404).json({ message: 'User not found in DB' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  syncUser,
  getUserProfile
};
