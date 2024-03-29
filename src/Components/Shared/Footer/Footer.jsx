// import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  const contact = {
    mailid: "unnamedcreators.dev@gmail.com",
    tel: "+91 8812090429",
    address: "Startup Centre, NIT Silchar",
  };
  const social = {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/company/unnamed-creators",
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58099_igiaij.jpg?_s=public-apps"
            className={styles.logo}
            alt=""
          />
        </Link>
        <div className={styles.text}>
          <p>
            <span>Vyatha</span> Express, Resolve, Relax:
          </p>
          <p>Vyatha Does It All!</p>
        </div>
      </div>
      <div className={styles.contact}>
        <div className={styles.contact_field}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566249/Group_1520_eeaabb.jpg?_s=public-apps"
            className={styles.contact_icon}
            alt=""
          />
          <a href={`mailto:${contact.mailid}`}>
            <u>{contact.mailid}</u>
          </a>
        </div>
        <div className={styles.contact_field}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566249/Vector_4_jfvcef.jpg?_s=public-apps"
            className={styles.contact_icon}
            alt=""
          />
          <a href={`tel:${contact.tel}`}>{contact.tel}</a>
        </div>
        <div className={styles.contact_field}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566320/Group_1521_gat85c.jpg?_s=public-apps"
            className={styles.contact_icon}
            alt=""
          />
          <a
            href={`http://maps.google.com/?q=${contact.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.address}
          </a>
        </div>
      </div>
      <div className={styles.social_bar}>
        <Link to={social.linkedin} target="_blank">
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536788/UC%20VYATHA/Social_Icons_3_ekkehv.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </Link>
        <Link to={social.facebook} target="_blank">
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536731/UC%20VYATHA/Social_Icons_1_carjly.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </Link>
        <Link to={social.twitter} target="_blank">
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536775/UC%20VYATHA/Social_Icons_2_omyuzn.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
