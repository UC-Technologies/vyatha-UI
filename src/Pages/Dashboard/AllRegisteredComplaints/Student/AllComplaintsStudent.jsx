/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import styles from "./ComplaintDashboardS.module.scss";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
import { UserContext } from "../../../../Context/Provider";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const AllComplaintStudent = () => {
  const [complaintId, setComplaintId] = useState();
  const [otherComplaintId, setOtherComplaintId] = useState();
  const [showPopUpClose, setShowPopUpClose] = useState(false);

  useEffect(() => {
    document.title = "All Complaints | Vyatha";
  }, []);

  const { role } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const { data, error, isLoading } = useQuery("complaints", fetchComplaints, {
    refetchOnWindowFocus: "always",
    enabled: isLoggedIn,
    refetchInterval: 60000,
    refetchOnMount: true,
  });

  const fetchedIssues =
    role === "student"
      ? data?.allIssues
      : role === "supervisor"
        ? data?.issuesAssignedToSupervisor
        : role === "warden"
          ? data?.sortedIssues
          : role === "dsw"
            ? data?.sortedIssues
            : null;

  const [jsonData, setJsonData] = useState(fetchedIssues);
  const [searchInput, setSearchInput] = useState("");

  // const imgBack =
  //   "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";

  const filterComplaints = (dData, search) => {
    return dData?.filter((item) => {
      const searchLowerCase = search.toLowerCase();
      const title = item.title?.toLowerCase();
      return title?.includes(searchLowerCase);
    });
  };

  const handleShowPopUp = () => {
    setShowPopUpClose(!showPopUpClose);
  };

  useEffect(() => {
    const filteredData = filterComplaints(fetchedIssues, searchInput);
    setJsonData(filteredData);
  }, [searchInput, fetchedIssues]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

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

        handleShowPopUp();
        window.location.reload();
      }
    }
  };

  function scrollToTop() {
    // Calculate the center of the popup
    window.scrollTo({
      top: "0",
      left: "0",
      behavior: "smooth",
    });
  }

  const handleIssueEdit = (issueId) => {
    navigate(`/editissue/${issueId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.SearchBar}>
        {/* <Link to="/">
          <img id={styles.gotodash} src={imgBack} alt="Back" />
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
          {showPopUpClose && (
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: showPopUpClose && "blur(10px)",
                width: "100%",
                height: "calc(130%)",
                zIndex: "10",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40vw",
                  minWidth: "250px",
                  height: "30rem",
                  borderRadius: "10px",
                  background: "#fff",
                  fontSize: "clamp(12px,4vw,18px)",
                }}
              >
                <div style={{ textAlign: "center", fontSize: "clamp(14px,2.5vw,18px)" }}>
                  Are you sure you want to close this complaint?
                </div>
                <div style={{ display: "flex", gap: "2rem" }}>
                  <button
                    style={{
                      minWidth: "40px",
                      width: "5rem",
                      minHeight: "10px",
                      height: "2rem",
                      borderRadius: "5px",
                      backgroundColor: "Red",
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    onClick={() => {
                      handleCloseIssue(complaintId, otherComplaintId);
                      // handleShowPopUp();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    style={{
                      minWidth: "40px",
                      width: "5rem",
                      minHeight: "10px",
                      height: "2rem",
                      borderRadius: "5px",
                      backgroundColor: "Blue",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    onClick={handleShowPopUp}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {jsonData?.length === 0 && <p>No Registered Complaints yet</p>}
          {jsonData?.length > 0 &&
            jsonData?.map((complaint) => (
              // <ComplaintCardS key={item.key} complaint={item} />
              <div className={styles.CardContainer} key={complaint._id}>
                <div className={styles.Heading}>
                  <div className={styles.compliantTitle}>
                    {complaint?.raiseComplainTo?.length === 2 && (
                      <p id={styles.forwarddtext}>
                        Complain Raised to Warden by the student
                      </p>
                    )}

                    {complaint?.editIssue?.length > 0 && (
                      <p id={styles.isEdited}>
                        Edited {complaint?.editIssue?.length}{" "}
                        {complaint?.editIssue?.length === 1 ? "time" : "times"}
                      </p>
                    )}

                    {complaint?.raiseComplainTo?.length === 3 && (
                      <p id={styles.forwarddtextToDSW}>
                        Complain Raised to DSW by the student
                      </p>
                    )}
                    <Link to={`/${role}/complaint/${complaint._id}`}>
                      <h2>{complaint.title}</h2>
                    </Link>
                  </div>

                  {role === "student" && (
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
                  )}

                  {role !== "student" && (
                    <div id={styles.issue_img_admin}>
                      <img src={complaint?.photo} alt="" />
                    </div>
                  )}

                  {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
                </div>
                <div className={styles.DateAndTime}>{complaint.IssueCreatedAt}</div>
                {role !== "student" && (
                  <main>
                    <p id={styles.issue__details}>
                      {complaint?.name} | {complaint?.scholarID} | {complaint?.room}
                    </p>
                  </main>
                )}
                <div className={styles.Description}>
                  <div>{complaint.description}</div>
                  <div className={styles.twoButtons}>
                    <div>
                      {complaint?.isClosed === false && role === "student" && (
                        <button
                          onClick={() => {
                            setComplaintId(complaint._id);
                            setOtherComplaintId(complaint.otherID);
                            handleShowPopUp();
                            scrollToTop();
                          }}
                          className={styles.closebtn}
                        >
                          Close
                        </button>
                      )}
                    </div>
                    <div>
                      {/* Edit issue button only available to the issue author */}
                      {complaint?.isClosed === false && role === "student" && (
                        <button
                          onClick={() => handleIssueEdit(complaint?._id)}
                          className={styles.closebtn}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
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
  );
};

export default AllComplaintStudent;
