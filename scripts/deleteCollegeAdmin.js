#!/usr/bin/env node

/**
 * Firebase Admin Script to Delete College Admin Users
 *
 * Usage:
 * 1. Install dependencies: npm install firebase-admin
 * 2. Download your Firebase service account key from Firebase Console
 * 3. Run: node deleteCollegeAdmin.js <UID_TO_DELETE>
 *
 * Example:
 * node deleteCollegeAdmin.js xyz123user456
 */

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Get UID from command line arguments
const uid = process.argv[2];

if (!uid) {
  console.error("❌ Error: Please provide the UID to delete");
  console.error("Usage: node deleteCollegeAdmin.js <UID>");
  process.exit(1);
}

// Path to your Firebase service account key
// Download from Firebase Console > Project Settings > Service Accounts
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Error: serviceAccountKey.json not found");
  console.error("Steps to fix:");
  console.error("1. Go to Firebase Console");
  console.error("2. Project Settings > Service Accounts");
  console.error("3. Download the JSON file");
  console.error("4. Save it as serviceAccountKey.json in this directory");
  process.exit(1);
}

// Initialize Firebase Admin
try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("❌ Error initializing Firebase:", error.message);
  process.exit(1);
}

// Delete the user
async function deleteUser() {
  try {
    console.log(`🔄 Deleting user: ${uid}`);
    await admin.auth().deleteUser(uid);
    console.log("✅ User deleted successfully from Firebase Authentication");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    process.exit(1);
  }
}

deleteUser();
