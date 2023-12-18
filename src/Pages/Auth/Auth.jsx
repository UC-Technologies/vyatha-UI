import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import animationData from "../../Assets/Auth/logo.json";

const Auth = () => {
  useEffect(() => {
    document.title = "Auth | Vyatha";
  }, []);

  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/auth/admin");
  };

  const handleStudent = () => {
    navigate("/auth/student");
  };

  return (
    <div className={styles.container_div}>
      <div className={styles.main_div}>
        <div className={styles.upper_div}>
          <div className={styles.div_3}>
            <p>Vyatha</p>
          </div>
          <div className={styles.logo_div}>
            <Lottie animationData={animationData} loop={false} />
          </div>
        </div>

        <div className={styles.middle_div}></div>
        <div className={styles.lower_div}>
          <div className={styles.div_1}>
            <div className={styles.div_4}>Welcome!</div>
            <div className={styles.div_5}>Login to your account</div>
            <button
              type="button"
              aria-label="Student"
              className={styles.student_div}
              onClick={handleStudent}
            >
              <div>
                <div>Log in</div>
              </div>
            </button>

            <button
              type="button"
              aria-label="Admin"
              className={styles.admin_div}
              onClick={handleAdmin}
            >
              <div>
                <div>Sign up</div>
              </div>
            </button>
          </div>
          <div className={styles.div_2}>
            <p>Vyatha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
