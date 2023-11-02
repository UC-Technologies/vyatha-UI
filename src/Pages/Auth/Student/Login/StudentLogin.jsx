import React from "react";
import Captcha from "../../../../Components/Shared/CaptchaComponent/Captcha";
import styles from "./StudentLogin.module.scss";
const StudentLogin = () => {
  const verifyCaptcha = () => {};
  return (
    <div className={styles.container}>
      <p className={styles.login}>Log in</p>
      <form className={styles.form_group}>
        <div className={styles.input_group}>
          <input
            type="number"
            id="number"
            className={styles.form_input}
            placeholder=" "
          ></input>
          <label className={styles.form_label} htmlFor="number">
            Scholarid
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
            password
          </label>
        </div>
        {/* <Captcha/> */}
        <p className={styles.password}>Forgot Password?</p>
        <div className={styles.captcha}>
          <Captcha />
        </div>
        <div className={styles.button}>
          <button type="submit" onClick={verifyCaptcha} className={styles.btn}>
            Login
          </button>
        </div>
        <p className={styles.signup}>Don&apos;t have an account?Sign up</p>
      </form>
    </div>
  );
};
export default StudentLogin;
