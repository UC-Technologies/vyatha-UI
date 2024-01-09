import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import styles from "./Captcha0.module.scss";
import { UserContext } from "../../../Context/Provider";

const Captcha = () => {
  const [Num1, setNum1] = useState(0);
  const [Num2, setNum2] = useState(0);
  const [Answer, setAnswer] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const { setCaptchaVerified } = useContext(UserContext);

  useEffect(() => {
    generateCaptcha();
  }, []);

  function generateCaptcha(e) {
    e?.preventDefault();
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setNum1(num1);
    setNum2(num2);
    setAnswer(answer);
    setUserResponse("");
  }

  function verifyCaptcha(e) {
    e.preventDefault();
    const userResponseInt = Number(userResponse);
    if (userResponseInt === Answer) {
      toast("Correct");
      setCaptchaVerified(true);
      generateCaptcha();
    } else {
      toast("Invalid answer");
      generateCaptcha();
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.heading} style={{ userSelect: "none" }}>
        {Num1} + {Num2}
      </div>
      <input
        type="text"
        placeholder="Enter your answer"
        value={userResponse}
        onChange={(e) => {
          setUserResponse(e.target.value);
        }}
      />
      <button
        onClick={generateCaptcha}
        style={{ cursor: "pointer" }}
        className={styles.refresh}
      >
        Refresh
      </button>
      <button
        onClick={verifyCaptcha}
        style={{ cursor: "pointer" }}
        className={styles.Submit}
      >
        Verify
      </button>
    </div>
  );
};

export default Captcha;
