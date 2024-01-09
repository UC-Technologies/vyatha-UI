/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAllAccounts = async () => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/getallaccounts`,
      tokenConfig
    );
    const accounts = res.data;
    return accounts;
  } catch (err) {
    console.error(err);
    return null;
  }
};
