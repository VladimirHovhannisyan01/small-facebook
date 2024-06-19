"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>
        <nav className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link className="hover:text-gray-400" href="/login">
                Login
              </Link>
              <Link href="/signUp" className="hover:text-gray-400">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
