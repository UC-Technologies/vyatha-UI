import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import { fetchComplaints } from "../../ReactQuery/Fetchers/AllComplaints";
import styles from "./Status.module.scss";

const StatusOfComplaint = () => {
  const { key } = useParams();
  const { data, error, isLoading, isFetching } = useQuery(
    "complaint",
    fetchComplaints,
    {}
  );
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  /* eslint-disable no-underscore-dangle */
  const complaint = data.allIssues.find((item) => item._id === key);
  /* eslint-enable no-underscore-dangle */

  //  console.log(complaint);
  //  console.log(key)
  // console.log(complaint.forwardedTo)
  const parsedData = moment.tz(
    complaint.IssueCreatedAt,
    "DD-MM-YYYY h:mma",
    "Asia/Kolkata"
  );

  const date = parsedData.format("DD-MM-YYYY");
  const time = parsedData.format("h:mma");
  // console.log(time)

  const parsedData1 = moment.tz(
    complaint.IssueForwardedAtToSupervisor,
    "DD-MM-YYYY h:mma",
    "Asia/Kolkata"
  );
  const date1 = parsedData1.format("DD-MM-YYYY");
  const time1 = parsedData1.format("h:mma");
  // console.log(time1)
  // const complaint.forwardedTo="warden"

  // const superStyle = {
  //   // backgroundColor: complaint.forwardedTo === 'supervisor' ? 'var(--vyatha-main-color-dark)' : '#ffffff' ,width: "1vw", height:"25%",
  //   backgroundColor: 'var(--vyatha-main-color-dark)',
  //   width: '1vw',
  //    height: complaint.forwardedTo === 'supervisor' ? '58%' : complaint.forwardedTo === 'warden' ? '40%' : complaint.forwardedTo === 'dsw' ? '100%' : '34%',
  //   // height:complaint.forwardedTo === 'supervisor' ? '50%' : complaint.forwardedTo === 'warden' ? '75%' : complaint.forwardedTo === 'dsw' ? '100%' : '25%',
  // };

  return (
    <div className={styles.MainDiv}>
      <div className={styles.container}>
        <div
          className={`${styles.box} ${styles.circlee} ${styles.circle1}`}
          style={{ backgroundColor: "#40BDB6" }}
        >
          1
        </div>
        <div
          className={`${styles.box} ${styles.rectangle} ${styles.rectangle1}`}
          style={{
            backgroundColor:
              complaint.forwardedTo === "supervisor" ||
              complaint.forwardedTo === "dsw" ||
              complaint.forwardedTo === "warden"
                ? "#40BDB6"
                : "white",
          }}
        ></div>
        <div
          className={`${styles.box} ${styles.circlee} ${styles.circle2} `}
          style={{
            backgroundColor:
              complaint.forwardedTo === "supervisor" ||
              complaint.forwardedTo === "dsw" ||
              complaint.forwardedTo === "warden"
                ? "#40BDB6"
                : "white",
          }}
        >
          2
        </div>
        <div
          className={`${styles.box} ${styles.rectangle} ${styles.rectangle2}`}
          style={{
            backgroundColor:
              complaint.forwardedTo === "dsw" || complaint.forwardedTo === "warden"
                ? "#40BDB6"
                : "white",
          }}
        ></div>
        <div
          className={`${styles.box} ${styles.circlee} ${styles.circle3}`}
          style={{
            backgroundColor:
              complaint.forwardedTo === "dsw" || complaint.forwardedTo === "warden"
                ? "#40BDB6"
                : "white",
          }}
        >
          3
        </div>
        <div
          className={`${styles.box} ${styles.rectangle} ${styles.rectangle3}`}
          style={{
            backgroundColor: complaint.forwardedTo === "dsw" ? "#40BDB6" : "white",
          }}
        ></div>
        <div
          className={`${styles.box} ${styles.circlee} ${styles.circle4}`}
          style={{
            backgroundColor: complaint.forwardedTo === "dsw" ? "#40BDB6" : "white",
          }}
        >
          4
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.Registered}>
          <h1>Registered</h1>
          <h2 className="">
            {time} <br />
            date <span className="gap">- {date}</span>
          </h2>
        </div>

        <div className={styles.Supervisor}>
          <h1>Supervisor</h1>
          <h2 className="hhmm">
            Delivered{" "}
            <span className="gap1" style={{ marginLeft: ".5rem" }}>
              {time1} day - {date1}
            </span>
          </h2>
        </div>

        <div className={styles.Warden}>
          <h1>Warden</h1>
        </div>

        <div className={styles.Dean}>
          <h1>Dean</h1>
        </div>
      </div>
    </div>
  );
};

export default StatusOfComplaint;
