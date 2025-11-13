import { useApp } from "../context/postContext";
import { Link } from "react-router-dom";
import { null_img } from "../assets/assets";
function Friends() {
  const { friends } = useApp();
  return (
    <div>
      <p className="text-sm md:text-xl font-bold text-gray-800">friends page</p>
      {friends.length === 0 ? (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 rounded-lg">
          <div className="bg-gray-100/2 p-4 rounded-lg shadow-sm ">
            {null_img.map((img) => {
              return <img className="w-72 mb-6" src={img.img} alt="" />;
            })}
            <p className="text-sm mb-8  text-gray-700 text-center">
              You currently have no friends, Click the button below <br /> to
              connect with friends
            </p>
            <Link to="/dashboard/posts">
              <button className="p-2 rounded-sm bg-blue-600 text-white font-semibold shadow-sm w-full text-center">
                Browse Friends
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>You have some friends</p>
      )}
    </div>
  );
}

export default Friends;
