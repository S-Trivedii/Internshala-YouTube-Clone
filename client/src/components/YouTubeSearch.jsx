import { Search } from "lucide-react";
import { useSearch } from "../utils/context/SearchContext";

// Search bar
const YouTubeSearch = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <button className="px-4 py-2 cursor-pointer bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
        <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
      </button>
    </>
  );
};

export default YouTubeSearch;
