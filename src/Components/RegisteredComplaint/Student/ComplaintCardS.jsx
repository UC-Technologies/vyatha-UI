import React from "react";
import { Link } from "react-router-dom";
import styles from "./ComplaintCardS.module.scss";

const ComplaintCardS = ({ complaint }) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.Heading}>
        <div>
          <Link to={complaint.key}>
            <h2>{complaint.title}</h2>
          </Link>
        </div>
        <img src={complaint.StatusImg} alt="icon"></img>
        {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
      </div>
      <div className={styles.DateAndTime}>
        {complaint.Date}, {complaint.Time}
      </div>
      <p>{complaint.Description}</p>
      <div className={styles.SelectBar}>
        <div className={styles.Registered}>Registered</div>
        <div className={styles.Supervisor}>Supervisor</div>
        <div className={styles.Warden}>Warden</div>
        <div className={styles.Dean}>Dean</div>
      </div>
    </div>
  );
};

export default ComplaintCardS;
