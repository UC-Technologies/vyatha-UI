/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import styles from "./ComplaintDashboardS.module.scss";
import Data from "../../../../Data/ComplaintRegister.json";
// import ComplaintCardS from '../../../Components/RegisteredComplaint/Student/ComplaintCardS';
import SortByButton from "../../../../Components/RegisteredComplaint/Student/SortByButton";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";

const AllComplaintStudent = () => {
  useEffect(() => {
    document.title = "All Complaints | Vyatha";
  }, []);

  const { role } = useParams();
  // console.log(role)
  const [jsonData, setJsonData] = useState(Data);
  const [sortBy, setSortBy] = useState("date");
  const [searchInput, setSearchInput] = useState("");

  const imgBack =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";

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

  const filterComplaints = (data, search) => {
    return data.filter((item) => {
      // Searching keyword
      const searchLowerCase = search.toLowerCase();

      const title = item.title.toLowerCase();
      const description = item.Description.toLowerCase();
      const date = item.Date.toLowerCase();
      const time = item.Time.toLowerCase();

      return (
        title.includes(searchLowerCase) ||
        description.includes(searchLowerCase) ||
        date.includes(searchLowerCase) ||
        time.includes(searchLowerCase)
      );
    });
  };

  useEffect(() => {
    const filteredData = filterComplaints(Data, searchInput);
    setJsonData(filteredData);
  }, [searchInput]);

  const { data, error, isLoading, isFetching } = useQuery("complaints", fetchComplaints, {
    refetchOnWindowFocus: "always",
  });
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const fetchedIssues = data?.allIssues;
  // console.log(fetchedIssues);
  // console.log(data?.filteredStudentNotifications)
  const token = Cookies.get("authToken");
  const handleCloseIssue = async (issueId, otherID) => {
    // console.log(issueId)
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/closeissue`,
          { issueId, otherID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue closed successfully") {
            toast("Issue closed successfully");
          }
        });
    } catch (er) {
      if (er.response) {
        switch (er.response.data.error) {
          case "Issue already closed":
            toast("Issue already closed");
            break;
          case "Not authorized to access this issue":
            toast("Not authorized to access this issue");
            break;
          case "Not Authorized to use this api endpoint":
            toast("Not Authorized to use this api endpoint");
            break;
          default:
            toast("Something went wrong");
            console.error(er.response.data.error);
            break;
        }
      }
    }
  };

  return (
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
          {fetchedIssues?.map((complaint) => (
            // <ComplaintCardS key={item.key} complaint={item} />
            <div className={styles.CardContainer} key={complaint._id}>
              <div className={styles.Heading}>
                <div className={styles.compliantTitle}>
                  {complaint?.raiseComplainTo?.length === 2 && (
                    <p id={styles.forwarddtext}>
                      Complain Raised to Warden by the student
                    </p>
                  )}
                  {complaint?.raiseComplainTo?.length === 3 && (
                    <p id={styles.forwarddtext}>Complain Raised to DSW by the student</p>
                  )}
                  <Link to={`/${role}/complaint/${complaint._id}`}>
                    <h2>{complaint.title}</h2>
                  </Link>
                </div>
                <div className={styles.StatusImg}>
                  {/* <img src={complaint.photo} alt="icon" /> */}
                  {complaint?.isSolved === false && (
                    <img
                      src="https://res.cloudinary.com/dp92qug2f/image/upload/v1704125701/progress-removebg-preview_o7mh87.png"
                      alt="inprogress"
                    />
                  )}

                  {complaint?.isSolved === true && (
                    <img
                      src="https://res.cloudinary.com/dp92qug2f/image/upload/v1703209962/tick_skcuzr.jpg"
                      alt="solved"
                    />
                  )}
                </div>

                {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
              </div>
              <div className={styles.DateAndTime}>{complaint.IssueCreatedAt}</div>
              <div className={styles.Description}>
                <p>{complaint.description}</p>
                {complaint?.isClosed === false && (
                  <button
                    onClick={() => handleCloseIssue(complaint._id, complaint?.otherID)}
                    className={styles.closebtn}
                  >
                    Close
                  </button>
                )}
              </div>
              <div className={styles.SelectBar}>
                <div
                  style={{
                    background: complaint?.forwardedTo === "registered" ? "#3689C2" : "",
                  }}
                  className={`${styles.Registered} ${
                    complaint?.forwardedTo === "registered" ? "customBG" : ""
                  }`}
                >
                  Registered
                </div>
                <div
                  style={{
                    background: complaint?.forwardedTo === "supervisor" ? "#3689C2" : "",
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
  );
};

export default AllComplaintStudent;
