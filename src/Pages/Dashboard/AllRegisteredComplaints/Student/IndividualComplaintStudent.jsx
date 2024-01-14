/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import { HiEllipsisVertical } from "react-icons/hi2";
import Cookies from "js-cookie";
import styles from "./IndividualComplaintS.module.scss";
// import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import { UserContext } from "../../../../Context/Provider";
import StatusOfComplaint from "../../../../Components/RegisteredComplaint/Student/StatusOfComplaint";
// import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

// import SortByButton from "../../../../Components/RegisteredComplaint/Student/SortByButton";

const IndividualComplaintStudent = () => {
  const [raising, setRaising] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  // const imageUp = "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703025668/arrow_drop_up_FILL1_wght400_GRAD0_opsz24_twmqne.jpg?_s=public-apps";
  // const imageDown =
  //   "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703025668/arrow_drop_down_FILL1_wght400_GRAD0_opsz24_br1ybe.jpg?_s=public-apps";

  // const imgBack =
  //   "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";
  const [commentBody, setCommentBody] = useState("");
  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };
  const { key } = useParams(); // Extracted the key
  const issueId = key;
  const issueID = key;
  // console.log("profile",profile)
  const { role, isLoggedIn } = useContext(UserContext);
  const { data, error, isLoading } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { enabled: isLoggedIn, refetchOnWindowFocus: "always" }
  );

  // const { data, error, isLoading } = useQuery("complaints", fetchComplaints, {
  //   refetchOnWindowFocus: false,
  //   enabled: isLoggedIn,
  //   refetchInterval: 60000,
  //   refetchOnMount: false,
  //   refetchIntervalInBackground: true,
  // });

  // const issueData = data?.allIssues?.find((item) => item._id === issueId);

  const issueData = data?.issue;
  const otherID = issueData?.otherID;
  const Comments = issueData?.comments;
  useEffect(() => {
    document.title = `${issueData?.title} | Vyatha`;
  });

  const [issueVisibility, setIssueVisibility] = useState(false);
  useEffect(() => {
    if (issueData?.isSolved === true) {
      setIssueVisibility(true);
    } else if (issueData?.isClosed === true) {
      setIssueVisibility(true);
    } else if (issueData?.raiseComplainTo?.length === 3) {
      setIssueVisibility(true);
    } else {
      setIssueVisibility(false);
    }
  }, [issueData?.isSolved, issueData?.isClosed, issueData?.raiseComplainTo?.length]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const handleForward = async (e) => {
    e.preventDefault();
    setRaising(true);
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API}/raisecomplain`,
          { issueID, otherID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Complain raised to warden") {
            toast("Complain raised to warden");
          } else if (res.data.message === "Complain raised to dsw") {
            toast("Complain raised to dsw");
          }
        });
    } catch (er) {
      if (er.response) {
        switch (er.response.data.error) {
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          case "Please provide issue ID and otherID":
            toast("Please provide issue ID and otherID");
            break;
          case "No such issue exists":
            toast("No such issue exists");
            break;
          case "Not authorized to access this issue":
            toast("Not authorized to access this issue");
            break;
          case "Can't raise complain to warden before 7 days":
            toast("Can't raise complain to warden before 7 days");
            break;
          case "Complain already raised to dsw":
            toast("Complain already raised to dsw");
            break;
          case "unavailable operation":
            toast("unavailable operation");
            break;
          case "not authorized to access this endpoint":
            toast("not authorized to access this endpoint");
            break;
          case "Can't raise complain to dsw before 7 days":
            toast("Can't raise complain to DSW before 7 days");
            break;
          case "Internal server error":
            toast("Internal server error");
            break;
          default:
            toast("Something went wrong");
            console.error(er);
            break;
        }
      }
    } finally {
      setRaising(false);
    }
  };

  const token = Cookies.get("authToken");
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

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.Container}>
      <div className={styles.title}>
        {/* <Link to="/dashboard">
          <img src={imgBack} alt="Back" />
        </Link> */}
        <h1>{issueData?.title}</h1>
      </div>

      <div className={styles.Identity}>
        <div className={styles.Info}>
          <div className={styles.FilledBy}>Filled by</div>
          <li>Name of the Student: {issueData?.name}</li>
          <li>Scholar ID: {issueData?.scholarID}</li>
          <li>Hostel: {issueData?.hostel}</li>
          <li>Room Number: {issueData?.room}</li>
          {/* <li>Phone No.:{issueData?.phone}</li> */}
        </div>
        <div className={styles.img}>
          <img src={issueData?.idcard} alt="idcard"></img>
        </div>
      </div>

      <main id={styles.infoofraise}>
        {issueData?.raiseComplainTo?.length > 1 &&
          issueData?.raiseComplainTo.map((item, index) => {
            return (
              <main key={item._id}>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "green",
                    display: index === 0 ? "none" : "block",
                  }}
                >
                  &quot;{" "}
                  {`Issue has been raised to ${item?.whom} by the student on ${item?.when}`}{" "}
                  &quot;
                </p>
              </main>
            );
          })}
      </main>

      {(issueData?.isSolved ||
        issueData?.isClosed ||
        issueData?.IssueForwardedToWarden[0]?.time ||
        issueData?.IssueForwardedToDsw[0]?.time) && (
        <div id={styles.infossofcomplaint}>
          <ul>
            {issueData?.isSolved && (
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                Issue has been <strong>Solved</strong> at {issueData?.solvedAt}
              </li>
            )}
          </ul>

          <ul>
            {issueData?.isClosed && (
              <li id={styles.solvedAtDetails} style={{ color: "red" }}>
                Issue has been <strong>Closed</strong> at {issueData?.closedAt}
              </li>
            )}
          </ul>

          <ul>
            {issueData?.IssueForwardedToWarden[0]?.time && (
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                Issue has been forwarded to <strong>Warden</strong> by the supervisor at{" "}
                {issueData?.IssueForwardedToWarden[0]?.time}
              </li>
            )}
          </ul>

          <ul>
            {issueData?.IssueForwardedToDsw[0]?.time && (
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                Issue has been forwarded to <strong>DSW</strong> by the Warden at{" "}
                {issueData?.IssueForwardedToDsw[0]?.time}
              </li>
            )}
          </ul>

          <ul>
            {issueData?.IssueForwardedToWarden[0]?.isApproved === true && (
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                Issue has been approved by the <strong>Warden</strong>
              </li>
            )}
          </ul>

          <ul>
            {issueData?.IssueForwardedToDsw[0]?.isApproved === true && (
              <li id={styles.solvedAtDetails} style={{ color: "green" }}>
                Issue has been approved by the <strong>DSW</strong>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className={styles.ComplaintProgress}>
        <div className={styles.ComplaintImg}>
          <img src={issueData?.photo} alt="ComplaintImg"></img>
        </div>
        <div className={styles.Progress}>
          <StatusOfComplaint />
        </div>
      </div>
      <div className={styles.Comments}>
        <div className={styles.CommentsHeading}>Comments</div>
        {Comments?.length === 0 && (
          <div className={styles.NoComments}>
            <p>No comments yet</p>
          </div>
        )}
        {Comments?.map((item) => {
          return (
            <main
              id={styles.mainComment}
              key={item?._id}
              style={{
                height: "auto",
                maxHeight: "40vh",
                overflowY: "auto",
              }}
            >
              <li name={item?.author} value={item?.author}>
                <span>{item?.author}</span>
              </li>
              <p>{item?.commentBody}</p>
              <div className={styles.Date}>
                <span className={styles.flex_d}>
                  {item.createdAt}{" "}
                  <span onClick={handleEdit}>
                    <HiEllipsisVertical />
                  </span>
                </span>
              </div>
            </main>
          );
        })}
      </div>
      <div className={styles.ComplaintButtons}>
        <div className={styles.TapToComment}>
          <input
            type="text"
            placeholder="Tap to Comment"
            value={commentBody}
            id="comment"
            name="comment"
            onChange={handleCommentChange}
          ></input>
        </div>
        <div>
          <button
            style={{
              opacity: commentBody === "" || addingComment ? "0.5" : "1",
              cursor: commentBody === "" || addingComment ? "not-allowed" : "pointer",
            }}
            id={styles.addcommentbtn}
            onClick={handleAddComment}
            disabled={commentBody === "" || addingComment}
          >
            {addingComment ? "Adding Comment..." : "Add Comment"}
          </button>
        </div>

        {!issueVisibility && role === "student" && (
          <div
            className={styles.TapToSelect}
            // style={{ display: issueData?.isSolved === true ? "none" : "block" || issueData?.raiseComplainTo?.length === 3 ? "none" : "block" || issueData?.isClosed === true ? "none" : "block" }}
          >
            {/* <span>Raise Complain</span> */}
            <p>
              You can raise complain after 7 days if there is no response from the
              Supervisor side
            </p>
          </div>
        )}
      </div>

      {!issueVisibility && role === "student" && (
        <div
          // style={{ display: issueData?.isSolved === true ? "none" : "block" || issueData?.raiseComplainTo?.length === 3 ? "none" : "block" || issueData?.isClosed === true ? "none" : "block" }}
          className={styles.ForwardButton}
        >
          <button
            disabled={issueData?.raiseComplainTo?.length === 3 || raising}
            style={{
              opacity: issueData?.raiseComplainTo?.length === 3 || raising ? "0.5" : "1",
              cursor:
                issueData?.raiseComplainTo?.length === 3 || raising
                  ? "not-allowed"
                  : "pointer",
              fontSize: "clamp(12px,2.5vw,20px)",
            }}
            onClick={handleForward}
          >
            {raising ? "Raising Complain..." : "Raise Complain"}
          </button>
        </div>
      )}
    </div>
  );
};

export default IndividualComplaintStudent;
