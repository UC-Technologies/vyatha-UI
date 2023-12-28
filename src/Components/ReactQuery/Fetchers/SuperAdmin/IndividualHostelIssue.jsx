/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAllIssuesHostelWise = async ({ hostel }) => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/fetchissuehostelwise/${hostel}`,
      tokenConfig
    );
    const allIssuesHostelWise = res.data;
    return allIssuesHostelWise;
  } catch (err) {
    console.error(err);
    return null;
  }
};
