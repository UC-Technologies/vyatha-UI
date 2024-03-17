/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useContext, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styles from "./IndividualComplaintA.module.scss";
// import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import { UserContext } from "../../../../Context/Provider";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
import { formattedDate } from "../../../../Components/Lib/GetDate";

const IndividualComplaintAdmin = () => {
  const time = formattedDate;
  const closedAt = formattedDate;
  const createdAt = formattedDate;
  const forwardedAt = formattedDate;
  const solvedAt = formattedDate;

  const [closing, setClosing] = useState(false);
  const [markingSolve, setMarkingSolve] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [approvingIssue, setApprovingIssue] = useState(false);
  const [forwarding, setForwarding] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const { key, status, ifraised } = useParams(); // Extracted the key
  // console.log("status: ", status)
  const issueId = key;
  const issueID = key;
  const [reasonForForwarding, setReasonForForwarding] = useState("");
  const { role, isLoggedIn } = useContext(UserContext);
  const handleInputChange = (e) => {
    setReasonForForwarding(e.target.value);
  };
  // const queryKey = useMemo(() => ["oneIssue"], []);
  const queryKey = useMemo(() => ["complaints"], []);
  const isTrue = useMemo(() => {
    return Boolean(
      isLoggedIn &&
        (role === "supervisor" ||
          role === "warden" ||
          role === "dsw" ||
          role === "superadmin")
    );
  }, [role, isLoggedIn]);

  // const { data, error, isLoading } = useQuery(
  //   queryKey,
  //   () => fetchIndividualIssue({ issueId }),
  //   { enabled: isTrue }
  // );

  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    enabled: isTrue,
  });
  // console.log(data)

  // const message = ""
  // console.log("status :", status)
  // const raisedComplaintDetails =
  // console.log(data?.allComplaintsRaisedToWarden.find((item) => item._id === issueId))

  // const raisedComplaintDetailsWarden =
  //   role === "warden" && !status && ifraised
  //     ? data?.allComplaintsRaisedToWarden?.find((com) => com._id === issueId)
  //     : null;

  // console.log(data?.
  //   allComplaintsRaisedToWarden
  // )
  // console.log("data?.raisedComplaintDetailsWarden :", data?.allComplaintsRaisedToWarden);
  // console.log("ifraised :", ifraised);
  // console.log("status :", status);
  // console.log("issueId:", issueId)
  const complaint =
    role === "supervisor" && !status
      ? data?.issuesAssignedToSupervisor?.find((item) => item._id === issueId)
      : role === "supervisor" && status === "closed"
      ? data?.closedIssuesAssignedToSupervisor?.find((item) => item._id === issueId)
      : role === "warden" && !status && !ifraised
      ? data?.sortedIssues?.find((item) => item._id === issueId)
      : role === "warden" && status === "closed"
      ? data?.closedIssuesAssignedToWarden?.find((item) => item._id === issueId)
      : role === "warden" && !status && ifraised === "raised"
      ? data?.allComplaintsRaisedToWarden?.find((item) => item._id === issueId)
      : role === "dsw" && !status && !ifraised
      ? data?.sortedIssues?.find((item) => item._id === issueId)
      : role === "dsw" && !status && ifraised === "raised"
      ? data?.allComplaintsRaisedToDsw?.find((item) => item._id === issueId)
      : role === "dsw" && status === "closed"
      ? data?.closedIssuesAssignedToDsw?.find((item) => item._id === issueId)
      : role === "superadmin" && !status
      ? data?.AllRegissues?.find((item) => item._id === issueId)
      : role === "superadmin" && status === "closed"
      ? data?.AllClosedissues?.find((item) => item._id === issueId)
      : role === "dsw" && !status && ifraised === "raise"
      ? data?.allComplaintsRaisedToDsw?.find((item) => item._id === issueId)
      : null;

  // console.log("complaint", complaint);
  const Comments = complaint?.comments;
  const [forwardBtnVisibility, setForwardBtnVisibility] = useState(false);
  const forwardTo =
    complaint?.forwardedTo === "supervisor"
      ? "warden"
      : complaint?.forwardedTo === "warden"
      ? "dsw"
      : null;

  useEffect(() => {
    if (showPopUp) scrollToTop();
  }, [showPopUp]);

  useEffect(() => {
    if (role === "supervisor" && complaint?.forwardedTo === "supervisor") {
      setForwardBtnVisibility(true);
    } else if (role === "warden" && complaint?.forwardedTo === "warden") {
      setForwardBtnVisibility(true);
    } else if (role === "dsw" && complaint?.forwardedTo === "dsw") {
      setForwardBtnVisibility(true);
    } else {
      setForwardBtnVisibility(false);
    }
  }, [complaint?.forwardedTo, role]);

  const otherID = complaint?.otherID;
  const [commentBody, setCommentBody] = useState("");
  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };
  const token = Cookies.get("authToken");

  // ADD COMMENT ONCLICK FUNCTION
  const handleAddComment = async (e) => {
    e.preventDefault();
    setAddingComment(true);
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API}/addcomment/${issueID}`,
          { commentBody, createdAt },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "comment added successfully") {
            toast("comment added successfully");
            setCommentBody("");
          }
        });
    } catch (errror) {
      if (errror.response) {
        switch (errror.response.data.error) {
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          case "No such issue exists":
            toast("No such issue exists");
            break;
          case "no such role exists which can add comment":
            toast("You are not authorized to add comment on this issue");
            break;
          case "Something went wrong on the server side":
            toast("Something went wrong on the server side");
            break;
          case "Issue has been closed by the student, can't add comment":
            toast("Issue has been closed, can't add comment");
            break;
          case "Issue has been solved, can't add comment":
            toast("Issue has been solved, can't add comment");
            break;
          case "No comment body found":
            toast("No comment body found");
            break;
          default:
            toast("Something went wrong");
            break;
        }
      }
    } finally {
      setAddingComment(false);
    }
  };

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const handleForwardIssue = async (e) => {
    e.preventDefault();
    setForwarding(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/forwardissue`,
          { issueID, reasonForForwarding, otherID, forwardedAt },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (
            res.data.message ===
            "Issue forwarded successfully to the warden and notification saved"
          ) {
            toast("Issue forwarded successfully to the warden");
            setReasonForForwarding("");
          } else if (
            res.data.message ===
            "Issue forwarded successfully to the dsw and notification saved"
          ) {
            toast("Issue forwarded successfully to the dsw");
            setReasonForForwarding("");
          }
        });
    } catch (ew) {
      if (ew.response) {
        switch (ew.response.data.error) {
          case "body incomplete":
            toast("Please provide the reason for forwarding");
            break;
          case "No notification exists":
            toast("No notification exists");
            break;
          case "No such issue exists":
            toast("No such issue exists");
            break;
          case "Issue has been closed by the student, can't forward":
            toast("Issue has been closed by the student, can't forward");
            break;
          case "Issue already forwarded to warden":
            toast("Issue already forwarded to warden");
            break;
          case "Issue hasn't received by supervisor yet":
            toast("Issue hasn't received by supervisor yet");
            break;
          case "Issue already forwarded to DSW":
            toast("Issue already forwarded to DSW");
            break;
          case "Issue has not been forwarded to warden yet":
            toast("Issue has not been forwarded to warden yet");
            break;
          case "Not authorized to access this api endpoint":
            toast("Not authorized to access this api endpoint");
            break;
          case "Something went wrong on the server side":
            toast("Something went wrong on the server side");
            break;
          default:
            toast("Something went wrong");
            break;
        }
      }
    } finally {
      setForwarding(false);
    }
  };

  const handleMarkAsSolved = async (e) => {
    e.preventDefault();
    setMarkingSolve(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/issuesolved`,
          { issueID, otherID, solvedAt },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue marked as solved") {
            toast("Issue marked as solved");
            window.location.reload();
          }
        });
    } catch (ee) {
      if (ee.response) {
        switch (ee.response.data.error) {
          case "payload missing":
            toast("payload missing");
            break;
          case "Issue has been closed by the student, can't mark as solved":
            toast("Issue has been closed by the student, can't mark as solved");
            break;
          case "No notification exists":
            toast("No notification exists");
            break;
          case "Issue already marked as solved":
            toast("Issue already marked as solved");
            break;
          case "Not authorized to access this issue":
            toast("Not authorized to access this issue");
            break;
          case "Only supervisor can mark an issue as solved":
            toast("Only supervisor can mark an issue as solved");
            break;
          case "Internal server error":
            toast("Internal server error");
            break;
          default:
            toast("Something went wrong");
            break;
        }
      }
    } finally {
      setMarkingSolve(false);
    }
  };

  // console.log(Comments)

  // approve ISSUE ONCLICK FUNCTION
  const handleApprove = async (e) => {
    e.preventDefault();
    setApprovingIssue(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/approveissue`,
          { issueID, otherID, time },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue approved successfully by the warden") {
            toast("Issue approved successfully by the warden");
          } else if (res.data.message === "Issue approved successfully by the dsw") {
            toast("Issue approved successfully by the dsw");
          }
        });
    } catch (eee) {
      if (eee.response) {
        switch (eee.response.data.error) {
          case "payload missing":
            toast("payload missing");
            break;
          case "No such issue exists":
            toast("No such issue exists");
            break;
          case "Issue has been closed by the student, can't approve":
            toast("Issue has been closed by the student, can't approve");
            break;
          case "No notification exists":
            toast("No notification exists");
            break;
          case "No other role are authorized to approve an issue":
            toast("No other role are authorized to approve an issue");
            break;
          case "Issue has already been approved by the dsw":
            toast("Issue has already been approved by the dsw");
            break;
          case "Issue has already been approved by the warden":
            toast("Issue has already been approved by the warden");
            break;
          case "Something went wrong on the server side":
            toast("Something went wrong on the server side");
            break;
          default:
            toast("Something went wrong");
            console.error(eee.response.data.error);
            break;
        }
      }
    } finally {
      setApprovingIssue(false);
    }
  };

  // CLOSE ISSUE ONCLICK FUNCTION
  const handleClose = async () => {
    // console.log(issueId)
    setClosing(true);
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
            navigate("/");
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
            console.error(er);
            break;
        }
      }
    } finally {
      setClosing(false);
    }
  };

  function scrollToTop() {
    window.scrollTo({
      top: "0",
      left: "0",
      behavior: "smooth",
    });
  }

  function handleShowPopUp() {
    setShowPopUp(!showPopUp);
  }

  // make sure the dean and warden has got the privilege to approve the issue even when the issue has been raised directly to the dsw and warden and not been forwarded
  const dswApproved = complaint?.IssueForwardedToDsw[0]?.isApproved;
  const wardenApproved = complaint?.IssueForwardedToWarden[0]?.isApproved;
  const isIssueApproved =
    role === "warden" ? wardenApproved : role === "dsw" ? dswApproved : null;

  if (!complaint) {
    return <Skeleton />;
  }

  return (
    <div className="div">
      {showPopUp && (
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: showPopUp && "blur(10px)",
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
              {closing && `Are you sure you want to close this issue?`}
              {markingSolve && `Are you sure you want to mark this issue as solved?`}
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
                onClick={(e) => {
                  if (closing) handleClose();
                  if (markingSolve) handleMarkAsSolved(e);
                  handleShowPopUp();
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
                onClick={() => {
                  if (closing) setClosing(!closing);
                  if (markingSolve) setMarkingSolve(!markingSolve);
                  handleShowPopUp();
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>{`${complaint?.title} | Vyatha`}</title>
      </Helmet>

      <div className={styles.title_bar}>
        <div className={styles.title_content}> {complaint?.title}</div>
      </div>
      <div className={styles.title_page}>
        {/*  display reason for forwarding to only warden and dsw */}
        {role === "warden" &&
          (complaint?.forwardedTo === "warden" || complaint?.forwardedTo === "dsw") && (
            <div id={styles.infossofcomplaint}>
              <ul>
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  <strong>Reason for Forwarding from the Supervisor</strong> :{" "}
                  {complaint?.IssueForwardedToWarden[0]?.reasonForForwarding}
                </li>
              </ul>
            </div>
          )}

        {role === "dsw" && complaint?.forwardedTo === "dsw" && (
          <div id={styles.infossofcomplaint}>
            <ul>
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                <strong>Reason for Forwarding from the Warden</strong> :{" "}
                {complaint?.IssueForwardedToDsw[0]?.reasonForForwarding}
              </li>
            </ul>
          </div>
        )}

        {(complaint?.isSolved ||
          complaint?.isClosed ||
          complaint?.IssueForwardedToWarden[0]?.time ||
          complaint?.IssueForwardedToDsw[0]?.time) && (
          <div id={styles.infossofcomplaint}>
            <ul>
              {complaint?.isSolved && (
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  Issue has been <strong>Solved</strong> at {complaint?.solvedAt}
                </li>
              )}
            </ul>

            <ul>
              {complaint?.isClosed && (
                <li id={styles.solvedAtDetails} style={{ color: "red" }}>
                  Issue has been <strong>Closed</strong> at {complaint?.closedAt}
                </li>
              )}
            </ul>

            <ul>
              {complaint?.IssueForwardedToWarden[0]?.time && (
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  Issue has been forwarded to <strong>Warden</strong> by the Supervisor at{" "}
                  {complaint?.IssueForwardedToWarden[0]?.time}
                </li>
              )}
            </ul>

            <ul>
              {complaint?.IssueForwardedToDsw[0]?.time && (
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  Issue has been forwarded to <strong>DSW</strong> by the Warden at{" "}
                  {complaint?.IssueForwardedToDsw[0]?.time}
                </li>
              )}
            </ul>

            <ul>
              {complaint?.IssueForwardedToWarden[0]?.isApproved === true && (
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  Issue has been approved by the <strong>Warden</strong>
                </li>
              )}
            </ul>

            <ul>
              {complaint?.IssueForwardedToDsw[0]?.isApproved === true && (
                <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                  Issue has been approved by the <strong>DSW</strong>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className={styles.dropdown_img}>
          <img src="" alt="" />
        </div>
        <div className={styles.student_info}>
          <fieldset className={styles.field_set}>
            <legend>
              <div>Filled by</div>
            </legend>
            <div className={styles.list}>
              <ul>
                <li>Name of the Student : {complaint?.name}</li>
                <li>Scholar ID : {complaint?.scholarID}</li>
                <li>Room Number : {complaint?.room}</li>
                <li>Phone Number : {complaint?.phone}</li>
              </ul>
              <div className={styles.card_photo}>
                <div className={styles.card_photo_content}>
                  <img src={complaint?.idcard} alt="" />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className={styles.comment_section}>
          {Comments?.length === 0 && (
            <div className={styles.NoComments}>
              <p>No comments yet</p>
            </div>
          )}
          {/* <span> Comment hh:mm day - dd/mm/yr</span> */}
          {Comments?.map((item) => {
            return (
              <main id={styles.mainComment} key={item?._id}>
                <li name={item?.author} value={item?.author}>
                  <span>{item?.author}</span>
                </li>
                <p id={styles.maincontent}>{item?.commentBody}</p>
                <div className={styles.Date}>
                  <span className={styles.flex_d}>
                    {item.createdAt}{" "}
                    <span>
                      <HiEllipsisVertical />
                    </span>
                  </span>
                </div>
              </main>
            );
          })}
        </div>

        <div className={styles.photo_uploaded}>
          <span style={{ marginBottom: ".75vw" }}>Uploaded Photo:</span>
          <div className={styles.photodiv}>
            <img src={complaint?.photo} alt={complaint?.name} />
          </div>
        </div>
        <div className={styles.comment_form}>
          <input
            type="text"
            placeholder="Tap to Comment "
            value={commentBody}
            onChange={handleCommentChange}
          />
          <button
            onClick={handleAddComment}
            id={styles.addcommentbtn}
            style={{
              opacity: commentBody === "" || addingComment ? "0.5" : "1",
              cursor: commentBody === "" || addingComment ? "not-allowed" : "pointer",
            }}
            disabled={commentBody === "" || addingComment}
          >
            {addingComment ? "Adding Comment..." : "Add Comment"}
          </button>

          {/* when forwardTo has the value of dsw, then it should have the display of none for the role of supervisor  */}
          {forwardBtnVisibility === true && (
            <main
              style={{
                display: role === "dsw" ? "none" : "block",
              }}
            >
              <span>Forward to : </span>
              <input type="text" placeholder="Tap to Select" value={forwardTo} />
              <input
                type="text"
                placeholder="Reason to forward"
                value={reasonForForwarding}
                onChange={handleInputChange}
              />
            </main>
          )}
        </div>

        {/* Forward Issue only for warden and DSW */}
        {forwardBtnVisibility === true && (
          <div className={styles.submit}>
            <div
              onClick={handleForwardIssue}
              type="submit"
              style={{
                cursor:
                  reasonForForwarding === "" || forwarding ? "not-allowed" : "pointer",
                opacity: reasonForForwarding === "" || forwarding ? "0.5" : "1",
                display: role === "dsw" ? "none" : "block",
              }}
            >
              <input
                disabled={
                  reasonForForwarding === "" ||
                  forwarding ||
                  complaint?.isSolved ||
                  complaint?.isClosed
                }
                type="submit"
                title="Forward the issue"
                style={{
                  cursor:
                    reasonForForwarding === "" || forwarding ? "not-allowed" : "pointer",
                }}
              />
            </div>
          </div>
        )}

        {/* Mark as  solved button, only for supervisor */}
        {role === "supervisor" && (
          <button
            id={styles.addcommentbtn}
            style={{
              // display: role === "supervisor" ? "block" : "none",
              cursor: complaint?.isSolved || markingSolve ? "not-allowed" : "pointer",
              opacity: complaint?.isSolved || markingSolve ? "0.5" : "1",
            }}
            onClick={() => {
              setClosing(false);
              setMarkingSolve(true);
              handleShowPopUp();
            }}
            disabled={complaint?.isSolved || markingSolve}
          >
            {complaint?.isSolved
              ? "Issue has been marked as solved"
              : markingSolve
              ? "Marking as solved..."
              : "Mark as solved"}
          </button>
        )}

        {/* if warden or dsw has marked the issue as approved then show the text issue has been approved and remove the button from the DOM */}

        {/* Approve issue button only for the warden and dsw */}
        {!isIssueApproved && role !== "supervisor" && (
          <button
            style={{
              display: role === complaint?.forwardedTo ? "block" : "none",
              cursor: approvingIssue ? "not-allowed" : "pointer",
              opacity: approvingIssue ? "0.5" : "1",
            }}
            id={styles.addcommentbtn}
            onClick={handleApprove}
            disabled={approvingIssue}
          >
            {approvingIssue ? "Approving Issue..." : "Approve Issue"}
          </button>
        )}

        {/* Close issue button only for supervisor */}
        {role === "supervisor" &&
          complaint?.isClosed === false &&
          complaint?.isSolved === false && (
            <button
              style={{
                cursor: closing ? "not-allowed" : "pointer",
                opacity: closing ? "0.5" : "1",
              }}
              id={styles.addcommentbtn}
              onClick={() => {
                setClosing(true);
                setMarkingSolve(false);
                handleShowPopUp();
              }}
              disabled={closing}
            >
              {closing ? "Closing issue..." : "Close Issue"}
            </button>
          )}
      </div>
    </div>
  );
};

export default IndividualComplaintAdmin;
