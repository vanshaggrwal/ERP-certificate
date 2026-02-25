import { db } from "../src/firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  writeBatch,
  setDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { codeToDocId } from "../src/utils/projectCodeUtils";

const PROJECT_CODES_COLLECTION = "projectCodes";
const STUDENTS_COLLECTION = "students";

const normalizeValue = (value) => String(value || "").trim().toLowerCase();

const setStudentsProjectActiveStatus = async (projectCode, isActive) => {
  if (!projectCode) {
    return;
  }
  const projectDocId = codeToDocId(projectCode);
  const projectRef = doc(db, STUDENTS_COLLECTION, projectDocId);

  await setDoc(
    projectRef,
    {
      projectCode,
      isActive,
      updatedAt: new Date(),
    },
    { merge: true },
  );

  const studentsSnapshot = await getDocs(
    collection(db, STUDENTS_COLLECTION, projectDocId, "students_list"),
  );

  if (!studentsSnapshot.empty) {
    const batch = writeBatch(db);
    studentsSnapshot.forEach((studentDoc) => {
      batch.set(
        studentDoc.ref,
        {
          isActive,
          updatedAt: new Date(),
        },
        { merge: true },
      );
    });
    await batch.commit();
  }

  const studentUsersSnapshot = await getDocs(
    query(collection(db, "student_users"), where("projectCode", "==", projectCode)),
  );
  if (!studentUsersSnapshot.empty) {
    const usersBatch = writeBatch(db);
    studentUsersSnapshot.forEach((studentUserDoc) => {
      usersBatch.set(
        studentUserDoc.ref,
        {
          isActive,
          deletedAt: isActive ? null : new Date(),
          updatedAt: new Date(),
        },
        { merge: true },
      );
    });
    await usersBatch.commit();
  }
};

// Add a project code to Firestore
export const addProjectCode = async (projectData) => {
  try {
    const normalizedCode = String(projectData.code || "").trim();
    const normalizedCollegeId = String(projectData.collegeId || "").trim();

    const existingCodeQuery = query(
      collection(db, PROJECT_CODES_COLLECTION),
      where("collegeId", "==", normalizedCollegeId),
      where("code", "==", normalizedCode),
    );
    const existingCodeSnapshot = await getDocs(existingCodeQuery);

    if (!existingCodeSnapshot.empty) {
      const exactMatchDoc =
        existingCodeSnapshot.docs.find((existingDoc) => {
          const existingData = existingDoc.data() || {};
          return (
            normalizeValue(existingData.course) ===
              normalizeValue(projectData.course) &&
            normalizeValue(existingData.year) === normalizeValue(projectData.year) &&
            normalizeValue(existingData.type) === normalizeValue(projectData.type) &&
            normalizeValue(existingData.academicYear) ===
              normalizeValue(projectData.academicYear)
          );
        }) || existingCodeSnapshot.docs[0];

      await updateDoc(doc(db, PROJECT_CODES_COLLECTION, exactMatchDoc.id), {
        code: normalizedCode,
        collegeId: normalizedCollegeId,
        college: projectData.college,
        course: projectData.course,
        year: projectData.year,
        type: projectData.type,
        academicYear: projectData.academicYear,
        matched: projectData.matched || false,
        isActive: true,
        deletedAt: null,
        updatedAt: new Date(),
      });

      await setStudentsProjectActiveStatus(normalizedCode, true);
      return exactMatchDoc.id;
    }

    const docRef = await addDoc(collection(db, PROJECT_CODES_COLLECTION), {
      code: normalizedCode,
      collegeId: normalizedCollegeId,
      college: projectData.college,
      course: projectData.course,
      year: projectData.year,
      type: projectData.type,
      academicYear: projectData.academicYear,
      matched: projectData.matched || false,
      isActive: true,
      createdAt: new Date(),
    });
    console.log("Project code added with ID:", docRef.id);

    // Also add this project code to the corresponding college document
    try {
        const collegeDocId =
          projectData.collegeId || projectData.collegeCode || projectData.college;
        if (collegeDocId) {
        const collegeRef = doc(db, "college", String(collegeDocId));
        await updateDoc(collegeRef, {
          project_codes: arrayUnion(projectData.code),
        });
      }
    } catch (err) {
      // Non-fatal: log and continue
      console.error(
        "Failed to update college document with project code:",
        err,
        );
    }
    await setStudentsProjectActiveStatus(normalizedCode, true);
    return docRef.id;
  } catch (error) {
    console.error("Error adding project code:", error);
    throw error;
  }
};

// Get all project codes
export const getAllProjectCodes = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, PROJECT_CODES_COLLECTION),
    );
    const projectCodes = [];
    querySnapshot.forEach((doc) => {
      projectCodes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return projectCodes.filter((projectCode) => projectCode.isActive !== false);
  } catch (error) {
    console.error("Error getting project codes:", error);
    throw error;
  }
};

// Get project codes by college ID
export const getProjectCodesByCollege = async (collegeId) => {
  try {
    const q = query(
      collection(db, PROJECT_CODES_COLLECTION),
      where("collegeId", "==", collegeId),
    );
    const querySnapshot = await getDocs(q);
    const projectCodes = [];
    querySnapshot.forEach((doc) => {
      projectCodes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return projectCodes.filter((projectCode) => projectCode.isActive !== false);
  } catch (error) {
    console.error("Error getting project codes by college:", error);
    throw error;
  }
};

// Get project code by ID
export const getProjectCodeById = async (id) => {
  try {
    const docRef = doc(db, PROJECT_CODES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log("No project code found with ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Error getting project code:", error);
    throw error;
  }
};

// Update project code
export const updateProjectCode = async (id, updateData) => {
  try {
    const docRef = doc(db, PROJECT_CODES_COLLECTION, id);
    await updateDoc(docRef, updateData);
    console.log("Project code updated:", id);
    return true;
  } catch (error) {
    console.error("Error updating project code:", error);
    throw error;
  }
};

// Soft delete project code
export const softDeleteProjectCode = async (id, projectCode) => {
  try {
    await updateDoc(doc(db, PROJECT_CODES_COLLECTION, id), {
      isActive: false,
      deletedAt: new Date(),
      updatedAt: new Date(),
    });
    await setStudentsProjectActiveStatus(projectCode, false);
    console.log("Project code soft-deleted:", id);
    return true;
  } catch (error) {
    console.error("Error soft deleting project code:", error);
    throw error;
  }
};
