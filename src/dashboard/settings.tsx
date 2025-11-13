import { useState } from "react";
import { Check, Bell, Shield, User, Palette, Trash } from "lucide-react";
import { useApp1 } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("account");

  const {
    username,
    setUsername,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    phone,
    setPhone,
    birthDay,
    setBirthDay,
    password,
    setPassword,
    pronouns,
    setPronouns,
    confirmPassword,
    setConfirmPassword,
    // confirmPhone,
    // setConfirmPhone,
    // email,
    // setEmail,
    bio,
    setBio,
    sendToServer,
  } = useApp1();

  const tabs = [
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
    { id: "danger", label: "Danger Zone", icon: <Trash size={18} /> },
  ];
  const navigate = useNavigate();
  //delete dummy
  const dummyDelete = (): any | void => {
    localStorage.clear();
    navigate("/");
  };
  const renderTab = () => {
    switch (currentTab) {
      case "account":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Edit Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                placeholder="First Name"
                className="p-3 border border-gray-300 rounded-sm"
              />
              <input
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                placeholder="Last Name"
                className="p-3 border border-gray-300 rounded-sm"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                className="p-3 border border-gray-300 rounded-sm"
              />
              <input
                onChange={(e) => setPronouns(e.target.value)}
                value={pronouns}
                placeholder="Pronouns"
                className="p-3 border border-gray-300 rounded-sm"
              />
            </div>

            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={3}
              placeholder="Bio"
              className="p-3 border border-gray-300 rounded-sm w-full resize-none"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-sm"
              />
              <input
                onChange={(e) => setBirthDay(e.target.value)}
                value={birthDay}
                placeholder="Birth Date (YYYY/MM/DD)"
                className="p-3 border border-gray-300 rounded-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="New Password"
                className="p-3 border border-gray-300 rounded-sm"
              />
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm Password"
                className="p-3 border border-gray-300 rounded-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={sendToServer}
                className="px-6 py-3 bg-[#0437FF] text-white rounded-sm flex items-center gap-2"
              >
                Save Changes <Check size={18} />
              </button>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Dark Mode</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Compact Layout</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Notifications
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">New Message Alerts</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Friend Request Alerts</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Post Likes & Comments</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Privacy & Security
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Private Account</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Hide Last Seen</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Allow Tagging</span>
              <input type="checkbox" className="w-5 h-5 accent-[#0437FF]" />
            </div>
          </div>
        );

      case "danger":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-gray-700">
              Deleting your account will permanently remove all your data,
              chats, and posts. This action cannot be undone.
            </p>
            <button
              onClick={() => dummyDelete()}
              className="px-6 cursor-pointer py-3 bg-red-600 text-white rounded-sm hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${
                currentTab === tab.id
                  ? "bg-[#0437FF] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderTab()}</main>
    </div>
  );
};

export default Settings;
