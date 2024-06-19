"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useAuth } from "@/AuthContext";
import { updatePassword as updateFirebasePassword } from "firebase/auth";

interface UserProfileContextType {
  userData: any;
  updateProfile: (
    firstName: string,
    lastName: string,
    password: string
  ) => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (isMounted) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const updateProfile = async (
    firstName: string,
    lastName: string,
    password: string
  ) => {
    if (!currentUser) return;
    const userDocRef = doc(db, "users", currentUser.uid);

    const updatedData = { firstName, lastName };
    await updateDoc(userDocRef, updatedData);

    if (password) {
      await updateFirebasePassword(currentUser, password);
    }

    setUserData((prevData: any) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const value = {
    userData,
    updateProfile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
