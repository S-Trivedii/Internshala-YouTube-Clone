import { createContext, useContext, useState } from "react";

// First create a context with or without object.
const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// hook
export const useUser = () => useContext(UserContext);
