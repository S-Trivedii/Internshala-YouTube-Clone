import { Menu, User } from "lucide-react";
import logo from "../assets/youtube_logo.png";
import YouTubeSearch from "./YouTubeSearch";

const Header = () => {
  return (
    <header className="flex justify-between pt-2 mx-6">
      <div>
        <div className="flex items-center">
          <Menu className="cursor-pointer mr-6 font-medium" />
          <span className="flex items-center justify-center cursor-pointer">
            {" "}
            <img
              src={logo}
              alt="YouTube logo"
              className="w-[30px] h-[30px] mr-1"
            />{" "}
            <span className="font-bold text-xl">YouTube</span>
          </span>
        </div>
      </div>
      <div className="flex w-full max-w-xl">
        <YouTubeSearch />
      </div>
      <div>
        <button className="flex items-center cursor-pointer px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50">
          <User className="w-5 h-5 mr-2" />
          <span className="text-sm">Sign In</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
