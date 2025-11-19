// import { useEffect, useState } from "react";
// import { useApp } from "../context/postContext";
// import { useApp1 } from "../context/userContext";
// import { Share2, Edit3 } from "lucide-react";
// import API from "../api/axios";

// type Post = {
//   _id: string;
//   caption: string;
//   images?: string[];
//   likes?: number;
//   liked?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// };

// function Home() {
//   const { totalLikes, friends } = useApp();
//   const { setActualUser } = useApp1();
//   // const username = localStorage.getItem("username");

//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [displayUsername, setDisplayUsername] = useState<string>("");
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get("/post/allPosts");
//         const res2 = await API.get("users/me");
//         if (res.data.success && Array.isArray(res.data.posts)) {
//           setPosts(res.data.posts);
//         } else {
//           console.error("❌ Failed to fetch posts:", res.data.message);
//         }
//         setActualUser(res.data);
//         if (res2.data.success) {
//           setDisplayUsername(res2.data.user.username);
//         }
//       } catch (err) {
//         console.error("🔥 Error fetching posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [setActualUser]);

//   return (
//     <>
//       {/* --- Profile Info Section --- */}
//       <div className="flex flex-col items-center text-center p-6 space-y-8">
//         <div className="flex justify-center">
//           <img
//             src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500"
//             className="w-20 h-20 rounded-full mx-auto object-cover"
//             alt="profile"
//           />
//         </div>

//         <p className="text-sm text-gray-500">{displayUsername}</p>

//         <section className="flex justify-center items-center gap-8 md:gap-16">
//           <div>
//             <p className="font-bold text-xl md:text-3xl text-gray-700">
//               {posts.length}
//             </p>
//             <h1 className="text-sm text-gray-500">Posts</h1>
//           </div>

//           <div>
//             <p className="font-bold text-xl md:text-3xl text-gray-700">
//               {totalLikes}
//             </p>
//             <h1 className="text-sm text-gray-500">Likes</h1>
//           </div>

//           <div>
//             <p className="font-bold text-xl md:text-3xl text-gray-700">
//               {friends.length}
//             </p>
//             <h1 className="text-sm text-gray-500">Friends</h1>
//           </div>
//         </section>

//         <div className="max-w-[400px]">
//           <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
//             natus beatae dolorum necessitatibus.
//           </p>
//         </div>

//         <div className="flex justify-center gap-4 mt-4">
//           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 active:scale-95 transition-all">
//             <Share2 size={18} />
//             <span className="text-sm font-medium">Share Profile</span>
//           </button>

//           <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
//             <Edit3 size={18} className="text-gray-600" />
//             <span className="text-sm font-medium">Edit Profile</span>
//           </button>
//         </div>
//       </div>

//       {/* --- Divider --- */}
//       <div className="h-[2px] bg-gray-200 w-full" />

