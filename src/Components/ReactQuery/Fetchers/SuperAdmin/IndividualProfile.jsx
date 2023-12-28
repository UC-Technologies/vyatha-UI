/* eslint-disable no-console */
import axios from "axios";
import Cookies from "js-cookie";

export const individualProfile = async ({ _id }) => {
  try {
    const token = Cookies.get("authToken");
    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/profile/${_id}`,
      tokenConfig
    );
    const indiProfile = res.data;
    return indiProfile;
  } catch (err) {
    console.error(err);
    return null;
  }
};
