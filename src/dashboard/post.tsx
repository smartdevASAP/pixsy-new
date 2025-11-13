import { ImagePlus, Send, Heart, Share2, Trash2 } from "lucide-react";
import { useApp } from "../context/postContext";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useApp1 } from "../context/userContext";
import toast from "react-hot-toast";

type Post = {
  _id: string;
  caption: string;
  images?: string[];
  likes?: number;
  liked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function Posts() {
  const {
    caption,
    setCaption,
    image,
    setImage,
    imagesAdded,
    handleImageUpload,
    handlePost,
    handleLikes,
  } = useApp();

  const { setActualUser } = useApp1();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔥 Fetch posts from DB
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/post/allPosts", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
        setActualUser(res.data.user || {});
      } else {
        toast.error(res.data.message || "Failed to fetch posts");
      }
    } catch (err) {
      console.error("🔥 Error fetching posts:", err);
      toast.error("Error loading posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🗑️ Delete Post
  const deletePost = async (postId: string) => {
    const token = localStorage.getItem("token");
    toast.loading("Deleting post...");

    try {
      const res = await API.delete(`/post/delete/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.dismiss();
        toast.success("Post deleted successfully ✨");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        toast.dismiss();
        toast.error(res.data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.dismiss();
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Create a Post
        </h2>

        {(image || imagesAdded.length > 0) && (
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-200 outline-none text-sm mb-3"
            rows={3}
          />
        )}

        {image && (
          <div className="mb-3 relative">
            <img
              src={image}
              alt="preview"
              className="w-full h-60 object-cover rounded-lg"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-white text-gray-600 rounded-full px-2 py-1 text-xs shadow hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 text-sm">
            <ImagePlus size={18} />
            <span>Add Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <button
            onClick={handlePost}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            <Send size={15} />
            Post
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200"
            >
              <p className="text-gray-700 text-sm mb-3">{post.caption}</p>

              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {post.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center text-xs">
                  <Heart
                    onClick={() => handleLikes(post._id)}
                    size={20}
                    className={`cursor-pointer transition ${
                      post.liked ? "fill-red-500 text-red-500" : "fill-white"
                    }`}
                  />
                  <Share2 size={20} className="cursor-pointer" />
                  <Trash2
                    onClick={() => deletePost(post._id)}
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                  />
                </div>
                <p className="text-xs text-gray-400">❤️ {post.likes ?? 0}</p>
              </div>

              <div className="text-xs text-gray-400 mt-2">
                {new Date(post.createdAt || "").toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
