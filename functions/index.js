/**
 * Firebase Cloud Functions for Gryphon Academy ERP
 * Handles deletion of college admin users from Firebase Authentication
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Cloud Function: Delete college admin user from Firebase Auth
exports.deleteCollegeAdminUser = functions.https.onCall(
  async (data, context) => {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to delete users",
      );
    }

    const { uid } = data;

    // Validate UID is provided
    if (!uid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "UID is required",
      );
    }

    try {
      // Delete user from Firebase Authentication
      await admin.auth().deleteUser(uid);
      console.log("Successfully deleted user from Firebase Auth:", uid);

      return {
        success: true,
        message: `User ${uid} deleted successfully from Firebase Authentication`,
      };
    } catch (error) {
      console.error("Error deleting user from Firebase Auth:", error);

      // Handle specific errors
      if (error.code === "auth/user-not-found") {
        throw new functions.https.HttpsError(
          "not-found",
          "User not found in Firebase Authentication",
        );
      }

      throw new functions.https.HttpsError(
        "internal",
        "Error deleting user: " + error.message,
      );
    }
  },
);

// Cloud Function: Delete college with its admin
exports.deleteCollegeAndAdmin = functions.https.onCall(
  async (data, context) => {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated",
      );
    }

    const { collegeCode, adminUid } = data;
    const db = admin.firestore();

    if (!collegeCode) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "College code is required",
      );
    }

    try {
      // 1. Delete admin from Firebase Auth (if provided)
      if (adminUid) {
        try {
          await admin.auth().deleteUser(adminUid);
          console.log("Deleted admin from Firebase Auth:", adminUid);
        } catch (authError) {
          if (authError.code !== "auth/user-not-found") {
            console.warn("Could not delete from Auth:", authError.message);
          }
        }
      }

      // 2. Delete admin from Firestore users collection (if provided)
      if (adminUid) {
        await db.collection("users").doc(adminUid).delete();
        console.log("Deleted admin from Firestore:", adminUid);
      }

      // 3. Delete college from Firestore
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
