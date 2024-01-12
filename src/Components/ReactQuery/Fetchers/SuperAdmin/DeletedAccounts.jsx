/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAllDeletedAccounts = async () => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/getscheduledaccounts`,
      tokenConfig
    );
    const allDeletedAccounts = res.data;
    return allDeletedAccounts;
  } catch (err) {
    console.error(err);
    return null;
  }
};
