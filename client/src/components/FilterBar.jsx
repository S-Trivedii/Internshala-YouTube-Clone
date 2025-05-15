import { useState } from "react";

const categories = [
  "All",
  "Gaming",
  "React",
  "Tutorial",
  "Python",
  "Counter Strike",
  "Music",
  "Live",
  "News",
  "JavaScript",
  "Podcasts",
];

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("All");

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
