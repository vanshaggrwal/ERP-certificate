# Fixing Firebase Auth Deletion for College Admins

## Problem

When you delete a college, the admin user is deleted from Firestore but **NOT from Firebase Authentication**. This means:

- ❌ The email is still registered in Firebase Auth
- ❌ The account still exists and could be exploited
- ❌ You can't reuse that email for another admin

## Solution Options

### OPTION 1: Deploy Cloud Functions (Recommended)

This is the best long-term solution that automates everything.

**Setup Steps:**

1. **Install Firebase CLI** (if not already installed)

   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Functions**

   ```bash
   firebase init functions
   ```

   - Select your Firebase project
   - Choose JavaScript
   - Install dependencies: Yes

3. **Replace functions/index.js**
   - Copy all content from `functions/collegeAdminFunctions.js`
   - Paste into `functions/index.js`
   - Save

4. **Deploy**

   ```bash
   firebase deploy --only functions
   ```

5. **Verify**
   - Go to Firebase Console > Functions
   - Look for `deleteCollegeAdminUser`
   - Try deleting a college - it should now work!

---

### OPTION 2: Manual Script (Quick Fix)

Use this if you can't deploy Cloud Functions right now.

**Setup Steps:**

1. **Download Your Service Account Key**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to **⚙️ Settings > Service Accounts**
   - Click **Generate New Private Key**
   - Save the JSON file as `serviceAccountKey.json` in your project root

2. **Install Dependencies**

   ```bash
   npm install firebase-admin
   ```

3. **Get the User UID**
   - Go to Firestore > users collection
   - Find the college admin document
   - The document ID is the UID

4. **Run the Delete Script**

   ```bash
   node scripts/deleteCollegeAdmin.js <paste_the_uid_here>
   ```

   Example:

   ```bash
   node scripts/deleteCollegeAdmin.js xyz123abc456def789
   ```

5. **Verify**
   - Go to Firebase Console > Authentication
   - The email should be gone

---

## How It Works

### Current Flow (Without Cloud Functions):

```
Delete College Click
    ↓
Delete from Firestore ✅
    ↓
Try to call Cloud Function ❌ (Not deployed)
    ↓
Auth user still exists ❌
```

### After Cloud Functions Deployed:

```
Delete College Click
    ↓
Delete from Firestore ✅
    ↓
Call Cloud Function ✅
    ↓
Delete from Firebase Auth ✅
    ↓
Everything cleaned up ✅
```

---

## Comparison

| Feature          | Cloud Functions | Script               |
| ---------------- | --------------- | -------------------- |
| Automatic        | ✅ Yes          | ❌ Manual            |
| When Deleting    | ✅ Instant      | ❌ Separate          |
| User Experience  | ✅ Seamless     | ❌ Extra Steps       |
| Setup Complexity | 🟡 Medium       | 🟡 Medium            |
| Maintenance      | ✅ None         | ⚠️ Renew service key |

---

## Which Should You Choose?

- **Choose Cloud Functions if:** You want full automation and plan to use this system long-term
- **Choose Script if:** You just need to clean up existing users and don't want to deploy functions yet

---

## Important Notes

⚠️ **Never commit serviceAccountKey.json to Git!**

Add to your `.gitignore`:

```
serviceAccountKey.json
functions/node_modules
.env
```

🔒 **Security:**

- The service account key has admin privileges
- Keep it private and secure
- Never share it publicly
- Regenerate it if exposed

---

## Troubleshooting

**"Error: No matching Cloud Function"**
→ Cloud Functions not deployed. Try OPTION 1 or OPTION 2.

**"Error: serviceAccountKey.json not found"**
→ Download the key from Firebase Console and save it.

**"Error: Permission denied"**
→ Make sure serviceAccountKey.json is from your Firebase project.

**Need help?**

- Check Firebase Console > Functions > Logs (for Cloud Functions)
- Run with `--debug` flag for verbose output

---

## Next Steps

1. Choose your solution (Cloud Functions recommended)
2. Follow the setup steps
3. Test by deleting a test college
4. Verify the user is deleted from Firebase Auth
