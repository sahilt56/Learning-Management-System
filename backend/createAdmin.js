require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

// ── Admin details – change these if needed ──────────────────
const ADMIN = {
  firebaseUid: 'admin-local-001',          // dummy UID (for manual admins)
  email:        'admin@eduverse.com',
  name:         'Super Admin',
  role:         'admin',
  plan:         'enterprise',
  profilePicture: '',
};
// ────────────────────────────────────────────────────────────

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if already exists
    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      // Update role to admin if needed
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        existing.plan  = 'enterprise';
        await existing.save();
        console.log(`✅ Existing user "${ADMIN.email}" promoted to admin!`);
      } else {
        console.log(`ℹ️  Admin "${ADMIN.email}" already exists.`);
      }
    } else {
      await User.create(ADMIN);
      console.log(`✅ Admin user created: ${ADMIN.email}`);
    }

    console.log('\n👤 Admin Details:');
    console.log(`   Email : ${ADMIN.email}`);
    console.log(`   Role  : admin`);
    console.log(`   URL   : http://localhost:5173/admin`);
    console.log('\n⚠️  NOTE: To login, use Firebase. First register with this email,');
    console.log('   then this script will auto-link the admin role on next sync.\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
