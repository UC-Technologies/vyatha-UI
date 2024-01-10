import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import styles from "./ResetPwd.module.scss";
import { UserContext } from "../../../Context/Provider";

const ResetPwd = () => {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheck(true);
    if (!validateForm()) return;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confpassword")?.value;
    try {
      setSubmitting(true);
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
      document.getElementById("confpassword").value = "";
      setSubmitting(false);
    }
  };

  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [validPassword, setValidPassword] = useState(false);
  const [validConfPassword, setValidConfPassword] = useState(false);

  const validatePassword = useCallback(() => {
    const password = document.getElementById("password")?.value;
    if (password.length === 0) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else if (/\s/.test(password)) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password must not have whitespace",
      }));
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()])/.test(password)) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Include a digit, lower & uppercase letter & special character",
      }));
    } else if (password.length < 8) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 8 characters",
      }));
    } else setValidPassword(true);
  }, []);

  const validateConfPassword = useCallback(() => {
    const password = document.getElementById("password")?.value;
    const cpassword = document.getElementById("confpassword")?.value;
    if (password !== cpassword) {
      setValidConfPassword(false);
      setErrors((prev) => ({
        ...prev,
        confpassword: "Passwords don't match",
      }));
    } else setValidConfPassword(true);
  }, []);

  const validateForm = useCallback(() => {
    validatePassword();
    validateConfPassword();
    return validPassword && validConfPassword;
  }, [validConfPassword, validPassword, validateConfPassword, validatePassword]);

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
        <div
          className={`${styles.form} ${check && !validPassword ? styles.error : null}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder=""
            className={styles.nameinput}
            id="password"
            onChange={validatePassword}
          />
          <label htmlFor="password">New Password</label>
          <span>{errors.password}</span>
        </div>

        <div
          className={`${styles.form} ${
            check && !validConfPassword ? styles.error : null
          }`}
          id={styles.confirmpass}
        >
          <input
            type="password"
            placeholder=""
            className={styles.nameinput}
            id="confpassword"
            onChange={validateConfPassword}
          />
          <label htmlFor="confpassword">Confirm New Password</label>
          <span>{errors.confpassword}</span>
        </div>

        <div className={styles.showpassword__container}>
          <label className="labelshowpass">
            <input
              className="inputshowpass"
              type="checkbox"
              name="showPassword"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <span>Show password</span>
          </label>
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

export default ResetPwd;
