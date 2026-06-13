const admin = require('firebase-admin');

// Ensure that you have downloaded your serviceAccountKey.json from Firebase Console
// and placed it in the backend directory (make sure it's in .gitignore!)
// Alternatively, use environment variables.
let serviceAccount;
try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (error) {
  console.log("serviceAccountKey.json not found, attempting to use env vars.");
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  // Use environment variables or default credentials if deployed
  // Example for env var:
  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  //   })
  // });
  console.log("Firebase Admin SDK not initialized correctly yet. Please provide serviceAccountKey.json");
}

module.exports = admin;
