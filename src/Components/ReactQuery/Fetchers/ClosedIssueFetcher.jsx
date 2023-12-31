/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchClosedComplaints = async () => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/fetchclosedissue`,
      tokenConfig
    );
    const closedComplaints = res.data;
    return closedComplaints;
  } catch (err) {
    console.error(err);
    return null;
  }
};
