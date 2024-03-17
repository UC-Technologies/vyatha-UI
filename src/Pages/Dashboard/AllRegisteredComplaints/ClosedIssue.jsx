/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
// import { fetchClosedComplaints } from "../../../Components/ReactQuery/Fetchers/ClosedIssueFetcher";
import styles from "./Student/ComplaintDashboardS.module.scss";
import { UserContext } from "../../../Context/Provider";
import Skeleton from "../../../Components/Shared/Loading/Skeletion";
import { fetchComplaints } from "../../../Components/ReactQuery/Fetchers/AllComplaints";
// import SortByButton from "../../../Components/RegisteredComplaint/Student/SortByButton";

const ClosedIssue = () => {
  const { role } = useParams();
  useEffect(() => {
    document.title = `Closed Issues for ${role} | Vyatha`;
  }, [role]);

  const { isLoggedIn } = useContext(UserContext);
  const queryKey = useMemo(() => ["complaints"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role);
  }, [isLoggedIn, role]);

  // const { data, error, isLoading } = useQuery(queryKey, fetchClosedComplaints, {
  //   enabled: isTrue,
  // });

  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    enabled: isTrue,
  });

  const allClosedIssues =
    role === "student"
      ? data?.allClosedIssues
      : role === "supervisor"
      ? data?.closedIssuesAssignedToSupervisor
      : role === "warden"
      ? data?.closedIssuesAssignedToWarden
      : role === "dsw"
      ? data?.closedIssuesAssignedToDsw
      : role === "superadmin"
      ? data?.AllClosedissues
      : null;

  const [searchInput, setSearchInput] = useState("");
  const [jsonData, setJsonData] = useState(allClosedIssues);
  // filter complaints based on title
  const filterComplaints = (dData, search) => {
    return dData?.filter((item) => {
      const searchLowerCase = search.toLowerCase();
      const title = item.title?.toLowerCase();
      return title?.includes(searchLowerCase);
    });
  };

  useEffect(() => {
    const filteredData = filterComplaints(allClosedIssues, searchInput);
    setJsonData(filteredData);
  }, [searchInput, allClosedIssues]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  // const imgBack =
  //   "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";
  const status = "closed";
  return (
    <main>
      <div className={styles.container} id={styles.paddtop}>
        <div className={styles.SearchBar}>
          {/* <Link to="/">
            <img src={imgBack} alt="Back" />
          </Link> */}
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Search Complaint Based on Title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* <SortByButton sortBy={sortBy} handleSort={sortData} /> */}
        </div>
        <div className={styles.ComplaintCard}>
          <div className={styles.ComplaintCardInner}>
            {jsonData?.length === 0 && <p>No Closed issues yet</p>}
            {jsonData?.length > 0 && <p>{jsonData?.length} total closed complaints</p>}
            {jsonData?.length > 0 &&
              jsonData?.map((complaint) => (
                // <ComplaintCardS key={item.key} complaint={item} />
                <div className={styles.CardContainer} key={complaint?._id}>
                  <div className={styles.Heading}>
                    <div className={styles.compliantTitle}>
                      <Link to={`/${status}/${role}/complaint/${complaint?._id}`}>
                        <h2>{complaint?.title}</h2>
                      </Link>
                    </div>
                    <div className={styles.StatusImg}>
                      <img
                        src="https://res.cloudinary.com/dp92qug2f/image/upload/v1704126365/closed-removebg-preview_t5jzo7.png"
                        alt="icon"
                      />
                    </div>

                    {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
                  </div>
                  <div className={styles.DateAndTime}>
                    Issue Created at : {complaint?.IssueCreatedAt}
                  </div>
                  <div
                    style={{ marginTop: "1vw", marginBottom: "1vw" }}
                    className={styles.DateAndTime}
                  >
                    Closed at : {complaint?.closedAt}
                  </div>

                  <div className={styles.SelectBar}>
                    <div
                      style={{
                        background:
                          complaint?.forwardedTo === "registered" ? "#3689C2" : "",
                      }}
                      className={`${styles.Registered} ${
                        complaint?.forwardedTo === "registered" ? "customBG" : ""
                      }`}
                    >
                      Registered
                    </div>
                    <div
                      style={{
                        background:
                          complaint?.forwardedTo === "supervisor" ? "#3689C2" : "",
                      }}
                      className={`${styles.Supervisor} ${
                        complaint?.forwardedTo === "supervisor" ? "customBG" : ""
                      } `}
                    >
                      Supervisor
                    </div>
                    <div
                      style={{
                        background: complaint?.forwardedTo === "warden" ? "#3689C2" : "",
                      }}
                      className={`${styles.Warden} ${
                        complaint?.forwardedTo === "warden" ? "customBG" : ""
                      }`}
                    >
                      Warden
                    </div>
                    <div
                      style={{
                        background: complaint?.forwardedTo === "dsw" ? "#3689C2" : "",
                      }}
                      className={`${styles.Dean} ${
                        complaint?.forwardedTo === "dsw" ? "customBG" : ""
                      }`}
                    >
                      Dean
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClosedIssue;
