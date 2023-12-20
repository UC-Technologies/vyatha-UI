import React, { useEffect } from "react";
import styles from "./ResetPwd.module.scss"
const ResetPwd = () => {
  useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <div className={styles.Reset}>
            <div className={styles.reset_page}>
        <div className={styles.reset_title}>Reset Password</div>
        <form action="">
            <div className={styles.all_inputs}>
        <div className={styles.form}>
          <input type="password" placeholder="" className={styles.nameinput} id="new_pass" />
          <label htmlFor="new_pass">New password</label>
          
        </div>
        <div className={styles.form}>
        <input type="password" placeholder="" className={styles.nameinput} id="confirm_pass" />
          <label htmlFor="confirm_pass">Confirm password</label>
        </div>
        </div>
        <button type="submit" >
          Confirm
        </button>
        </form>
        </div>
         </div>
  );
};

export default ResetPwd;
