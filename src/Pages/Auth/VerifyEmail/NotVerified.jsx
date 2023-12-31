import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotVerified.module.scss";
import notverifydesk from "../../../Assets/Verification/notverifydesk.svg";
import wavedesk from "../../../Assets/Verification/wavedesk.svg";
// import verify from '../../../Assets/Verification/verified.svg'
import notverify from "../../../Assets/Verification/notverified.svg";
import wave from "../../../Assets/Verification/wave.svg";

const NotVerified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth/signup");
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src={notverify} alt="" className={styles.verified}></img>
      <div className={styles.div2}>
        <img src={notverifydesk} alt="" className={styles.verified_desk}></img>
      </div>
      {/* <div className={styles.try}>
        <a href="/">Try again</a>
      </div> */}
      <img src={wave} alt="" className={styles.wave}></img>
      <img src={wavedesk} alt="" className={styles.wavedesk}></img>
      <div className={styles.email}>
        <p>Email Not Verified!</p>
      </div>
    </div>
  );
};

export default NotVerified;
