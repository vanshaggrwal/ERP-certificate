import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch role/profile from users; fallback to student_users.
        let snap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (!snap.exists()) {
          snap = await getDoc(doc(db, "student_users", firebaseUser.uid));
        }

        if (snap.exists()) {
          const userData = snap.data() || {};
          setRole(userData.role || null);
          setProfile(userData);
        } else {
          setRole(null);
          setProfile(null);
        }
      } else {
        setUser(null);
        setRole(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
