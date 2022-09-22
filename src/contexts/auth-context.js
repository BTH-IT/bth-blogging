import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === "undefined")
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const docRef = doc(db, "users", userInfo?.uid);
        const docSnap = await getDoc(docRef);
        setUser({
          ...docSnap.data(),
          userId: doc.id,
        });
      } catch (error) {}
    }
    fetchUser();
  }, [userInfo?.uid]);

  const values = { userInfo, setUserInfo, user };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
