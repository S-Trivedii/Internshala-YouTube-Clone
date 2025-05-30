import { useSearch } from "../utils/context/SearchContext";

// Categories - hardcoded
const categories = [
  "All",
  "Counter",
  "Strike",
  "Flower",
  "Valley",
  "Play",
  "Game",
];

// Filtering based on category present in video title
const FilterBar = () => {
  // Created search context just for searching
  const { activeFilter, setActiveFilter } = useSearch();

  return (
    <div className="flex overflow-x-auto gap-3 px-4 py-2 bg-white sticky top-0 z-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`whitespace-nowrap px-4 py-1.5 mx-2 mt-2 rounded-lg text-sm font-medium transition-all ${
            activeFilter === category
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
