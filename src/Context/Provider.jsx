/* eslint-disable no-console */
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState("student");
  const [allComplaints, setAllComplaints] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    setFetching(false);
    if (fetching === true && token) {
      setIsLoggedIn(true);
    }
  }, [fetching]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      try {
        const [profileRes, allComplaintRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/dashboard`, tokenConfig),
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/fetchissues`, tokenConfig),
        ]);
        setProfile(profileRes.data);
        setAllComplaints(allComplaintRes.data);
        setRole(profileRes.data.user.role);
        // setDataFetched(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({ profile, allComplaints, isLoggedIn, role }),
    [profile, allComplaints, isLoggedIn, role]
  );

  if (fetching) {
    return null;
  }
  // console.log(isLoggedIn)
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { ContextProvider, UserContext };
