"use client";

import { useState } from "react";
import Image from "next/image";
import userImage from "../../../public/no-user-image-square.jpg";
import { useUserProfile } from "@/UserProfileContext.tsx";

const UserProfile: React.FC = () => {
  const { userData, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!userData) {
    return <div>loading...</div>;
  }

  const handleEdit = () => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(firstName, lastName, password);
    setIsEditing(false);
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center max-h-screen gap-8 p-4 border-b border-gray-300 bg-white">
      <Image
        src={userImage}
        alt="user-image"
        className="rounded-full w-32 h-32"
        priority
      />
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleEdit}
          >
            Edit User
          </button>
        </>
      ) : (
        <form onSubmit={handleSave} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
