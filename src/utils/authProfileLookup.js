import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const isActiveProfile = (data) => (data?.isActive ?? true) !== false;

const getFirstDocData = (snapshot) => {
  if (!snapshot || snapshot.empty) {
    return null;
  }
  const firstActive = snapshot.docs.find((snapshotDoc) =>
    isActiveProfile(snapshotDoc.data() || {}),
  );
  if (!firstActive) {
    return null;
  }
  return { id: firstActive.id, ...(firstActive.data() || {}) };
};

export const getAuthUserProfile = async ({ uid, email }) => {
  if (!uid) {
    return null;
  }

  const userSnap = await getDoc(doc(db, "users", uid));
  if (userSnap.exists()) {
    const userData = userSnap.data() || {};
    if (isActiveProfile(userData)) {
      return { id: userSnap.id, ...userData };
    }
    return null;
  }

  const studentByIdSnap = await getDoc(doc(db, "student_users", uid));
  if (studentByIdSnap.exists()) {
    const studentByIdData = studentByIdSnap.data() || {};
    if (isActiveProfile(studentByIdData)) {
      return { id: studentByIdSnap.id, ...studentByIdData };
    }
  }

  const studentByUidSnap = await getDocs(
    query(collection(db, "student_users"), where("uid", "==", uid), limit(1)),
  );
  const studentByUid = getFirstDocData(studentByUidSnap);
  if (studentByUid) {
    return studentByUid;
  }

  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  if (normalizedEmail) {
    const studentByEmailSnap = await getDocs(
      query(
        collection(db, "student_users"),
        where("email", "==", normalizedEmail),
        limit(1),
      ),
    );
    const studentByEmail = getFirstDocData(studentByEmailSnap);
    if (studentByEmail) {
      return studentByEmail;
    }
  }

  return null;
};
