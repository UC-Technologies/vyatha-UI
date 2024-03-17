import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import styles from "./ForgotPwd.module.scss";
import { UserContext } from "../../../Context/Provider";
import { formattedDate } from "../../../Components/Lib/GetDate";
const ForgotPwd = () => {
  const linkSentAt = formattedDate;
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (isLoggedIn === true) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  const [validEmail, setValidEmail] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = useCallback(() => {
    const email = document.getElementById("email")?.value;
    if (email.length === 0) {
      setError("Email is required");
      setValidEmail(false);
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(email)) {
      setError("Invalid email id");
      setValidEmail(false);
    } else setValidEmail(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheck(true);
    validateEmail();
    if (!validEmail) return;
    const email = document.getElementById("email")?.value;
    try {
      setSubmitting(true);
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_API}/forgotpassword`, {
          email,
          linkSentAt,
        })
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
      document.getElementById("email").value = "";
      setSubmitting(false);
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
        <div className={`${styles.form} ${check && !validEmail ? styles.error : null}`}>
          <input
            type="email"
            placeholder=" "
            onChange={validateEmail}
            className={styles.nameinput}
            id="email"
          />
          <label htmlFor="email">Email</label>
          <span>{error}</span>
        </div>

        <button
          disabled={submitting}
          style={{
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? "0.5" : "1",
          }}
          id={styles.forgot_btn}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPwd;
