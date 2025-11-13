import Sidebar from "./sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import { Home, Rss, Users, Edit, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "/dashboard/home", label: "Home", icon: Home },
    { id: "/dashboard/feed", label: "Feed", icon: Rss },
    { id: "/dashboard/friends", label: "Friends", icon: Users },
    { id: "/dashboard/posts", label: "Post", icon: Edit },
    { id: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto h-screen p-4">
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Bottom navigation (for small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 z-50">
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
    </div>
  );
}
