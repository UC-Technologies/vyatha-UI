// eslint-disable-next-line import/no-unresolved
// import Vite from './public/vite.svg'
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import styles from "./Navbar.module.scss";
import { UserContext } from "../../../Context/Provider";
import { fetchProfile } from "../../ReactQuery/Fetchers/User";
import { ConditionalLink } from "../ConditionalLink";
import useInternetStatus from "../../../Hooks/IsOnline";

const Navbar = () => {
  const { isLoggedIn, role } = useContext(UserContext);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role);
  }, [isLoggedIn, role]);
  const queryKey = useMemo(() => ["profile"], []);
  const { data, error } = useQuery(queryKey, fetchProfile, {
    enabled: isTrue,
  });
  const isConnected = useInternetStatus();
  const myProfile = data?.user;

  const conditionalTitle = isLoggedIn ? "Log Out" : "Log In";
  const conditionalAuth = isLoggedIn ? "/logout" : "/auth/login";
  const conditioanlDashbaord = isLoggedIn ? "/dashboard" : "/auth/login";
  const conditionalIcon = isLoggedIn
    ? "https://res.cloudinary.com/dp92qug2f/image/upload/v1703077878/logout_pz1e7m.png"
    : "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566654/Two_Tone_uoa0io.jpg?_s=public-apps";
  const conditionalProfile = isLoggedIn ? "/dashboard" : "/auth";
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
      title: "All Registered complaint",
      to: conditioanlDashbaord,
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
      title: conditionalTitle,
      to: conditionalAuth,
      icon: conditionalIcon,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    if (window.innerWidth > 660) return () => {};
    const handleOutsideClick = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  if (error) {
    return <div>Something went wrong!</div>;
  }

  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      {!isConnected && (
        <main>
          <div id={styles.offlinecontainer}>
            <p>No Internet Connection. Please Check your Network.</p>
            <div>
              <button style={{ cursor: "pointer" }} onClick={handleReload}>
                Reload
              </button>
            </div>
          </div>
        </main>
      )}
      <nav ref={navRef} className={styles.nav}>
        <ConditionalLink to="/" className={styles.header} onClick={close}>
          <img
            src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58099_igiaij.jpg?_s=public-apps"
            className={styles.logo}
            alt=""
          />
          <h1 className={styles.text}>Vyatha</h1>
        </ConditionalLink>
        <div className={styles.mobile_navbar}>
          <div onClick={open}>
            <img
              src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811896/UC%20VYATHA/Frame_58053_bdvele.jpg?_s=public-apps"
              className={`${styles.open_button} ${isOpen && styles.rotate}`}
              alt=""
            />
          </div>
          <div
            className={`${styles.mobile_navigation} ${
              isOpen ? styles.open : styles.close
            }`}
          >
            <div className={styles.top}>
              <div onClick={close}>
                <img
                  src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702626719/Frame_58062_iqs4xf.jpg?_s=public-apps"
                  className={`${styles.close_button} ${!isOpen && styles.rotate}`}
                  alt=""
                />
              </div>
            </div>
            {links.map((link) => (
              <ConditionalLink key={link.id} to={link.to} onClick={close}>
                <img src={link.icon} alt="" />
                {link.title}
              </ConditionalLink>
            ))}
          </div>
        </div>
        <div className={styles.desktop_navbar}>
          <ConditionalLink to="/">Home</ConditionalLink>
          <ConditionalLink to="/about">About Us</ConditionalLink>
          <ConditionalLink to={conditionalProfile}>
            {isLoggedIn ? (
              <div className={styles.profile}>
                {" "}
                <img src={myProfile?.profilepic} alt="" />
              </div>
            ) : (
              <div className={styles.profile}>
                {" "}
                <img
                  src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702566250/user_1_hntf9t.jpg?_s=public-apps"
                  alt=""
                />
              </div>
            )}
          </ConditionalLink>
        </div>
      </nav>
      <div
        className={`${styles.desktop_navigation} ${isOpen ? styles.open : styles.close}`}
      >
        <div className={styles.top}>
          {isOpen ? (
            <div
              onClick={close}
              className={`${styles.button} ${isOpen && styles.rotate}`}
            >
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702904046/Vector_umlqxo.jpg?_s=public-apps"
                alt=""
              />
            </div>
          ) : (
            <div onClick={open} className={`${styles.button} ${isOpen && styles.rotate}`}>
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702904046/Vector_umlqxo.jpg?_s=public-apps"
                alt=""
              />
            </div>
          )}
        </div>
        {links.map((link) => (
          <ConditionalLink
            className={styles.link}
            key={link.id}
            to={link.to}
            onClick={close}
          >
            <div className={styles.icon}>
              <img src={link.icon} alt="" />
            </div>
            <div className={`${styles.title}`}>{link.title}</div>
          </ConditionalLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
