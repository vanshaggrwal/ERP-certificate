// This file helps seed your local colleges data into Firestore
// Run this once to populate your database

import { colleges } from "../src/data/colleges";
import { seedColleges } from "./collegeService";

export const seedCollegesData = async () => {
  try {
    console.log("Starting to seed colleges data...");

    // Seed colleges - document ID will be college code (college.id)
    await seedColleges(colleges);
    console.log("Successfully seeded all colleges!");
    return true;
  } catch (error) {
    console.error("Failed to seed colleges:", error);
    return false;
  }
};

// Usage: Call this function once from your component or a dedicated admin page
// Example:
// import { seedCollegesData } from "../services/seedData";
//
// const handleSeedData = async () => {
//   const success = await seedCollegesData();
//   if (success) {
//     alert("Colleges seeded successfully!");
//   }
// };
