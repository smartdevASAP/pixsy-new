import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import API from "../api/axios";

// ---- (1) Define the Post type
type Post = {
  _id: string; // MongoDB ID
  caption: string;
  images?: string[]; // multiple image URLs
  likes?: number;
  liked?: boolean; // local UI tracking (not from DB)
  createdAt?: string;
  updatedAt?: string;
};

// ---- (2) Define Friend type
type Friend = {
  id: number;
  name: string;
  profilePic?: string;
};

// ---- (3) Define what data/functions the context provides
type AppContextType = {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePost: () => Promise<void>;
  imagesAdded: File[];
  setImagesAdded: React.Dispatch<React.SetStateAction<File[]>>;
  handleLikes: (postId: string) => void;
  totalLikes: number;
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  fetchAllPosts: () => Promise<void>;
};

// ---- (4) Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // ---- (5) States
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [imagesAdded, setImagesAdded] = useState<File[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  // ---- (6) Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);

    setImagesAdded((prev) => [...prev, file]);
  };

  // ---- (7) Handle creating a post
  const handlePost = async (): Promise<void> => {
    if (!caption.trim() && imagesAdded.length === 0) return;

    try {
      const formData = new FormData();
      formData.append("caption", caption);

      // include logged-in user info if exists
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.username) formData.append("username", user.username);

      imagesAdded.forEach((file) => {
        formData.append("images", file);
      });

      const res = await API.post("/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        console.log("✅ Post created:", res.data.post);
        setCaption("");
        setImage(null);
        setImagesAdded([]);

        // add new post instantly to UI
        setPosts((prev) => [res.data.post, ...prev]);
      } else {
        console.log("❌ Failed to post:", res.data.message);
      }
    } catch (error: any) {
      console.error(
        "🔥 Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  // ---- (8) Handle likes
  const handleLikes = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const isLiked = post.liked ?? false;
          const updatedLikes = isLiked
            ? (post.likes ?? 0) - 1
            : (post.likes ?? 0) + 1;
          return { ...post, liked: !isLiked, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  // ---- (9) Total likes across all posts
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  // ---- (10) Add a friend
  const addFriend = (friend: Friend) => {
    setFriends((prev) => {
      if (prev.some((f) => f.id === friend.id)) return prev;
      return [...prev, friend];
    });
  };

  // ---- (11) Fetch all posts

  const fetchAllPosts = async (): Promise<void> => {
    try {
      const res = await API.get("/post/allPosts", {
        withCredentials: true, // crucial for sending cookies
      });

      if (res.data.success && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        console.error("❌ Failed to fetch posts:", res.data.message);
      }
    } catch (error: any) {
      console.error(
        "🔥 Error fetching posts:",
        error.response?.data || error.message
      );
    }
  };

  // ---- (12) Fetch posts on mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // ---- (13) Provide context
  return (
    <AppContext.Provider
      value={{
        caption,
        setCaption,
        image,
        setImage,
        posts,
        setPosts,
        handleImageUpload,
        handlePost,
        imagesAdded,
        setImagesAdded,
        handleLikes,
        totalLikes,
        friends,
        addFriend,
        fetchAllPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ---- (14) Custom hook to use context
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
