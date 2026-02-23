# Quick Start: Deploy Cloud Functions

## 🎯 Goal

Make college account deletion **fully automatic** - when you delete a college, it deletes from both Firestore AND Firebase Authentication.

## ✅ Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- You're logged into Firebase: `firebase login`

## 🚀 Deploy in 3 Steps

### Step 1: Install Dependencies

```bash
cd functions
npm install
cd ..
```

### Step 2: Test Locally (Optional)

```bash
firebase emulators:start --only functions
```

Press `Ctrl+C` to stop.

### Step 3: Deploy to Firebase

```bash
firebase deploy --only functions
```

**Expected Output:**

```
✔  Deploy complete!

Function URL (deleteCollegeAdminUser): https://us-central1-YOUR_PROJECT.cloudfunctions.net/deleteCollegeAdminUser
Function URL (deleteCollegeAndAdmin): https://us-central1-YOUR_PROJECT.cloudfunctions.net/deleteCollegeAndAdmin
```

## ✨ That's It!

Now when you delete a college:

1. ✅ College deleted from Firestore
2. ✅ Admin deleted from Firestore
3. ✅ Admin deleted from Firebase Auth **← NOW AUTOMATIC!**

## 🧪 Test It

1. Create a test college with an admin account
2. Delete the college
3. Go to Firebase Auth console
4. The email should be gone! 🎉

## 📊 Monitoring

Check function execution logs:

```bash
firebase functions:log
```

## ❌ Troubleshooting

**"Command not found: firebase"**

```bash
npm install -g firebase-tools
firebase login
```

**"Error: Project not found"**

```bash
firebase projects:list
firebase use PROJECT_ID
```

**"Functions deployment failed"**

- Check the error message
- Ensure Node.js 18+ is installed: `node --version`
- Ensure all dependencies are installed: `cd functions && npm install`

**"Function doesn't work"**

- Check logs: `firebase functions:log`
- Verify Cloud Functions are enabled in Firebase Console

## 📝 Notes

- Cloud Functions run on Google's servers (us-central1)
- They execute instantly when called
- You only pay for execution time (~free for low usage)
- No manual deletion needed anymore! 🎉

## 🔄 Updates

If you need to update the functions:

1. Edit `functions/index.js`
2. Run: `firebase deploy --only functions`

Done! 🚀
