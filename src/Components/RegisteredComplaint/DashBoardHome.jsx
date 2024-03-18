/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
import Styles from "./Dashboard.module.scss";
import { fetchComplaints } from "../ReactQuery/Fetchers/AllComplaints";
import { UserContext } from "../../Context/Provider";
import Skeleton from "../Shared/Loading/Skeletion";
import styles from "../../Pages/Dashboard/AllRegisteredComplaints/Student/ComplaintDashboardS.module.scss";
// import { UserContext } from "../../Context/Provider";

// todo: add functionality for the dsw to filter the notifications based on hostel

export const DashBoardHome = ({ role }) => {
  const { isLoggedIn } = useContext(UserContext);
  const queryKey = useMemo(() => ["complaints"], []);

  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role !== "superadmin");
  }, [isLoggedIn, role]);

  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    enabled: isTrue,
  });

  const isDean = useMemo(() => {
    return Boolean(role === "dsw" && isLoggedIn);
  }, [role, isLoggedIn]);

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
      if (
        visible &&
        ref.current &&
        !ref.current.contains(e.target) &&
        window.innerWidth > 768
      ) {
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

  // const notifications = [];
  const notifications = useMemo(() => {
    return notications;
  }, [notications]);

  // if (notications?.length > 0) {
  //   for (let i = notications.length - 1; i >= 0; i -= 1) {
  //     notifications.push(notications[i]);
  //   }
  // }

  // ? filtering the notifications based on the hostel for the DEAN
  const [selectedHostel, setSelectedHostel] = useState("All hostel");
  const [notificationsForDsw, setNotificationsForDsw] = useState([]);
  const handleSelectedHostelChange = (e) => {
    setSelectedHostel(e.target.value);
  };

  const allowedHostelValues = useMemo(() => {
    return [
      "BH1",
      "BH2",
      "BH3",
      "BH4",
      "BH6",
      "BH7",
      "BH8",
      "BH9A",
      "BH9B",
      "BH9C",
      "BH9D",
      "GH1",
      "GH2",
      "GH3",
      "GH4",
      "Aryabhatt-PGH",
    ];
  }, []);

  useEffect(() => {
    if (isDean && allowedHostelValues.includes(selectedHostel)) {
      const filteredNotificationsBasesOnHostel = notifications?.filter((item) => {
        return item?.hostel === selectedHostel;
      });
      setNotificationsForDsw(filteredNotificationsBasesOnHostel);
    } else if (isDean && selectedHostel === "All hostel") {
      setNotificationsForDsw(notifications);
    }
  }, [isDean, notifications, selectedHostel, allowedHostelValues]);
  // console.log("notificationsForDsw", notificationsForDsw)
  // console.log(notifications);
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
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
            {/* <h3 id={Styles.extramargintop}>Registered Complaints</h3> */}
            <h3 id={Styles.extramargintop}>
              {role === "student" ? "All Registered Complaints" : "All Forwarded Issues"}
            </h3>
          </Link>
        </div>

        <div className={Styles.registered}>
          <Link to={`/${role}/closedissues`}>
            <img src={img2} alt="All Closed Complaints" />
            <h3 id={Styles.extramargintop}>
              {role === "student" ? "All Closed Complaints" : "All Closed Issues"}
            </h3>
          </Link>
        </div>
      </div>
      <div className={Styles.Icon} onClick={handleClick}>
        {visible ? <img src={img3} alt="ON" /> : <img src={img4} alt="OFF" />}
      </div>
      <div
        className={`${Styles.Notifications} ${
          notifications?.length === 0 ? Styles.nonotifications : ""
        }`}
        ref={ref}
      >
        {isDean && (
          <main id={styles.drodownRaised} style={{ textAlign: "center" }}>
            <select
              id="hostel"
              value={selectedHostel}
              onChange={handleSelectedHostelChange}
            >
              <option>All hostel</option>
              <option>BH1</option>
              <option>BH2</option>
              <option>BH3</option>
              <option>BH4</option>
              <option>BH6</option>
              <option>BH7</option>
              <option>BH8</option>
              <option>BH9A</option>
              <option>BH9B</option>
              <option>BH9C</option>
              <option>BH9D</option>
              <option>GH1</option>
              <option>GH2</option>
              <option>GH3</option>
              <option>GH4</option>
              <option>Aryabhatt-PGH</option>
            </select>
          </main>
        )}
        {isDean
          ? notificationsForDsw?.length === 0 && <p>No notifications yet</p>
          : notifications?.length === 0 && <p>No notifications yet</p>}

        {isDean
          ? notificationsForDsw?.length > 1 && (
              <p>
                Total <strong>{notificationsForDsw?.length}</strong> Notifications
              </p>
            )
          : notifications?.length > 1 && (
              <p>
                Total <strong>{notifications?.length}</strong> Notifications
              </p>
            )}

        {isDean
          ? notificationsForDsw?.length > 0 &&
            notificationsForDsw?.map((item) => {
              return (
                <main key={item?._id} id={Styles.notification__main}>
                  <div id={Styles.notifications__flex}>
                    {item.message.includes("New Issue has been raised") ? (
                      <main>
                        <Link to={`/${role}/complaint/raised/${item?.issueID}`}>
                          {" "}
                          <p className={Styles.title_noti}>{item?.issueTitle}</p>
                        </Link>
                      </main>
                    ) : (
                      <main>
                        <Link to={`/${role}/complaint/${item?.issueID}`}>
                          {" "}
                          <p className={Styles.title_noti}>{item?.issueTitle}</p>
                        </Link>
                      </main>
                    )}

                    <p>{item?.time}</p>
                  </div>
                  <p>{item?.message}</p>
                </main>
              );
            })
          : notifications?.length > 0 &&
            notifications?.map((item) => {
              return (
                <main key={item?._id} id={Styles.notification__main}>
                  <div id={Styles.notifications__flex}>
                    {item.message.includes("New Issue has been raised") ? (
                      <main>
                        <Link to={`/${role}/complaint/raised/${item?.issueID}`}>
                          {" "}
                          <p className={Styles.title_noti}>{item?.issueTitle}</p>
                        </Link>
                      </main>
                    ) : (
                      <main>
                        <Link to={`/${role}/complaint/${item?.issueID}`}>
                          {" "}
                          <p className={Styles.title_noti}>{item?.issueTitle}</p>
                        </Link>
                      </main>
                    )}

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
