/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styles from "./IndividualComplaintA.module.scss";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import { UserContext } from "../../../../Context/Provider";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const IndividualComplaintAdmin = () => {
  const [closing, setClosing] = useState(false);
  const [markingSolve, setMarkingSolve] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [approvingIssue, setApprovingIssue] = useState(false);
  const { key } = useParams(); // Extracted the key
  const issueId = key;
  const issueID = key;
  const [reasonForForwarding, setReasonForForwarding] = useState("");
  const { role, isLoggedIn } = useContext(UserContext);
  const handleInputChange = (e) => {
    setReasonForForwarding(e.target.value);
  };
  const { data, error, isLoading } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { enabled: isLoggedIn, refetchOnWindowFocus: "always" }
  );

  const complaint = data?.issue;

  const [forwardBtnVisibility, setForwardBtnVisibility] = useState(false);
  const forwardTo =
    complaint?.forwardedTo === "supervisor"
      ? "warden"
      : complaint?.forwardedTo === "warden"
      ? "dsw"
      : null;
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
          { commentBody },
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
            toast("no such role exists which can add comment");
            break;
          case "Something went wrong on the server side":
            toast("Something went wrong on the server side");
            break;
          case "Issue has been closed by the student, can't add comment":
            toast("Issue has been closed by the student, can't add comment");
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
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/forwardissue`,
          { issueID, reasonForForwarding, otherID },
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
            toast("body incomplete");
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
    }
  };

  const handleMarkAsSolved = async (e) => {
    e.preventDefault();
    setMarkingSolve(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/issuesolved`,
          { issueID, otherID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue marked as solved") {
            toast("Issue marked as solved");
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

  const Comments = data?.issue?.comments;
  // console.log(Comments)

  // approve ISSUE ONCLICK FUNCTION
  const handleApprove = async (e) => {
    e.preventDefault();
    setApprovingIssue(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/approveissue`,
          { issueID, otherID },
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

  const dswApproved = complaint?.IssueForwardedToDsw[0]?.isApproved;
  const wardenApproved = complaint?.IssueForwardedToWarden[0]?.isApproved;
  const isIssueApproved =
    role === "warden" ? wardenApproved : role === "dsw" ? dswApproved : null;

  return (
    <div className={styles.title_page}>
      <Helmet>
        <title>{`${complaint?.title} | Vyatha`}</title>
      </Helmet>

      <div className={styles.title_bar}>
        <div className={styles.title_content}> {complaint?.title}</div>
      </div>

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
        <span>Uploaded Photo:</span>
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

      {/* Forward Issue */}
      {forwardBtnVisibility === true && (
        <div
          onClick={handleForwardIssue}
          style={{
            cursor: reasonForForwarding === "" ? "not-allowed" : "pointer",
            opacity: reasonForForwarding === "" ? "0.5" : "1",
            display: role === "dsw" ? "none" : "block",
          }}
          className={styles.submit}
        >
          <input type="submit" />
        </div>
      )}

      {/* Mark as  solved button, only for supervisor */}
      {role === "supervisor" && (
        <button
          id={styles.addcommentbtn}
          style={{
            // display: role === "supervisor" ? "block" : "none",
            cursor: complaint?.isSolved ? "not-allowed" : "pointer",
            opacity: complaint?.isSolved ? "0.5" : "1",
          }}
          onClick={handleMarkAsSolved}
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
          }}
          id={styles.addcommentbtn}
          onClick={handleApprove}
        >
          {approvingIssue ? "Approving Issue..." : "Approve Issue"}
        </button>
      )}

      {/* Close issue button */}
      {role === "supervisor" &&
        complaint?.isClosed === false &&
        complaint?.isSolved === false && (
          <button
            style={{
              cursor: closing ? "not-allowed" : "pointer",
              opacity: closing ? "0.5" : "1",
            }}
            id={styles.addcommentbtn}
            onClick={handleClose}
          >
            {closing ? "Closing issue..." : "Close Issue"}
          </button>
        )}
    </div>
  );
};

export default IndividualComplaintAdmin;
