import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from "./Status.module.scss";
import { fetchComplaints } from "../../ReactQuery/Fetchers/AllComplaints";

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

  // console.log(complaint);
  //  console.log(key)
  // console.log(complaint.forwardedTo)

  // const check="warden"

  const superStyle = {
    // backgroundColor: complaint.forwardedTo === 'supervisor' ? 'var(--vyatha-main-color-dark)' : '#ffffff' ,width: "1vw", height:"25%",
    backgroundColor: "var(--vyatha-main-color-dark)",
    width: "1vw",
    // height: check === 'supervisor' ? '50%' : check === 'warden' ? '75%' : check === 'dsw' ? '100%' : '25%',
    height:
      complaint.forwardedTo === "supervisor"
        ? "50%"
        : complaint.forwardedTo === "warden"
        ? "75%"
        : complaint.forwardedTo === "dsw"
        ? "100%"
        : "25%",
  };

  return (
    <div className={styles.MainDiv}>
      <div className={styles.StatusBarContainer}>
        <div className={styles.StatusBar} style={superStyle}></div>
      </div>
      <div className={styles.status}>
        <div className={styles.Registered}>
          <h1>Registered</h1>
          <h2>
            hh:mm <br />
            day - dd/mm/yy
          </h2>
        </div>

        <div className={styles.Supervisor}>
          <h1>Supervisor</h1>
          <h2>Delivered hh:mm day - dd/mm/yy</h2>
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
