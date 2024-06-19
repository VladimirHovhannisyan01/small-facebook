"use client";
import { auth } from "@/app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (!!user) {
      router.push("/");
    }
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = () => {
    router.push("/signUp");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-white"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password:
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <button
          onClick={handleSignUp}
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default login;
