import React, { useEffect } from "react";
import styles from "./ForgotPwd.module.scss"
const ForgotPwd = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.title = "Forgot Password | Vyatha";
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
<button
         
          style={{ cursor: "pointer" }}
          type="submit"
          onClick={handleSubmit}
        >
         Confirm
        </button>
</form>
</div>
 </div>
  );
};

export default ForgotPwd;
