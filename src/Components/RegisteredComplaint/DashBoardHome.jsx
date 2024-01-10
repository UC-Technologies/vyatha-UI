/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
import Styles from "./Dashboard.module.scss";
import { fetchComplaints } from "../ReactQuery/Fetchers/AllComplaints";
import { UserContext } from "../../Context/Provider";
// import { UserContext } from "../../Context/Provider";

export const DashBoardHome = ({ role }) => {
  const { isLoggedIn } = useContext(UserContext);
  const { data, error, isLoading } = useQuery("complaints", fetchComplaints, {
    refetchOnWindowFocus: "always",
    enabled: isLoggedIn,
    refetchInterval: 60000,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
  });

  // const [fetchedData, setFetcedData] = useState({})

  // console.log(isLoggedInRef.current)
  const img1 =
    "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702904199/documents-svgrepo-com_2_zogi0m.jpg?_s=public-apps";
  const img2 =
    "https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1702904281/documents-svgrepo-com_1_obapjo.jpg?_s=public-apps";
  const img3 =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703020256/notifications_active_y38ve2.jpg?_s=public-apps";
  const img4 =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703020257/notifications_off_zkd9hb.jpg?_s=public-apps";

  // const width = window.innerWidth;
  // console.log(width);
  // const [role, setRole] = useState("client");
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    const parentElement = ref.current;
    if (visible) {
      parentElement.style.left = "100vw";
      setTimeout(() => {
        parentElement.style.display = "none";
      }, 500);
      setVisible(false);
    } else {
      parentElement.style.removeProperty("display");
      setTimeout(() => {
        parentElement.style.left = "0";
      }, 10);
      setVisible(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (visible && ref.current && !ref.current.contains(e.target)) {
        const parentElement = ref.current;
        parentElement.style.left = "100vw";
        setTimeout(() => {
          parentElement.style.display = "none";
          setVisible(false);
        }, 1000);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [visible]);

  const notications =
    role === "student"
      ? data?.filteredStudentNotifications
      : role === "supervisor"
      ? data?.filteredSupervisorNotifications
      : role === "dsw"
      ? data?.filteredDswNotifications
      : role === "warden"
      ? data?.filteredWardenNotifications
      : null;

  // console.log( notications);
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.RegComplaints}>
        <div className={Styles.slogan}>Express, Resolve, Relax : Vyatha does it all!</div>
        {role === "student" && (
          <div className={Styles.register}>
            <Link to="/register_complaint">
              <img src={img1} alt="student register" />
              <h3>Register a Complaint</h3>
            </Link>
          </div>
        )}
        <div className={Styles.registered}>
          <Link to={`/${role}/allcomplaints`}>
            <img src={img2} alt="registered complaints" />
            <h3 id={Styles.extramargintop}>Registered Complaints</h3>
          </Link>
        </div>

        <div className={Styles.registered}>
          <Link to={`/${role}/closedissues`}>
            <img src={img2} alt="All Closed Complaints" />
            <h3 id={Styles.extramargintop}>All Closed Complaints</h3>
          </Link>
        </div>
      </div>
      <div className={Styles.Icon} onClick={handleClick}>
        {visible ? <img src={img3} alt="ON" /> : <img src={img4} alt="OFF" />}
      </div>
      <div className={Styles.Notifications} ref={ref}>
        {notications?.length === 0 && <p>No notifications yet</p>}
        {notications?.length > 0 &&
          notications?.map((item) => {
            return (
              <main key={item?._id} id={Styles.notification__main}>
                <div id={Styles.notifications__flex}>
                  <p className={Styles.title_noti}>{item?.issueTitle}</p>
                  <p>{item?.time}</p>
                </div>
                <p>{item?.message}</p>
              </main>
            );
          })}
      </div>
    </div>
  );
};

export default DashBoardHome;
