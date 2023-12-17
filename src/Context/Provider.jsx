/* eslint-disable no-console */
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // client should set the cookie like this in login component
  // Cookies.set('authToken', token);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        const [profileRes, allComplaintRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/dashboard`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/allcomplaints`),
        ]);
        setProfile(profileRes.data);
        setAllComplaints(allComplaintRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({ profile, allComplaints, isLoggedIn }),
    [profile, allComplaints, isLoggedIn]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { ContextProvider, UserContext };
