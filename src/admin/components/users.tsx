import { motion } from "framer-motion";
import { User, Mail, Calendar } from "lucide-react";

export default function Users() {
  // Dummy user data (replace with real API data later)
  const users = [
    {
      id: 1,
      name: "Kelvin Kariuki",
      email: "kelvin@pixsy.com",
      joined: "Jan 12, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Maria Njeri",
      email: "maria@pixsy.com",
      joined: "Feb 08, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "James Kamau",
      email: "james@pixsy.com",
      joined: "Mar 15, 2025",
      status: "Pending",
    },
    {
      id: 4,
      name: "Faith Wambui",
      email: "faith@pixsy.com",
      joined: "Apr 02, 2025",
      status: "Suspended",
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">Users</h1>
        <p className="text-gray-500 mt-1">List of users on Pixsy</p>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden"
      >
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left flex items-center gap-2">
                <User className="w-4 h-4" /> Name
              </th>
              <th className="px-6 py-3 text-left flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </th>
              <th className="px-6 py-3 text-left flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Joined
              </th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-t border-blue-100 hover:bg-blue-50 transition-all"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-blue-100 text-blue-700"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
