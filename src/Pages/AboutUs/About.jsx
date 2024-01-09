import { useState, useEffect } from "react";
import styles from "./About.module.scss";
import About1 from "../../Assets/About/About1.svg";
import About2 from "../../Assets/About/About2.svg";
import dropArrow from "../../Assets/About/dropArrow.svg";
const About = () => {
  useEffect(() => {
    document.title = "About Us | Vyatha";
  }, []);

  const [select, setSelect] = useState(null);
  const data = [
    {
      question: "Can I check the status of my complaint in real time?",
      id: 1,
      answer:
        "  Yes, you can check the real-time status of your complaint on Vyatha. Once you've lodged a complaint, you can log in to your account to see if it's in processing, resolved, or denied, providing transparency in the resolution process.",
    },
    {
      question: "How can I download and install Vyatha on my device?",
      id: 2,
      answer:
        "To access Vyatha, you can visit our website at vyatha.com using a web browser on your device. As of now, we primarily operate as a web-based platform, allowing users to submit complaints, check their status, and facilitate communication between boarders and administration. We don't currently offer a dedicated mobile app, but you can access Vyatha easily through your device's web browser for a seamless experience.      ",
    },
    {
      question: "Is Vyatha secure and confidential?",
      id: 3,
      answer:
        "Yes, Vyatha takes security and confidentiality seriously. We use encryption protocols to secure user data and ensure that sensitive information is protected. Your complaints and personal details are handled with utmost confidentiality, and access to this information is restricted to authorized personnel only. We prioritize maintaining a secure environment to foster trust between hostel boarders and administration.",
    },
    {
      question: "Can I check the status of my complaint in real time?",
      id: 4,
      answer:
        "Yes, on Vyatha, you can check the real-time status of your complaint. Log in to your account, and you'll be able to see whether your complaint is in processing, resolved, or denied, providing you with up-to-date information on the resolution progress.",
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
      <div className={styles.div1}>
        <img src={About1} className={styles.img1} alt="" />
        <div className={styles.about_content}>
          <p>
            We&apos;re Vyatha, powered by the trailblazers at NIT Silchar. Frustrated with
            the old, cumbersome hostel complaint system? So are we!That&apos;s why,
            we&apos;ve created an intuitive platform that empowers you to voice your
            grievances effortlessly. Not only that, but we also hold authorities
            accountable with our transparent, step-by-step tracking system. Vyatha is the
            future of hostel living, and we&apos;re just getting started. Join us, and
            let&apos;s revolutionize your hostel experience together!
          </p>
        </div>
      </div>

      <div className={styles.div2}>
        <img src={About2} className={styles.img2} alt="" />
        <div className={styles.accordion}>
          {data.map((item, i) => (
            <div key={item.id} className={styles.accordion_hide}>
              <div className={styles.item1} onClick={() => toggle(i)}>
                <p>{item.question}</p>
                <img
                  src={dropArrow}
                  className={select === i ? styles.img_rev : styles.img3}
                  alt=""
                />
              </div>
              <p className={select === i ? styles.content_show : styles.content}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
