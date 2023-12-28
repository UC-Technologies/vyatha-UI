/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAllClosedIssuesHostelWise = async ({ hostel }) => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/fetchallclosedissuehostelwise/${hostel}`,
      tokenConfig
    );
    const allClosedIssuesHostelWise = res.data;
    return allClosedIssuesHostelWise;
  } catch (err) {
    console.error(err);
    return null;
  }
};
