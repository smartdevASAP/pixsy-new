import { Routes, Route } from "react-router-dom";
import Overview from "../components/overview";
import Users from "../components/users";
import Stats from "../components/stats";
import Posts from "../components/posts";
import Profile from "../components/profile";

export default function PanelRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="users" element={<Users />} />
      <Route path="statistics" element={<Stats />} />
      <Route path="posts" element={<Posts />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}
