// import { waiting_img } from "../assets/assets";
// import { Link } from "react-router-dom";
// import API from "../api/axios";
// import { useEffect, useState } from "react";

// interface Post {
//   _id: string;
//   caption: string;
//   images: string[];
//   author: {
//     username: string;
//     email: string;
//   };
//   createdAt: string;
// }

// function Feed() {
//   const [allUsers, setAllUsers] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await API.get("/post/allUsersPosts");
//         setAllUsers(res.data.posts || []);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
//       <p className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">Feed</p>

//       {/* 🌀 Loading Spinner */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center min-h-[70vh]">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-gray-600 font-medium text-sm sm:text-base">
//             Fetching latest posts...
//           </p>
//         </div>
//       ) : allUsers.length === 0 ? (
//         // 😅 No posts yet
//         <div className="flex items-center justify-center min-h-[70vh]">
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center border border-gray-100 max-w-sm">
//             {waiting_img.map((img) => (
//               <img
//                 key={img.img}
//                 className="w-48 sm:w-64 mb-4 sm:mb-6 mx-auto"
//                 src={img.img}
//                 alt=""
//               />
//             ))}
//             <p className="text-xs sm:text-sm mb-6 text-gray-600">
//               Waiting for you or your friends to upload images 😅
//             </p>
//             <Link to="/dashboard/posts">
//               <button className="p-2 rounded-md bg-blue-600 text-white font-semibold shadow-sm w-full text-sm hover:bg-blue-700 transition-all">
//                 Upload a Post
//               </button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         // ✅ Posts Grid
//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//           {allUsers.map((post) =>
//             post.images.map((img, idx) => (
//               <div
//                 key={`${post._id}-${idx}`}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
//               >
//                 <img
//                   src={img}
//                   alt={post.caption || "User post"}
//                   className="w-full h-48 sm:h-56 object-cover"
//                 />

//                 {/* Caption + Info */}
//                 <div className="p-2 sm:p-3">
//                   <p className="text-gray-700 text-xs sm:text-sm font-medium mb-1 line-clamp-2">
//                     {post.caption || "No caption"}
//                   </p>

//                   <div className="h-px bg-gray-100 my-1" />

//                   <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
//                     <p className="font-medium truncate">
//                       👤 {post.author?.username || "Unknown"}
//                     </p>
//                     <p className="text-gray-400">
//                       {formatDate(post.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Feed;

import { waiting_img } from "../assets/assets";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Menu, LogOut, Users, Heart } from "lucide-react";

dayjs.extend(relativeTime);

interface Post {
  _id: string;
  caption: string;
  images: string[];
  author: {
    username: string;
    email: string;
  };
  likes?: number;
  createdAt: string;
}

function Feed() {
  const [allUsers, setAllUsers] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayUsername, setDisplayUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/post/allUsersPosts");
        setAllUsers(res.data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    API.post("/users/logout", {}, { withCredentials: true });
    window.location.href = "/";
  };

  const handleBrowseFriends = () => {
    window.location.href = "/friends";
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* --- Glassy Navbar for small screens --- */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-gray-200 flex items-center justify-between px-4 py-3 shadow-sm">
        <p className="font-semibold text-gray-800 text-lg">{displayUsername}</p>
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={22} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fade-in">
              <button
                onClick={handleBrowseFriends}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left rounded-md transition"
              >
                <Users size={18} /> Browse Friends
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left rounded-md transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 mt-16 sm:mt-20">
        <p className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">Feed</p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Fetching latest posts...
            </p>
          </div>
        ) : allUsers.length === 0 ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center border border-gray-100 max-w-sm">
              {waiting_img.map((img) => (
                <img
                  key={img.img}
                  className="w-48 sm:w-64 mb-4 sm:mb-6 mx-auto rounded-lg"
                  src={img.img}
                  alt=""
                />
              ))}
              <p className="text-xs sm:text-sm mb-6 text-gray-600">
                Waiting for you or your friends to upload images 😅
              </p>
              <Link to="/dashboard/posts">
                <button className="p-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 text-white font-semibold shadow-lg w-full text-sm hover:scale-105 transition-all">
                  Upload a Post
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allUsers.map((post) =>
              post.images.map((img, idx) => (
                <div
                  key={`${post._id}-${idx}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 group"
                >
                  <div className="relative">
                    <img
                      src={img}
                      alt={post.caption || "User post"}
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay with likes count */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/25 backdrop-blur-sm text-white text-xs p-1 flex justify-between items-center">
                      <span>{dayjs(post.createdAt).fromNow()}</span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} /> {post.likes ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-2 sm:p-3">
                    <p className="text-gray-700 text-sm sm:text-base font-medium mb-2 line-clamp-2">
                      {post.caption || "No caption"}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-1" />

                    {/* Action buttons: Like, Comment, Share */}
                    <div className="flex items-center justify-between mt-1">
                      {/* Like */}
                      <button className="flex items-center gap-1 text-gray-600 hover:text-pink-500 transition-colors">
                        <Heart size={18} /> {post.likes ?? 0}
                      </button>

                      {/* Comment */}
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                        💬 Comment
                      </button>

                      {/* Share */}
                      <button className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors">
                        🔗 Share
                      </button>
                    </div>

                    {/* Author info */}
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mt-2">
                      <p className="font-medium truncate">
                        👤 {post.author?.username || "Unknown"}
                      </p>
                      <p className="text-gray-400">
                        {dayjs(post.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
