import React from "react";
import Records from "./Records.json";
import styles from "./ComplaintDashboardA.module.scss";
import ComplaintCardA from "../../../../Components/RegisteredComplaint/Admin/ComplaintCardA";

const AllComplaintsAdmin = () => {
  return (
    <div className={styles.cardAdmin}>
      <div className={styles.search_bar}>
        <input type="text" placeholder="Search Complaint" />

        <img
          src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811898/UC%20VYATHA/octicon_filter-16_yjhqwg.jpg?_s=public-apps"
          width="47px"
          height="43px"
          alt=""
        />
      </div>
      {Records.map((record) => {
        return (
          <div className={styles.all_cards} key={record.id}>
            <div className={styles.cards_content}>
              <ComplaintCardA
                id={record.id}
                title={record.title}
                date={record.date}
                time={record.time}
                content={record.content}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllComplaintsAdmin;
