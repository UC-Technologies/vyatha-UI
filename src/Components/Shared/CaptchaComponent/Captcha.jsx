import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Captcha0.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Captcha = () => {
  const [Num1, setNum1] = useState(0);
  const [Num2, setNum2] = useState(0);
  const [Answer, setAnswer] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  // const [message, setMessage] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setNum1(num1);
    setNum2(num2);
    setAnswer(answer);
    setUserResponse("");
    // setMessage('');
  }

  function verifyCaptcha() {
    const userResponseInt = userResponse;
    if (userResponseInt === toString(Answer)) {
      // setMessage('CAPTCHA verified.');
      // alert("verified")
      toast.success("Verified", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // setMessage('CAPTCHA verification failed. Please try again.');

      toast.error("Invalid Captcha", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // use toast message in place of alert react-toastify
      // following props:
      // position: top-right
      // dark-mode: true (bg should be dark)
      // toast.error in place of alert
      // install react-toastify pnpm i react-toastify
      generateCaptcha();
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.heading}>
        {Num1} + {Num2}
      </div>
      <input
        type="text"
        placeholder="Enter your answer"
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
      />
      <button onClick={generateCaptcha} className={styles.refresh}>
        Refresh
      </button>
      <button onClick={verifyCaptcha} className={styles.Submit}>
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default Captcha;
