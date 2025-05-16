import { Menu, User } from "lucide-react";
import logo from "../assets/youtube_logo.png";
import YouTubeSearch from "./YouTubeSearch";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { useUser } from "../utils/context/UserContext";

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // const signIn = false;
  // const user = { name: "Shubhanshu" };

  const { user, setUser, setIsLoggedIn } = useUser();
  const signIn = !!user;

  return (
    <header className="flex justify-between pt-2 mx-6 relative">
      {/* Left section */}
      <div>
        <div className="flex items-center">
          <Menu
            className="cursor-pointer mr-6 font-medium"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          <span className="flex items-center justify-center cursor-pointer">
            <img
              src={logo}
              alt="YouTube logo"
              className="w-[30px] h-[30px] mr-1"
            />
            <span className="font-bold text-xl">YouTube</span>
          </span>
        </div>
      </div>

      {/* Center search */}
      <div className="flex w-full max-w-xl">
        <YouTubeSearch />
      </div>

      {/* Right section */}
      <div className="relative">
        {signIn ? (
          <div className="relative flex items-center justify-center w-10 h-10">
            <div
              className="w-9 h-9 rounded-full cursor-pointer bg-blue-600 text-white flex items-center justify-center font-semibold text-sm"
              title={user.username}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            {showDropdown && (
              <div className="absolute top-full z-50 right-0 mt-2">
                <Dropdown
                  channelName={`@${user.username}`}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center cursor-pointer px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
          >
            <User className="w-5 h-5 mr-2" />
            <span className="text-sm">Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