//       {/* --- Posts Grid --- */}
//       <div className="mt-4 px-4">
//         <h1 className="text-2xl text-gray-600 font-bold mb-3">Posts</h1>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center min-h-[50vh]">
//             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-gray-500 text-sm font-medium">
//               Fetching your posts...
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {posts.length === 0 ? (
//               <p className="text-gray-400 text-sm col-span-full text-center">
//                 No posts yet
//               </p>
//             ) : (
//               posts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="flex flex-col items-center bg-white rounded-xl shadow-sm p-2 hover:shadow-md transition-all duration-200"
//                 >
//                   {post.images && post.images.length > 0 ? (
//                     post.images.map((imgUrl, i) => (
//                       <img
//                         key={i}
//                         src={imgUrl}
//                         alt={post.caption}
//                         className="rounded-lg object-cover w-full h-40"
//                       />
//                     ))
//                   ) : (
//                     <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
//                       No image
//                     </div>
//                   )}

//                   <p className="mt-2 text-gray-600 text-sm text-center truncate w-full">
//                     {post.caption || "No caption"}
//                   </p>

//                   <p className="text-xs text-gray-400 mt-1">
//                     {post.likes ?? 0} {post.likes === 1 ? "like" : "likes"}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // export default Home;

import { useEffect, useState } from "react";
import { useApp } from "../context/postContext";
import { useApp1 } from "../context/userContext";
import { Share2, Menu, LogOut, Users, Heart } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";
// import dayjs from "dayjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
type Post = {
  _id: string;
  caption: string;
  images?: string[];
  likes?: number;
  liked?: boolean;
  createdAt?: string;
  splitted: any | void | null;
};

function Home() {
  const { totalLikes, friends } = useApp();
  const { setActualUser } = useApp1();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayUsername, setDisplayUsername] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [localCaption, setLocalCaption] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/post/allPosts");
        const res2 = await API.get("/users/me");
        if (res.data.success && Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
        } else {
          console.error(" Failed to fetch posts:", res.data.message);
        }
        setActualUser(res.data);
        if (res2.data.success) {
          setDisplayUsername(res2.data.user.username);
          setLocalCaption(res.data.bio);
        }
      } catch (err) {
        console.error(" Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setActualUser]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    API.post("/users/logout", {}, { withCredentials: true });
    window.location.href = "/";
  };

  const handleBrowseFriends = () => {
    window.location.href = "/dashboard/friends";
  };
  //share
  const handleShareProfile = async () => {
    try {
      const username = localStorage.getItem("username") || "user";
      const profileUrl = `${window.location.origin}/user/${username}`; // link to your profile
      const shareData = {
        title: `${username}'s Profile`,
        text: `Check out ${username}'s profile on Pixsy!`,
        url: profileUrl,
      };

      if (navigator.share) {
        // Opens native share dialog on mobile/desktop supported browsers
        await navigator.share(shareData);
        toast.success("Profile shared successfully!");
      } else {
        // Fallback for unsupported browsers
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Failed to share profile.");
    }
  };

  //--end
  const username = localStorage.getItem("username");
  const splitted = username?.split("")[0];
  console.log(splitted);

  return (
    <>
      {/* --- Glassy Top Navbar --- */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-gray-200 flex items-center justify-between px-4 py-3 shadow-sm">
        <p className="font-semibold text-gray-800 text-lg">FriendsApp</p>
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

      {/* --- Profile Section --- */}
      <div className="flex flex-col items-center text-center p-6 space-y-6 mt-16 sm:mt-20">
        <div className="flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-200 text-blue-600 font-extrabold text-3xl flex items-center justify-center">
            {splitted?.[0]?.toUpperCase() || "U"}
          </div>
        </div>

        <p className="text-lg md:text-xl font-semibold text-gray-800">
          {displayUsername}
        </p>

        <section className="flex justify-center items-center gap-8 md:gap-16">
          <div>
            <p className="font-bold text-xl md:text-3xl text-gray-700">
              {posts.length}
            </p>
            <h1 className="text-sm text-gray-500">Posts</h1>
          </div>

          <div>
            <p className="font-bold text-xl md:text-3xl text-gray-700">
              {totalLikes}
            </p>
            <h1 className="text-sm text-gray-500">Likes</h1>
          </div>

          <div>
            <p className="font-bold text-xl md:text-3xl text-gray-700">
              {friends.length}
            </p>
            <h1 className="text-sm text-gray-500">Friends</h1>
          </div>
        </section>

        <div className="max-w-[450px]">
          <p className="text-sm text-gray-500 leading-relaxed">
            {localCaption}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            // onClick={()}
            className=" flex gap-2 p-2 w-full bg-blue-600 text-white rounded-sm shadow-xs font-bold"
          >
            <Share2 size={18} className="text-white" />
            <span
              onClick={() => handleShareProfile()}
              className="text-sm font-medium"
            >
              Share Profile
            </span>
          </button>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="h-[2px] bg-gray-200 w-full mt-8" />
      {/* --- Posts Grid --- */}
      <div className="mt-6 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
          Posts
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">
              Fetching your posts...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {posts.length === 0 ? (
              <p className="text-gray-400 text-sm col-span-full text-center">
                No posts yet
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {post.images && post.images.length > 0 ? (
                    <div className="relative">
                      <img
                        src={post.images[0]}
                        alt={post.caption}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/25 backdrop-blur-sm text-white text-xs p-1 flex justify-between items-center">
                        <span>{dayjs(post.createdAt).fromNow()}</span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} /> {post.likes ?? 0}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}

                  <p className="p-2 text-gray-700 text-sm truncate">
                    {post.caption || "No caption"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
