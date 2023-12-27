import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import styles from "./ResetPwd.module.scss";
import { UserContext } from "../../../Context/Provider";

const ResetPwd = () => {
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_API}/resetpassword/${token}`, {
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data.message === "Password reset successfully") {
            toast("Password reset successfully");
            setTimeout(() => {
              navigate("/auth/login");
            }, [1500]);
          }
        });
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error) {
          case "Payload missing":
            toast("Payload missing");
            break;
          case "Password must be atleast 8 characters long":
            toast("Password must be atleast 8 characters long");
            break;
          case "Passwords do not match":
            toast("Passwords do not match");
            break;
          case "Invalid token, user not found":
            toast("Invalid token, user not found");
            break;
          case "Token expired":
            toast("Token expired");
            break;
          case "Internal Server Error":
            toast("Internal Server Error");
            break;
          default:
            toast("Something went wrong");
        }
      }
    } finally {
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";
    }
  };

  useEffect(() => {
    document.title = "Reset Password | Vyatha";
  }, []);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (isLoggedIn === true) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.reset}>
      <div className={styles.reset_title}>
        <h1>Reset Password</h1>
      </div>

      <div className={styles.form_starts}>
        <div className={styles.form}>
          <input
            type="password"
            placeholder=""
            className={styles.nameinput}
            id="password"
          />
          <label htmlFor="password">New Password</label>
        </div>

        <div className={styles.form} id={styles.confirmpass}>
          <input
            type="password"
            placeholder=""
            className={styles.nameinput}
            id="confirmpassword"
          />
          <label htmlFor="password">Confirm New Password</label>
        </div>

        <button id={styles.forgot_btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPwd;
