/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import styles from "./ComplaintDashboardS.module.scss";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
import { UserContext } from "../../../../Context/Provider";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import { formattedDate } from "../../../../Components/Lib/GetDate";

// TODO: make a dropdown in warden and dean page to select between forwarded and Raised Complaint, for their simplicity in accessing the complaints
// TODO: make a dropdown for the supervisor so that he can toggle between solved and pending complaints

const AllComplaintStudent = () => {
  const closedAt = formattedDate;
  const [complaintId, setComplaintId] = useState();
  const [otherComplaintId, setOtherComplaintId] = useState();
  const [showPopUpClose, setShowPopUpClose] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("All hostel");

  // for the dropdown to select between the forwarded and raised complaints for the warden and dsw
  const [typeOfComplaint, setTypeOfComplaint] = useState("Forwarded");
  // const [filteredDataBasedOnComplaints, setFilteredDataBasedOnComplaints] = useState([])
  const handleTypeOfComplaintChange = (e) => {
    setTypeOfComplaint(e.target.value);
  };

  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value);
  };

  // console.log("time:", formattedDate)
  const [complaintStatus, setComplaintStatus] = useState("Pending");
  const handleComplaintStatusChange = (e) => {
    setComplaintStatus(e.target.value);
  };
  const [fetchedIssuesForSupervisor, setFetchedIssuesForSupervisor] = useState([]);

  useEffect(() => {
    document.title = "All Complaints | Vyatha";
  }, []);

  const { role } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role !== "superadmin");
  }, [isLoggedIn, role]);
  const queryKey = useMemo(() => ["complaints"], []);
  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    refetchOnWindowFocus: false,
    enabled: isTrue,
  });

  const isDean = useMemo(() => {
    return Boolean(role === "dsw" && isLoggedIn);
  }, [role, isLoggedIn]);

  const isDeanOrIsWarden = useMemo(() => {
    return Boolean((role === "warden" || role === "dsw") && isLoggedIn);
  }, [isLoggedIn, role]);

  const isHigherAuthority = useMemo(() => {
    return Boolean(role === "supervisor" || role === "warden" || role === "dsw");
  }, [role]);

  const fetchedIssues = useMemo(() => {
    return role === "student"
      ? data?.allIssues
      : role === "supervisor"
      ? data?.issuesAssignedToSupervisor
      : role === "warden" && typeOfComplaint === "Forwarded"
      ? data?.sortedIssues
      : role === "warden" && typeOfComplaint === "Raised"
      ? data?.allComplaintsRaisedToWarden
      : role === "dsw" && typeOfComplaint === "Forwarded"
      ? data?.sortedIssues
      : role === "dsw" && typeOfComplaint === "Raised"
      ? data?.allComplaintsRaisedToDsw
      : null;
  }, [data, role, typeOfComplaint]);

  // useEffect(() => {
  //   if (role === "warden" && typeOfComplaint === "Raised") {
  //     const moreFilteredData = fetchedIssues?.filter((item) => {
  //       return item?.raiseComplainTo?.length > 0
  //     })
  //     setFilteredDataBasedOnComplaints(moreFilteredData)
  //   } else if (role === "dsw" && typeOfComplaint === "Raised") {
  //     const moreFilteredData = fetchedIssues?.filter((item) => {
  //       return item?.raiseComplainTo?.length > 2
  //     })
  //     setFilteredDataBasedOnComplaints(moreFilteredData)
  //   }
  // }, [fetchedIssues, role, typeOfComplaint])

  // console.log("filteredDataBasedOnComplaints", filteredDataBasedOnComplaints)

  useEffect(() => {
    if (isHigherAuthority && complaintStatus === "Pending") {
      const allSuchNotSolvedComplaints = fetchedIssues?.filter((item) => {
        return item?.isSolved === false;
      });
      setFetchedIssuesForSupervisor(allSuchNotSolvedComplaints);
    } else if (isHigherAuthority && complaintStatus === "Solved") {
      const allSuchNotSolvedComplaints = fetchedIssues?.filter((item) => {
        return item?.isSolved === true;
      });
      setFetchedIssuesForSupervisor(allSuchNotSolvedComplaints);
    }
  }, [complaintStatus, fetchedIssues, isHigherAuthority]);

  // console.log("fetchedIssues:", fetchedIssues)

  const [jsonData, setJsonData] = useState(
    isHigherAuthority ? fetchedIssuesForSupervisor : fetchedIssues
  );

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
    if (!isHigherAuthority) {
      const filteredData = filterComplaints(fetchedIssues, searchInput);
      setJsonData(filteredData);
    } else if (isHigherAuthority) {
      const filteredData = filterComplaints(fetchedIssuesForSupervisor, searchInput);
      setJsonData(filteredData);
    }
  }, [searchInput, fetchedIssues, isHigherAuthority, fetchedIssuesForSupervisor]);

  const [finalData, setFinalData] = useState();
  const filterBasedOnHostel = useCallback(
    (whatToFilter, hostel) => {
      if (isDean) {
        if (selectedHostel === "All hostel") {
          return whatToFilter;
        }
        return whatToFilter?.filter((item) => item.hostel === hostel);
      }
      return whatToFilter;
    },
    [selectedHostel, isDean]
  );

  useEffect(() => {
    const filteredBasedOnHostel = filterBasedOnHostel(jsonData, selectedHostel);
    setFinalData(filteredBasedOnHostel);
  }, [selectedHostel, jsonData, filterBasedOnHostel]);

  // console.log("finalData :", finalData);

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
          { issueId, otherID, closedAt },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue closed successfully") {
            toast("Issue closed successfully");
            handleShowPopUp();
            window.location.reload();
          }
        });
    } catch (er) {
      if (er.response) {
        switch (er.response.data.error) {
          case "Issue is solved":
            toast("Issue is solved, can't close");
            break;
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

  const raise = "raised";
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

      {/* Dropdown to select between forwarded and raised complaint for the warden and dsw */}
      <main id={styles.drodownRaised}>
        {isDeanOrIsWarden && (
          <select
            id="typeofcomplaint"
            value={typeOfComplaint}
            onChange={handleTypeOfComplaintChange}
          >
            <option>Forwarded</option>
            <option>Raised</option>
          </select>
        )}
      </main>

      {/* dropdown for the supervisor to select between solved and unsolved complaints */}
      <main id={styles.drodownRaised} style={{ marginTop: "0vw" }}>
        {isHigherAuthority && (
          <select
            id="complaintStatus"
            value={complaintStatus}
            onChange={handleComplaintStatusChange}
          >
            <option>Pending</option>
            <option>Solved</option>
          </select>
        )}
      </main>

      {/* dropdown to select between the hostel for the dsw */}
      <main id={styles.drodownRaised} style={{ marginTop: "0vw" }}>
        {isDean && (
          <select id="hostel" value={selectedHostel} onChange={handleHostelChange}>
            <option>All hostel</option>
            <option>BH1</option>
            <option>BH2</option>
            <option>BH3</option>
            <option>BH4</option>
            <option>BH6</option>
            <option>BH7</option>
            <option>BH8</option>
            <option>BH9A</option>
            <option>BH9B</option>
            <option>BH9C</option>
            <option>BH9D</option>
            <option>GH1</option>
            <option>GH2</option>
            <option>GH3</option>
            <option>GH4</option>
            <option>Aryabhatt-PGH</option>
          </select>
        )}
      </main>

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
                  borderRadius: "10px",
                  background: "#fff",
                  fontSize: "clamp(12px,4vw,18px)",
                  width: window.innerWidth < 768 ? "90%" : "50%",
                  height: window.innerWidth > 768 ? "30rem" : "50%",
                  boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 0.14)",
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
                      cursor: "pointer",
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
                      backgroundColor: "#40bdb6",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                    onClick={handleShowPopUp}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {role === "dsw" && (
            <h5 style={{ textAlign: "center" }}>{selectedHostel}&apos;s Complaints</h5>
          )}

          <h4 style={{ textAlign: "center", color: "#3689c2" }}>
            {" "}
            {finalData?.length > 0}
            {finalData?.length} total {finalData?.length > 1 ? "complaints" : "complaint"}
          </h4>
          {finalData?.length === 0 && <p>No Registered Complaints yet</p>}
          {finalData?.length > 0 &&
            finalData?.map((complaint) => (
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
                    {complaint?.raiseComplainTo?.length > 1 ? (
                      <main>
                        <Link to={`/${role}/complaint/${raise}/${complaint._id}`}>
                          <h2>{complaint.title}</h2>
                        </Link>
                      </main>
                    ) : (
                      <main>
                        <Link to={`/${role}/complaint/${complaint._id}`}>
                          <h2>{complaint.title}</h2>
                        </Link>
                      </main>
                    )}
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
                {role !== "student" &&
                  (role === "supervisor" ||
                    (role === "warden" && (
                      <main>
                        <p id={styles.issue__details}>
                          {complaint?.name} | {complaint?.scholarID} | {complaint?.room}
                        </p>
                      </main>
                    )))}
                {role === "dsw" && (
                  <main>
                    <p id={styles.issue__details}>
                      {complaint?.name} | {complaint?.scholarID} | | {complaint?.hostel} |{" "}
                      {complaint?.room}
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
                            setComplaintId(complaint?._id);
                            setOtherComplaintId(complaint?.otherID);
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
