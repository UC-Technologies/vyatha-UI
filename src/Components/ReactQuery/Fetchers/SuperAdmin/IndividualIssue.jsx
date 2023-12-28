/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const fetchIndividualIssue = async ({ issueId }) => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/detailedview/${issueId}`,
      tokenConfig
    );
    const oneIssue = res.data;
    return oneIssue;
  } catch (err) {
    console.error(err);
    return null;
  }
};
