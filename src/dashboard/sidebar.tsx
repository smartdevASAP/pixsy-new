import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Edit,
  Home,
  Rss,
  Settings,
  Search,
  Menu,
  ChevronLeft,
  Compass,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import toast from "react-hot-toast";

const navItems = [
  { id: "/dashboard/home", label: "Home", icon: Home },
  { id: "/dashboard/explore", label: "Explore", icon: Compass },
  { id: "/dashboard/friends", label: "Friends", icon: Users },
  { id: "/dashboard/feed", label: "Feed", icon: Rss },
  { id: "/dashboard/posts", label: "Post", icon: Edit },
  { id: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ initialCollapsed = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // ✅ Logout
  const logoutFunc = async () => {
    try {
      const res = await API.get("/users/logout", { withCredentials: true });

      if (res.data.success) {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Error logging out");
      }
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
    }
  };

  // ✅ Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < 768;
      setIsSmallScreen(small);
      setCollapsed(small);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Update username dynamically when localStorage changes
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername !== username) setUsername(storedUsername || "");
    }, 1000);
    return () => clearInterval(interval);
  }, [username]);

  const handleToggle = () => {
    if (isSmallScreen) return;
    setCollapsed((prev) => !prev);
  };

  // ✅ Small Screen Bottom Nav
  if (isSmallScreen) {
    return (
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  // ✅ Desktop Sidebar
  return (
    <aside
      className={`h-[100vh] overflow-hidden flex-shrink-0 bg-white text-gray-800 shadow-lg rounded-2xl p-3 transition-all duration-300 flex flex-col justify-between border border-gray-100`}
      style={{ width: collapsed ? 72 : 260 }}
      aria-label="Primary sidebar"
    >
      <div>
        {/* Logo + Toggle */}
        <div className="flex items-center gap-3 px-1 mb-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
              {username ? username[0].toUpperCase() : "K"}
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {username || "Guest"}
                </h1>
                <p className="text-xs text-gray-500">user</p>
              </div>
            )}
          </motion.div>

          <button
            onClick={handleToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav aria-label="Main navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 transition-colors ${
                  isActive ? "bg-blue-50 ring-1 ring-blue-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg">
                  <Icon size={18} />
                </div>
                {!collapsed && (
                  <span className="font-medium text-gray-800">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-4">
        {!collapsed && (
          <div className="mb-3 px-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-200 p-2 pl-10 text-sm bg-white focus:ring-2 focus:ring-blue-200"
              />
              <div className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </div>
            </div>
          </div>
        )}
        <div className="mt-3 px-1 text-xs text-gray-500">
          {!collapsed ? (
            <>
              Logged in as <strong>{username || "Guest"}</strong>
              <button
                onClick={logoutFunc}
                className="w-full rounded-sm mt-2 bg-blue-600 text-white py-1 shadow-sm hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="text-center">v1.0</div>
          )}
        </div>
      </div>
    </aside>
  );
}
