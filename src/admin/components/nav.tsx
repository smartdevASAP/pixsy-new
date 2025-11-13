import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAdmin } from "../../context/adminContext";
function Nav() {
  const [open, setOpen] = useState(false);
  const { logoutAdmin } = useAdmin();

  return (
    <nav className="bg-white border-b border-blue-100 p-3 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <p className="font-bold text-2xl text-blue-700">PIXSY</p>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 items-center text-gray-700 font-medium">
          <Link to="/panel" className="hover:text-blue-600">
            Overview
          </Link>
          <Link to="/panel/users" className="hover:text-blue-600">
            Users
          </Link>
          <Link to="/panel/statistics" className="hover:text-blue-600">
            Stats
          </Link>
          <Link to="/panel/posts" className="hover:text-blue-600">
            Posts
          </Link>
          <Link to="/panel/profile" className="hover:text-blue-600">
            profile
          </Link>
        </ul>

        {/* Profile Button (desktop) */}
        <button
          onClick={() => logoutAdmin()}
          className="hidden md:block bg-red-500 text-xs text-white px-4 py-2 font-semibold rounded-md shadow-sm hover:bg-blue-800 transition"
        >
          Logout
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-700 focus:outline-none"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 bg-blue-50 rounded-lg shadow-inner p-4 space-y-3">
          <Link
            to="/panel"
            className="block text-blue-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Overview
          </Link>
          <Link
            to="/panel/users"
            className="block text-blue-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/panel/statistics"
            className="block text-blue-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Stats
          </Link>
          <Link
            to="/panel/posts"
            className="block text-blue-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Posts
          </Link>
          <Link
            to="/panel/profile"
            className="block bg-blue-700 text-white text-center px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
