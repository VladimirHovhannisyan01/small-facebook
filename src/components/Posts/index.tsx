import { useAuth } from "@/AuthContext";
import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const Posts: React.FC = () => {
  const { posts, fetchPosts, currentUser } = useAuth();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchPosts(currentUser.uid);
    }
  }, [currentUser]);

  const handleEditPost = async (post: any) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const updatePost = async () => {
    try {
      const postDocRef = doc(db, "posts", editingPost.id);

      await updateDoc(postDocRef, {
        title: editedTitle,
        content: editedContent,
      });

      fetchPosts(currentUser.uid);
      cancelEdit();
    } catch (error) {
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(postDocRef);
      fetchPosts(currentUser.uid);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="post p-4 border border-gray-300 rounded-lg mb-4 bg-white"
        >
          {editingPost && editingPost.id === post.id ? (
            <div className="mb-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex mt-2">
                <button
                  onClick={updatePost}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleEditPost(post)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
