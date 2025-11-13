import React, { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { useApp } from "../context/postContext"; // ✅ import the context
const Explore: React.FC = () => {
  const { addFriend, friends } = useApp(); // ✅ use context

  // Dummy users
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Kelvin Kariuki",
      username: "kelvin_k",
      profilePic:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500",
      bio: "Building the future, one line of code at a time.",
      isFriend: false,
    },
    {
      id: "2",
      name: "Jane Doe",
      username: "janedoe",
      profilePic:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
      bio: "Designer & dreamer 🌸",
      isFriend: false,
    },
    {
      id: "3",
      name: "Michael Smith",
      username: "mikesmith",
      profilePic:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500",
      bio: "React & Firebase enthusiast ⚡",
      isFriend: false,
    },
  ]);

  // When clicking follow button
  const handleFollow = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const isNowFriend = !user.isFriend;

          // ✅ add to context if becoming a friend
          if (isNowFriend) {
            addFriend({
              id: Number(user.id),
              name: user.name,
              profilePic: user.profilePic,
            });
          }

          return { ...user, isFriend: isNowFriend };
        }
        return user;
      })
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm md:text-xl font-bold text-gray-800">
          Explore Users
        </h1>
        <div className="flex items-center gap-2 border rounded-full px-3 py-2 bg-white shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="outline-none text-sm w-40 bg-transparent"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
            <div className="text-center mt-3">
              <h2 className="font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {user.bio}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleFollow(user.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  user.isFriend
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-500 text-white"
                }`}
              >
                <UserPlus size={16} />
                {user.isFriend ? "Unfollow" : "Add Friend"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Optional: show added friends below */}
      {friends.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Your Friends
          </h2>
          <div className="flex flex-wrap gap-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-white shadow-sm rounded-xl p-3 flex items-center gap-3"
              >
                <img
                  src={friend.profilePic}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-gray-700 text-sm font-medium">
                  {friend.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
