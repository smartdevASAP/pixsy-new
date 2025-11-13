import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Feed from "./feed";
import Friends from "./friends";
import Posts from "./post";
import Settings from "./settings";
import Explore from "./explore";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="friends" element={<Friends />} />
      <Route path="feed" element={<Feed />} />
      <Route path="posts" element={<Posts />} />
      <Route path="settings" element={<Settings />} />
      <Route path="explore" element={<Explore />} />
    </Routes>
  );
};

export default Dashboard;
