const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

let serviceAccount;
try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (error) {
  console.log("serviceAccountKey.json not found, attempting to use env vars.");
}

let app;
if (serviceAccount) {
  app = initializeApp({
    credential: cert(serviceAccount)
  });
} else {
  // Use environment variables or default credentials if deployed
  console.log("Firebase Admin SDK not initialized correctly yet. Please provide serviceAccountKey.json");
}

const auth = app ? getAuth(app) : null;

module.exports = { app, auth };
