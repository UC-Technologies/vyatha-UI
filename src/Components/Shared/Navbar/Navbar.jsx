// eslint-disable-next-line import/no-unresolved
// import Vite from './public/vite.svg'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const links = [
    {
      id: 1,
      title: "My Profile",
      to: "/profile",
      icon: "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566250/user_1_hntf9t.jpg?_s=public-apps",
    },
    {
      id: 2,
      title: "Register complaints",
      to: "/register_complaint",
      icon: "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566697/Two_Tone_elte1d.jpg?_s=public-apps",
    },
    {
      id: 3,
      title: "Registered complaint",
      to: "/complaint",
      icon: "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566776/Two_Tone_jil29i.jpg?_s=public-apps",
    },
    {
      id: 4,
      title: "About Us",
      to: "/about",
      icon: "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566250/information-circle_pqdvjz.jpg?_s=public-apps",
    },
    {
      id: 5,
      title: "Log Out",
      to: "/",
      icon: "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566654/Two_Tone_uoa0io.jpg?_s=public-apps",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [isOpen]);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.header} onClick={close}>
        <img
          src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58099_igiaij.jpg?_s=public-apps"
          className={styles.logo}
          alt=""
        />
        <h1 className={styles.text}>Vyatha</h1>
      </Link>
      <div onClick={open} className={`${isOpen ? styles.close : styles.open}`}>
        <img
          src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811896/UC%20VYATHA/Frame_58053_bdvele.jpg?_s=public-apps"
          className={`${styles.open_button} ${isOpen && styles.rotate}`}
          alt=""
        />
      </div>
      <div className={`${styles.navbar} ${isOpen ? styles.open : styles.close}`}>
        <div className={styles.top} onClick={close}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702626719/Frame_58062_iqs4xf.jpg?_s=public-apps"
            className={`${styles.close_button} ${!isOpen && styles.rotate}`}
            alt=""
          />
        </div>
        {links.map((link) => (
          <Link key={link.id} to={link.to} onClick={close}>
            <img src={link.icon} alt="" />
            {link.title}
          </Link>
        ))}
      </div>
      <div className={styles.desktop_navbar}>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/auth">
          <img
            className={styles.profile}
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566250/user_1_hntf9t.jpg?_s=public-apps"
            alt=""
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
