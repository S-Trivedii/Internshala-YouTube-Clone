import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/apiEndPoint";

const Dropdown = ({
  channelName = "@xyz_youtube",
  setUser,
  setIsLoggedIn,
  userChannelId,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      // console.log("Logged out", response.data);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("Logged out failed, ", error.message);
    }
  };

  return (
    <div className=" w-56 bg-gray-100 rounded-md shadow-lg border text-sm z-50">
      <div className="px-4 py-3 font-semibold border-b">{channelName}</div>
      <Link
        className="block w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
        to={`/channel/${userChannelId}`}
      >
        View Your Channel
      </Link>

      <button
        className="block w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:text-red-800 hover:font-bold "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
