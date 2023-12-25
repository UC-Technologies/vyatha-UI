import React, { useEffect } from "react";
import styles from "./ResetPwd.module.scss";
const ResetPwd = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.title = "Reset Password | Vyatha";
  }, []);
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
            id="password"
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
