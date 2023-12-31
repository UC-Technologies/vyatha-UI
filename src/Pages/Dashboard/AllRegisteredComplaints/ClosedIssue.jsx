/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { fetchClosedComplaints } from "../../../Components/ReactQuery/Fetchers/ClosedIssueFetcher";
import styles from "./Student/ComplaintDashboardS.module.scss";
import SortByButton from "../../../Components/RegisteredComplaint/Student/SortByButton";
import Data from "../../../Data/ComplaintRegister.json";

const ClosedIssue = () => {
  const { role } = useParams();
  const [sortBy, setSortBy] = useState("date");
  const [searchInput, setSearchInput] = useState("");
  const [jsonData, setJsonData] = useState(Data);
  const sortData = (e) => {
    setSortBy(e.target.value);
    const sortedData = [...jsonData];
    switch (e.target.value) {
      case "date":
        sortedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        break;
      case "time":
        sortedData.sort((a, b) => new Date(b.Time) - new Date(a.Time));
        break;
      case "name":
        sortedData.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      default:
        break;
    }
    setJsonData(sortedData);
  };

  const { data, error, isLoading, isFetching } = useQuery(
    "closedComplaints",
    fetchClosedComplaints,
    {
      refetchOnWindowFocus: "always",
    }
  );

  const allClosedIssues =
    role === "student"
      ? data?.allIssues
      : role === "supervisor"
      ? data?.issuesAssignedToSupervisor
      : role === "warden"
      ? data?.issuesAssignedToWarden
      : role === "dsw"
      ? data?.issuesAssignedToDsw
      : data?.AllRegissues;

  console.log(allClosedIssues);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const imgBack =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.SearchBar}>
          <Link to="/">
            <img src={imgBack} alt="Back" />
          </Link>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Search Complaint"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <SortByButton sortBy={sortBy} handleSort={sortData} />
        </div>
        <div className={styles.ComplaintCard}>
          <div className={styles.ComplaintCardInner}>
            {allClosedIssues?.map((complaint) => (
              // <ComplaintCardS key={item.key} complaint={item} />
              <div className={styles.CardContainer} key={complaint._id}>
                <div className={styles.Heading}>
                  <div className={styles.compliantTitle}>
                    <Link to={`/student/complaint/${complaint._id}`}>
                      <h2>{complaint.title}</h2>
                    </Link>
                  </div>
                  <div className={styles.StatusImg}>
                    <img src={complaint.photo} alt="icon" />
                  </div>

                  {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
                </div>
                <div className={styles.DateAndTime}>
                  Issue Created at : {complaint.IssueCreatedAt}
                </div>
                <div
                  style={{ marginTop: "1vw", marginBottom: "1vw" }}
                  className={styles.DateAndTime}
                >
                  Closed at : {complaint.IssueCreatedAt}
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
