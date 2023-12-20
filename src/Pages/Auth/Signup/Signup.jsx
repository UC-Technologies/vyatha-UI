import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.scss";

const SignUp = () => {
  useEffect(() => {
    document.title = "Signup | Vyatha";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [selects, setSelects] = useState("Student");
  const ref = useRef(null);

  useEffect(() => {
    if (selects === "Student") {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }, [selects]);

  return (
    <div className={styles.maindiv}>
      <h1 id={styles.details_heading}>Enter your Details</h1>
      <form action="">
        <div className={styles.form}>
          <input type="text" placeholder=" " className={styles.nameinput} id="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.form}>
          <input type="email" placeholder=" " className={styles.nameinput} id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.designation}>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option>Student</option>
            <option>Warden</option>
            <option>Supervisor</option>
            <option>Dean</option>
          </select>
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

        <button
          id={styles.btn_signup}
          style={{ cursor: "pointer" }}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <Link id={styles.already_account_login} to="/auth/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
