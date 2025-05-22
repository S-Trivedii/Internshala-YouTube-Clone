import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { USER_API_END_POINT } from "../apiEndPoint";

// First create a context with or without object.
const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userChannelId, setUserChannelId] = useState(null);

  // This will only run when whole app is reloaded or when UserProvider will get mounted or re-mounted
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });

        // console.log("User:- ", res.data);
        setUser(res.data.user);
        setIsLoggedIn(true);
        setUserChannelId(res.data.user.channels[0]); // persisting channelId
        // console.log("🚀 useEffect in UserProvider ran");
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        userChannelId,
        setUserChannelId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// hook
export const useUser = () => useContext(UserContext);
