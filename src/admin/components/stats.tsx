import { motion } from "framer-motion";
import { Users, FileText, Heart, BarChart3 } from "lucide-react";

export default function Stats() {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users },
    { title: "Total Posts", value: "567", icon: FileText },
    { title: "Total Likes", value: "8,942", icon: Heart },
    { title: "Engagement Rate", value: "74%", icon: BarChart3 },
  ];

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">Statistics</h1>
        <p className="text-gray-500 mt-1">Overall insights of Pixsy activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white border border-blue-100 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-semibold text-blue-700">
                {item.value}
              </h2>
            </div>
            <item.icon className="w-8 h-8 text-blue-600" />
          </motion.div>
        ))}
      </div>

      {/* Placeholder for future charts or metrics */}
      <div className="mt-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Detailed Analytics
        </h2>
        <p className="text-gray-600 text-sm">
          Charts and deeper analytics will appear here soon.
        </p>
      </div>
    </div>
  );
}
