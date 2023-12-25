import React, { useEffect } from "react";
import styles from "./ForgotPwd.module.scss";
const ForgotPwd = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <input type="email" placeholder="" className={styles.nameinput} id="email" />
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
