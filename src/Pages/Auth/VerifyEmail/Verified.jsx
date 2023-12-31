import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotVerified.module.scss";
import verifydesk from "../../../Assets/Verification/verifydesk.svg";
import wavedesk from "../../../Assets/Verification/wavedesk.svg";
import verify from "../../../Assets/Verification/verified.svg";
import wave from "../../../Assets/Verification/wave.svg";

const Verified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src={verify} alt="" className={styles.verified}></img>
      <div className={styles.div2}>
        <img src={verifydesk} alt="" className={styles.verified_desk}></img>
      </div>
      <img src={wave} alt="" className={styles.wave}></img>
      <img src={wavedesk} alt="" className={styles.wavedesk}></img>
      <div className={styles.email}>
        <p>Email Verified!</p>
      </div>
    </div>
  );
};

export default Verified;
