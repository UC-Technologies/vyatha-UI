/* eslint-disable no-constant-condition */
/* eslint-disable no-console */
import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import styles from "./IndividualComplaintA.module.scss";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import { UserContext } from "../../../../Context/Provider";

const IndividualComplaintAdmin = () => {
  const { key } = useParams(); // Extracted the key
  const issueId = key;
  const issueID = key;
  const [reasonForForwarding, setReasonForForwarding] = useState("");
  const handleInputChange = (e) => {
    setReasonForForwarding(e.target.value);
  };
  const { data, error, isLoading, isFetching } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { refetchOnWindowFocus: "always" }
  );

  const { role } = useContext(UserContext);
  const complaint = data?.issue;
  const otherID = complaint?.otherID;
  const [commentBody, setCommentBody] = useState("");
  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };
  const token = Cookies.get("authToken");
  const handleAddComment = async (e) => {
    e.preventDefault();
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
          case "No comment body found":
            toast("No comment body found");
            break;
          default:
            toast("Something went wrong");
            break;
        }
      }
    }
  };

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const forwardTo =
    complaint?.forwardedTo === "supervisor"
      ? "warden"
      : complaint?.forwardedTo === "warden"
      ? "dsw"
      : null;

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
            toast("Issue forwarded successfully to the warden and notification saved");
            setReasonForForwarding("");
          } else if (
            res.data.message ===
            "Issue forwarded successfully to the dsw and notification saved"
          ) {
            toast("Issue forwarded successfully to the dsw and notification saved");
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
    }
  };
  return (
    <div className={styles.title_page}>
      <Helmet>
        <title>{`${complaint?.title} | Vyatha`}</title>
      </Helmet>
      <div className={styles.title_bar}>
        <div className={styles.title_content}> {complaint?.title}</div>
      </div>
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
              <div className={styles.card_photo_content}>ID Card Photo</div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className={styles.comment_section}>
        <span> Comment hh:mm day - dd/mm/yr</span>
      </div>
      <div className={styles.photo_uploaded}>
        <span>Photo uploaded</span>
        <div>
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
            opacity: commentBody === "" ? "0.5" : "1",
            cursor: commentBody === "" ? "not-allowed" : "pointer",
          }}
        >
          Add comment
        </button>
        <main
          style={{
            display:
              role === "dsw"
                ? "none"
                : "block" || complaint?.isSolved
                ? "none"
                : "block" || complaint?.forwardedTo !== "supervisor"
                ? "none"
                : "block",
          }}
        >
          <span>Forward to : </span>
          <input type="text" placeholder="Tap to Select" value={forwardTo} />
          <input
            type="text"
            placeholder="Reson to forward"
            value={reasonForForwarding}
            onChange={handleInputChange}
          />
        </main>
      </div>

      <div
        onClick={handleForwardIssue}
        style={{
          cursor: reasonForForwarding === "" ? "not-allowed" : "pointer",
          opacity: reasonForForwarding === "" ? "0.5" : "1",
          display:
            role === "dsw"
              ? "none"
              : "block" || complaint?.isSolved
              ? "none"
              : "block" || complaint?.forwardedTo !== "supervisor"
              ? "none"
              : "block",
        }}
        className={styles.submit}
      >
        <input type="submit" />
      </div>
      <button
        id={styles.addcommentbtn}
        style={{
          display: role === "supervisor" ? "block" : "none",
          cursor: complaint?.isSolved ? "not-allowed" : "pointer",
          opacity: complaint?.isSolved ? "0.5" : "1",
        }}
        onClick={handleMarkAsSolved}
      >
        {complaint?.isSolved
          ? "Issue has been marked as solved"
          : "Mark the Issue as solved"}
      </button>
    </div>
  );
};

export default IndividualComplaintAdmin;
