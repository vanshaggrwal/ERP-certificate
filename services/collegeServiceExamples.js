// Example Usage of College Service in React Components

// ============================================
// EXAMPLE 1: In a SuperAdmin Component - Seed Data
// ============================================
import { useEffect, useState } from "react";
import { seedCollegesData } from "../services/seedData";
import { getAllColleges } from "../services/collegeService";

export function SuperAdminSetup() {
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);

  // Seed colleges to Firestore (run once)
  const handleSeedColleges = async () => {
    setLoading(true);
    try {
      const success = await seedCollegesData();
      if (success) {
        alert("Colleges seeded successfully!");
        // Refresh the list
        const data = await getAllColleges();
        setColleges(data);
      }
    } catch (error) {
      alert("Error seeding colleges: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all colleges from Firestore
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await getAllColleges();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  return (
    <div>
      <button onClick={handleSeedColleges} disabled={loading}>
        {loading ? "Seeding..." : "Seed Colleges"}
      </button>
      <div>
        <h3>Colleges in Firestore:</h3>
        <ul>
          {colleges.map((college) => (
            <li key={college.collegeCode}>
              {college.college_name} ({college.college_code})
              {college.college_logo && (
                <img src={college.college_logo} alt="logo" width="30" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Add a Single College
// ============================================
import { addCollege } from "../services/collegeService";

export async function addNewCollege(collegeData) {
  try {
    const collegeCode = await addCollege({
      college_name: collegeData.college_name,
      college_code: collegeData.college_code,
      college_logo: collegeData.college_logo || "",
    });
    console.log("College added with code:", collegeCode);
    return collegeCode;
  } catch (error) {
    console.error("Failed to add college:", error);
    throw error;
  }
}

// ============================================
// EXAMPLE 3: Get College by Code
// ============================================
import { getCollegeByCode } from "../services/collegeService";

export async function fetchCollege(collegeCode) {
  try {
    const college = await getCollegeByCode(collegeCode);
    return college;
  } catch (error) {
    console.error("Failed to fetch college:", error);
    throw error;
  }
}

// ============================================
// EXAMPLE 4: Update College
// ============================================
import { updateCollege } from "../services/collegeService";

export async function updateCollegeLogo(collegeCode, logoUrl) {
  try {
    await updateCollege(collegeCode, { college_logo: logoUrl });
    console.log("College logo updated");
    return true;
  } catch (error) {
    console.error("Failed to update college:", error);
    throw error;
  }
}

// ============================================
// EXAMPLE 5: Delete College
// ============================================
import { deleteCollege } from "../services/collegeService";

export async function removeCollege(collegeCode) {
  try {
    await deleteCollege(collegeCode);
    console.log("College deleted");
    return true;
  } catch (error) {
    console.error("Failed to delete college:", error);
    throw error;
  }
}

// ============================================
// EXAMPLE 6: Hook for Colleges
// ============================================
import { useEffect, useState } from "react";

export function useColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllColleges();
        setColleges(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { colleges, loading, error };
}

// Usage: const { colleges, loading } = useColleges();

// ============================================
// EXAMPLE 7: Get College by Code
// ============================================
import { getCollegeByCode } from "../services/collegeService";

export async function fetchByCollegeCode(code) {
  try {
    const college = await getCollegeByCode(code);
    return college; // e.g., "RCOEM"
  } catch (error) {
    console.error("Failed to fetch college by code:", error);
    throw error;
  }
}

// ============================================
// EXAMPLE 8: Get College by Name
// ============================================
import { getCollegeByName } from "../services/collegeService";

export async function fetchByCollegeName(name) {
  try {
    const college = await getCollegeByName(name);
    return college; // e.g., "Ramdev Baba College of Engineering"
  } catch (error) {
    console.error("Failed to fetch college by name:", error);
    throw error;
  }
}
