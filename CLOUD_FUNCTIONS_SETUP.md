# Firebase Cloud Functions Setup Guide

## Why Cloud Functions?

Firebase Authentication can only be managed on the **server side** using the Firebase Admin SDK. To fully delete college admin accounts when deleting a college, you need to deploy a Cloud Function.

## Steps to Deploy:

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Initialize Firebase Functions in your project

```bash
firebase init functions
```

When prompted:

- Choose your Firebase project
- Select JavaScript
- Install dependencies: Yes

### 3. Replace the functions code

Navigate to `functions/index.js` and replace the content with the code from `functions/collegeAdminFunctions.js` in your project.

### 4. Deploy the Cloud Function

```bash
firebase deploy --only functions
```

You should see output like:

```
✔  Deploy complete!

Function URL (deleteCollegeAdminUser): https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/deleteCollegeAdminUser
Function URL (deleteCollegeAndAdmin): https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/deleteCollegeAndAdmin
```

### 5. Verify the function is working

In Firebase Console:

1. Go to **Functions**
2. You should see `deleteCollegeAdminUser` and `deleteCollegeAndAdmin` listed
3. Check the **Logs** tab for execution traces

## What Happens After Deployment?

When you delete a college:

1. ✅ Cloud Function deletes the admin user from Firebase Authentication
2. ✅ Cloud Function deletes the admin user from Firestore
3. ✅ Cloud Function deletes the college from Firestore
4. ✅ Frontend shows success message

## If Cloud Function is NOT deployed:

The current code has fallback handling:

- It will **still delete from Firestore**
- But **NOT from Firebase Authentication**
- You'll see a warning in the console

To fully delete accounts, you **must deploy the Cloud Function**.

## Alternative: Manual deletion via Firebase Console

If you don't want to deploy Cloud Functions:

1. Go to Firebase Console → Authentication
2. Find the college admin user
3. Click the delete icon
4. Manually delete the college from Firestore

## Troubleshooting:

**Error: "Could not find module 'firebase-admin'"**

- Run in functions folder: `npm install firebase-admin`

**Error: "Permission denied" when deleting**

- Ensure your Firebase Authentication rules allow the deletion
- Cloud Functions use admin privileges automatically

**Function doesn't execute**

- Check Firebase Console → Functions → Logs
- Verify the function was deployed correctly
- Check your project's billing status (required for Cloud Functions)

## Environment Setup in functions/.env (if needed):

```
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## References:

- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
