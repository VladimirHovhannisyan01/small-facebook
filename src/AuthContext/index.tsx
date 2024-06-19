"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { collection, query, getDocs, addDoc, where } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

interface AuthContextType {
  currentUser: any;
  posts: any[];
  fetchPosts: (userId?: string) => void;
  addNewPost: (title: string, content: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  posts: [],
  fetchPosts: () => {},
  addNewPost: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchPosts(user.uid);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchPosts = async (userId?: string) => {
    if (!userId) return;
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const fetchedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(fetchedPosts);
  };

  const addNewPost = async (title: string, content: string) => {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    try {
      const newPost = {
        title,
        content,
        createdAt: new Date(),
        userId: currentUser.uid,
      };
      const docRef = await addDoc(collection(db, "posts"), newPost);
      setPosts((prevPosts) => [{ id: docRef.id, ...newPost }, ...prevPosts]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, posts, fetchPosts, addNewPost }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
