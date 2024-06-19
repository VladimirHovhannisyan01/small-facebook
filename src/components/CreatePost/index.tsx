"use client";

import { useAuth } from "@/AuthContext";
import { FormEvent, useState } from "react";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNewPost } = useAuth();

  const handleCreatePost = async (event: FormEvent) => {
    event.preventDefault();
    await addNewPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleCreatePost}
      className="p-4 border border-gray-300 rounded-lg bg-white"
    >
      <div className="mb-4 max-w-96">
        <label className="block text-gray-700 font-medium mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4 max-w-96">
        <label className="block text-gray-700 font-medium mb-2">
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-32 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
