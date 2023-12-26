/* eslint-disable no-console */
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const token = Cookies.get("authToken");
  useEffect(() => {
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
        setDataFetched(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (dataFetched === true) {
      setIsLoggedIn(true);
    }
  }, [dataFetched]);

  const contextValue = useMemo(
    () => ({ profile, allComplaints, isLoggedIn }),
    [profile, allComplaints, isLoggedIn]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { ContextProvider, UserContext };
