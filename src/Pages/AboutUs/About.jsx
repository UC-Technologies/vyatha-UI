import { useState } from "react";
import styles from "./About.module.scss";
import About1 from "../../Assets/About/About1.svg";
import About2 from "../../Assets/About/About2.svg";
import dropArrow from "../../Assets/About/dropArrow.svg";
const About = () => {
  const [select, setSelect] = useState(null);
  const data = [
    {
      question: "Can I check the status of my complaint in real time?",

      answer:
        "  With Vyatha, you can report a wide range of grievances, from small issues like broken windows, termite problems, and water non-availability to more substantial concerns such as network problems, electricity power-cuts, and construction issues. We're here to address all your hostel-related problems, big or small.",
    },
    {
      question: "How can I download and install Vyatha on my device?",
      answer: "flkks;",
    },
    {
      question: "Is Vyatha secure and confidential?",
      answer: "",
    },
    {
      question: "Can I check the status of my complaint in real time?",
      answer: "",
    },
  ];
  const toggle = (i) => {
    if (select === i) {
      return setSelect(null);
    }
    return setSelect(i);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>About Us</p>
      </div>
      <img src={About1} className={styles.img1} alt="" />
      <div className={styles.about_content}>
        <p>
          We&apos;re Vyatha, powered by the trailblazers at NIT Silchar&apos;s ECell.
          Frustrated with the old, cumbersome hostel complaint system? So are
          we!That&apos;s why, we&apos;ve created an intuitive platform that empowers you
          to voice your grievances effortlessly. Not only that, but we also hold
          authorities accountable with our transparent, step-by-step tracking system.
          Vyatha is the future of hostel living, and we&apos;re just getting started. Join
          us, and let&apos;s revolutionize your hostel experience together!
        </p>
      </div>
      <img src={About2} className={styles.img2} alt="" />
      <div className={styles.accordion}>
        {data.map((item, i) => (
          <div className={select === i ? styles.accordion_show : styles.accordion_hide}>
            <div className={styles.item1} onClick={() => toggle(i)}>
              <p>{item.question}</p>
              <img
                src={dropArrow}
                className={select === i ? styles.img_rev : styles.img3}
                alt=""
              />
            </div>
            <p className={select === i ? styles.show : styles.hide}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
