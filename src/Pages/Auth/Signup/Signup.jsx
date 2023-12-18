import React, { useState, useRef } from "react";
import styles from "./Signup.module.scss";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [selects, setSelects] = useState("Student");
  const ref = useRef(null);
  (() => {
    if (selects !== "Student") {
      ref.current.style.display = "none";
    }
  })();
  return (
    <div className={styles.maindiv}>
      <h1>Enter your Details</h1>
      <form action="">
        <div className={styles.form}>
          <input type="text" placeholder=" " className={styles.nameinput} id="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.form}>
          <input type="email" placeholder=" " className={styles.nameinput} id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.form} ref={ref}>
          <input
            type="number"
            placeholder=" "
            className={styles.nameinput}
            id="scholar"
          />
          <label htmlFor="scholar">Scholar ID</label>
        </div>
        <div className={styles.form}>
          <input type="number" placeholder=" " className={styles.nameinput} id="phone" />
          <label htmlFor="phone">Phone</label>
        </div>
        <div className={styles.designation}>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option>Student</option>
            <option>Warden</option>
            <option>Supervisor</option>
            <option>Dean</option>
          </select>
        </div>
        <div className={styles.form}>
          <input type="password" placeholder=" " className={styles.nameinput} id="pass" />
          <label htmlFor="pass">Password</label>
        </div>
        <div className={styles.form}>
          <input
            type="password"
            placeholder=" "
            className={styles.nameinput}
            id="passconf"
          />
          <label htmlFor="passconf">Confirm Password</label>
        </div>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
