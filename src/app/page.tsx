"use client";

import UserProfile from "@/components/UserProfile";
import CreatePost from "@/components/CreatePost";
import Posts from "@/components/Posts";
import Header from "@/components/Header";
import { useAuth } from "@/AuthContext";

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <Header />
        {!currentUser ? (
          <main className="flex flex-col justify-center height container mx-auto p-4">
            <h1 className="text-2xl font-bold">Welcome to MyApp</h1>
            <p>This is the home page.</p>
          </main>
        ) : (
          <div className="custom-grid gap-4 p-4">
            <UserProfile />
            <div className="flex flex-col">
              <CreatePost />
              <Posts />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
