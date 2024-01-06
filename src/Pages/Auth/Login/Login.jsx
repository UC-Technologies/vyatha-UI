import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import axios from "axios";
import { UserContext } from "../../../Context/Provider";
import styles from "./Login.module.scss";
import Captcha from "../../../Components/Shared/CaptchaComponent/Captcha";
import { ConditionalLink } from "../../../Components/Shared/ConditionalLink";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, captchaVerified } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
    document.title = "Login | Vyatha";
  }, [isLoggedIn, navigate]);

  const verifyCaptcha = async (e) => {
    e.preventDefault();
    if (captchaVerified === false) {
      toast("Verify captcha first");
      return;
    }

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API}/login`, {
        email,
        password,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.message === "Login successful") {
          Cookies.set("authToken", response?.data?.token);
          navigate("/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.data.error) {
            case "email is missing":
              toast("email is missing");
              break;

            case "Email is not valid":
              toast("Email is not valid");
              break;
            case "Please fill all required fields":
              toast("Please fill all required fields");
              break;

            case "no user found":
              toast("no user found");
              break;

            case "Account scheduled for deletion":
              toast("Account scheduled for deletion");
              break;

            case "wrong email or password":
              toast("wrong email or password");
              break;

            case "Something went wrong":
              toast("Something went wrong");
              break;
            default:
              toast("Something went wrong");
          }
        }
      });
  };

  return (
    <div className={styles.container}>
      <p className={styles.login}>Log in</p>
      <p className={styles.heading1}>Welcome!</p>
      <p className={styles.heading2}>Login to your account!</p>
      <form className={styles.form_group}>
        <div className={styles.input_group}>
          <input
            type="email"
            id="email"
            className={styles.form_input}
            placeholder=" "
          ></input>
          <label className={styles.form_label} htmlFor="email">
            Email
          </label>
        </div>
        <div className={styles.input_group}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={styles.form_input}
            placeholder=" "
          ></input>
          <label className={styles.form_label} htmlFor="password">
            Password
          </label>

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
        </div>
        {captchaVerified === false && <Captcha />}
        <ConditionalLink to="/forgotpassword">
          <p id={styles.password_cont} className={styles.password}>
            Forgot Password?
          </p>
        </ConditionalLink>

        {/* <Captcha /> */}
        <div id={styles.password_cont} className={styles.button}>
          <button type="submit" onClick={verifyCaptcha} className={styles.btn}>
            Login
          </button>
        </div>
        {captchaVerified === true ? (
          <a id={styles.password_cont} href="/auth/signup">
            {" "}
            <p className={styles.signup}>Don&apos;t have an account? Sign up</p>
          </a>
        ) : (
          <Link id={styles.password_cont} to="/auth/signup">
            <p className={styles.signup}>Don&apos;t have an account? Sign up</p>
          </Link>
        )}
      </form>
    </div>
  );
};
export default Login;
