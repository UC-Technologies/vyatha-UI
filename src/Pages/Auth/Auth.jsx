import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import animationData from "../../Assets/Auth/logo.json";

const Auth = () => {
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
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702708285/Group_40593_jerkgd.jpg?_s=public-apps"
                alt=""
              />
            </button>

            <button
              type="button"
              aria-label="Admin"
              className={styles.admin_div}
              onClick={handleAdmin}
            >
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702708285/Group_40594_vk3pvt.jpg?_s=public-apps"
                alt=""
              />
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
