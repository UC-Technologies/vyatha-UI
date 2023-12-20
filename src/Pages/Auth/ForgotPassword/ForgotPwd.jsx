import React, { useEffect } from "react";
import styles from "./ForgotPwd.module.scss"
const ForgotPwd = () => {
  useEffect(() => {
    document.title = "Forgot Password?";
  }, []);
  return (
    <div className={styles.Forget}>
    <div className={styles.forgot_page}>
<div className={styles.forget_title}>Forgot Password</div>
<form action="">
<div className={styles.form}>
  <input type="email" placeholder="" className={styles.nameinput} id="email" />
  <label htmlFor="email">Email</label>
</div>
<button type="submit" >
  Confirm
</button>
</form>
</div>
 </div>
  );
};

export default ForgotPwd;
