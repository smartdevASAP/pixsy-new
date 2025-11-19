import { motion } from "framer-motion";
import { Users, FileText, ThumbsUp, MessageSquare } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function Overview() {
  const stats = [
    {
      title: "Total users",
      value: 1523,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Total Posts",
      value: 432,
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Total Likes",
      value: 10894,
      icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Total Comments",
      value: 2845,
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      color: "from-blue-100 to-blue-50",
    },
  ];
  //local state variables
  const [allUsers, setAllUsers] = useState([]);
  //network requests to the DB
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await API.get("/admin/allUsers"); // Axios response
        if (res.data.success) {
          setAllUsers(res.data.users);
          console.log(res.data.users);
          console.log(allUsers);
          console.log("admin");
        } else {
          toast.error(res.data.message || "Failed to fetch users");
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">Overview</h1>
        <p className="text-gray-500 mt-1">Quick summary of Pixsy performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} border border-blue-100 shadow-sm hover:shadow-md hover:shadow-blue-100 transition-all`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Recent Activity
        </h2>
        <p className="text-gray-600 text-sm">
          See what’s happening in real time — coming soon.
        </p>
      </div>
    </div>
  );
}
