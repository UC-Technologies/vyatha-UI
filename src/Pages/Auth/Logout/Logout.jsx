import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import styles from "./Logout.module.scss";
import { UserContext } from "../../../Context/Provider";
import { fetchProfile } from "../../../Components/ReactQuery/Fetchers/User";

const Logout = () => {
  const { isLoggedIn, role } = useContext(UserContext);
  const queryKey = useMemo(() => ["profile"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role);
  }, [isLoggedIn, role]);

  const { data } = useQuery(queryKey, fetchProfile, {
    enabled: isTrue,
  });
  const User = data?.user;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Logout?";
    if (!isLoggedIn) navigate("/auth/login");
  }, [navigate, isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/");
    window.location.reload();
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main className={styles.parent__logout}>
      <div className={styles.img__ecell__holder}>
        <Link to="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dp92qug2f/image/upload/v1704164059/vyatha-removebg-preview_oq9ueq.png"
            alt=""
          />
        </Link>
      </div>

      <p className={styles.select_p}>Select Account to Sign Out</p>

      <div className={styles.signedin__details}>
        <div className={styles.user__auth__profile_img}>
          <img src={User?.profilepic} alt="" />
        </div>
        <div id={styles.auth__details__cont}>
          <p>
            Signed in as{" "}
            <span id={styles.bold__auth__name}>
              <Link to="/dashboard">{User?.name}</Link>
            </span>{" "}
          </p>
        </div>
      </div>

      <div className={styles.logout__btn}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.back__to__dashboard}>
        <button onClick={handleGoToDashboard}>
          <GoArrowLeft />
          <span style={{ marginLeft: ".35vw" }}>Back to Dashboard</span>
        </button>
      </div>
    </main>
  );
};

export default Logout;
