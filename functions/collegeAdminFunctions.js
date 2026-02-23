/**
 * Firebase Cloud Function to delete a college admin user
 * Deploy this to your Firebase project
 *
 * Prerequisites:
 * 1. Install Firebase Admin SDK: npm install firebase-admin
 * 2. Deploy to Firebase Cloud Functions: firebase deploy --only functions
 *
 * This function is called from the client when deleting a college
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Cloud Function: Delete college admin user
exports.deleteCollegeAdminUser = functions.https.onCall(
  async (data, context) => {
    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to delete users",
      );
    }

    const { uid } = data;

    if (!uid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "UID is required",
      );
    }

    try {
      // Delete user from Firebase Authentication
      await admin.auth().deleteUser(uid);
      console.log("Successfully deleted user:", uid);

      return {
        success: true,
        message: `User ${uid} deleted successfully`,
      };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error deleting user: " + error.message,
      );
    }
  },
);

// Cloud Function: Delete college and its admin
exports.deleteCollegeAndAdmin = functions.https.onCall(
  async (data, context) => {
    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to delete colleges",
      );
    }

    const { collegeCode, adminUid } = data;
    const db = admin.firestore();

    try {
      // 1. Delete the college admin from Auth
      if (adminUid) {
        await admin.auth().deleteUser(adminUid);
        console.log("Deleted user from Auth:", adminUid);
      }

      // 2. Delete the college admin from Firestore
      if (adminUid) {
        await db.collection("users").doc(adminUid).delete();
        console.log("Deleted user from Firestore:", adminUid);
      }

      // 3. Delete the college from Firestore
      await db.collection("college").doc(collegeCode).delete();
      console.log("Deleted college:", collegeCode);

      return {
        success: true,
        message: "College and admin deleted successfully",
      };
    } catch (error) {
      console.error("Error in deleteCollegeAndAdmin:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error deleting college: " + error.message,
      );
    }
  },
);
