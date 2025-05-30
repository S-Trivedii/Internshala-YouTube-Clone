import { createContext, useContext, useState } from "react";

// Search context only for searching
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // for search bar
  const [searchQuery, setSearchQuery] = useState("");

  // for category
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, activeFilter, setActiveFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
