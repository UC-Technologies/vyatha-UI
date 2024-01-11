/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import styles from "./ComplaintDashboardA.module.scss";
import ComplaintCardA from "../../../../Components/RegisteredComplaint/Admin/ComplaintCardA";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
import { UserContext } from "../../../../Context/Provider";

const AllComplaintsAdmin = () => {
  useEffect(() => {
    document.title = "All Complaints | Vyatha";
  }, []);

  const { data, error, isLoading, isFetching } = useQuery("complaints", fetchComplaints, {
    refetchOnWindowFocus: "always",
  });
  const { role } = useContext(UserContext);
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  // const fetchedIssues = data?.sortedIssues;
  const fetchedIssues =
    role === "supervisor"
      ? data?.issuesAssignedToSupervisor
      : role === "warden"
      ? data?.sortedIssues
      : role === "dsw"
      ? data?.sortedIssues
      : null;
  // console.log(fetchedIssues);

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
      {fetchedIssues?.map((record) => {
        return (
          <div className={styles.all_cards} key={record?._id}>
            <div className={styles.cards_content}>
              <ComplaintCardA
                id={record?._id}
                title={record?.title}
                date={record?.IssueCreatedAt}
                content={record?.description}
                img={record?.photo}
                name={record?.name}
                room={record?.room}
                scholarID={record?.scholarID}
                progress={record?.forwardedTo}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllComplaintsAdmin;
