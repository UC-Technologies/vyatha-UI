import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Captcha from "../../../Components/Shared/CaptchaComponent/Captcha";
import styles from "./Login.module.scss";

const Login = () => {
  useEffect(() => {
    document.title = "Login | Vyatha";
  }, []);

  const verifyCaptcha = () => {};
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
            type="password"
            id="password"
            className={styles.form_input}
            placeholder=" "
          ></input>
          <label className={styles.form_label} htmlFor="password">
            Password
          </label>
        </div>
        <Link to="/forgotpassword">
          <p id={styles.password_cont} className={styles.password}>
            Forgot Password?
          </p>
        </Link>

        <Captcha />
        <div id={styles.password_cont} className={styles.button}>
          <button type="submit" onClick={verifyCaptcha} className={styles.btn}>
            Login
          </button>
        </div>
        <Link id={styles.password_cont} to="/auth/signup">
          <p className={styles.signup}>Don&apos;t have an account? Sign up</p>
        </Link>
      </form>
    </div>
  );
};
export default Login;
