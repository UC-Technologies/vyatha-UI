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

  //  console.log(complaint);
  //  console.log(key)
  // console.log(complaint.forwardedTo)
  // var parsedData = moment.tz(complaint.IssueCreatedAt,"DD-MM-YYYY h:mma", "Asia/Kolkata");

  // var date = parsedData.format("DD-MM-YYYY");
  // var time = parsedData.format("h:mma")
  // // console.log(time)

  // var parsedData1 = moment.tz(complaint.IssueForwardedAtToSupervisor
  //   ,"DD-MM-YYYY h:mma", "Asia/Kolkata");
  // var date1 = parsedData1.format("DD-MM-YYYY");
  // var time1 = parsedData1.format("h:mma")
  // // console.log(time1)
  // // const complaint.forwardedTo="warden"

  const date = complaint?.IssueCreatedAt;
  const timee = complaint?.IssueForwardedAtToSupervisor;
  // for warden
  const time2 = complaint?.IssueForwardedToWarden[0]?.time;
  // for DSW
  const time3 = complaint?.IssueForwardedToDsw[0]?.time;

  return (
    <div className={styles.container}>
      <div className={styles.child1}>
        <div className={styles.child11}>
          <div className={styles.circle} style={{ backgroundColor: "#40BDB6" }}>
            1
          </div>
          <div
            className={styles.bar}
            style={{
              backgroundColor:
                complaint.forwardedTo === "supervisor" ||
                complaint.forwardedTo === "dsw" ||
                complaint.forwardedTo === "warden"
                  ? "#40BDB6"
                  : "white",
            }}
          ></div>
        </div>
        <div className={styles.child12}>
          <div className={styles.text121}>Registered</div>
          <div className={styles.text2}>delivered: {date}</div>
        </div>
      </div>
      <div className={styles.child2}>
        <div className={styles.child21}>
          <div
            className={styles.circle}
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
            className={styles.bar}
            style={{
              backgroundColor:
                complaint.forwardedTo === "dsw" || complaint.forwardedTo === "warden"
                  ? "#40BDB6"
                  : "white",
            }}
          ></div>
        </div>
        <div className={styles.child22}>
          <div className={styles.text1}>Supervisor</div>
          <div className={styles.text2}>delivered: {timee}</div>
        </div>
      </div>
      <div className={styles.child3}>
        <div className={styles.child31}>
          <div
            className={styles.circle}
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
            className={styles.bar}
            style={{
              backgroundColor: complaint.forwardedTo === "dsw" ? "#40BDB6" : "white",
            }}
          ></div>
        </div>
        <div className={styles.child32}>
          <div className={styles.text1}>Warden</div>
          <div className={styles.text2}>delivered: {time2}</div>
        </div>
      </div>
      <div className={styles.child4}>
        <div className={styles.child41}>
          <div
            className={styles.lastBar}
            style={{
              backgroundColor: complaint.forwardedTo === "dsw" ? "#40BDB6" : "white",
            }}
          ></div>
          <div
            className={styles.circle}
            style={{
              backgroundColor: complaint.forwardedTo === "dsw" ? "#40BDB6" : "white",
            }}
          >
            4
          </div>
          <div
            className={styles.bar}
            style={{ background: "var(--vyatha-background-1)" }}
          ></div>
        </div>
        <div className={styles.child42}>
          <div className={styles.text1}>Dean</div>
          <div className={styles.text2}>delivered: {time3}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusOfComplaint;
