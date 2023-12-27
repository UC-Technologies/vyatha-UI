import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import styles from "./ForgotPwd.module.scss";
import { UserContext } from "../../../Context/Provider";

const ForgotPwd = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (isLoggedIn === true) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_API}/forgotpassword`, { email })
        .then((res) => {
          if (res.data.message === "Reset link sent to your email") {
            toast("Reset link sent to your email");
          }
        });
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "Error in generating token":
            toast("Error in generating token");
            break;
          case "Email is required":
            toast("Email is required");
            break;
          case "email is missing":
            toast("email is missing");
            break;

          case "Email is not valid":
            toast("Email is not valid");
            break;
          case "No account exists":
            toast("No account exists");
            break;

          case "Internal Server Error":
            toast("Internal Server Error");
            break;
          default:
            toast("Error in generating token");
        }
      }
    } finally {
      setEmail("");
    }
  };

  useEffect(() => {
    document.title = "Forgot Password | Vyatha";
  }, []);

  return (
    <div className={styles.forget}>
      <div className={styles.forget_title}>
        <h1>Forgot Password</h1>
      </div>

      <div className={styles.form_starts}>
        <div className={styles.form}>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
            className={styles.nameinput}
            id="email"
          />
          <label htmlFor="email">Email</label>
        </div>

        <button id={styles.forgot_btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPwd;
