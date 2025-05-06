import { Search } from "lucide-react";

const YouTubeSearch = () => {
  return (
    <>
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      {/* Search Button */}
      <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
        <Search className="w-5 h-5 text-gray-700" />
      </button>
    </>
  );
};

export default YouTubeSearch;
