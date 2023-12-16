// import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  const contact = {
    mailid: "uclimited234@gmail.com",
    tel: "+91 7165471781",
    address: "NIT Silchar, Srijan E-Cell, 788010",
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
          <a href={`http://maps.google.com/?q=${contact.address}`}>{contact.address}</a>
        </div>
      </div>
      <div className={styles.social_bar}>
        <a href={social.linkedin}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536788/UC%20VYATHA/Social_Icons_3_ekkehv.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </a>
        <a href={social.facebook}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536731/UC%20VYATHA/Social_Icons_1_carjly.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </a>
        <a href={social.twitter}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694536775/UC%20VYATHA/Social_Icons_2_omyuzn.jpg?_s=public-apps"
            className={styles.social_icon}
            alt=""
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
