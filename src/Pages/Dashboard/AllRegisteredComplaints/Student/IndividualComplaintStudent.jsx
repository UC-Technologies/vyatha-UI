/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import styles from "./IndividualComplaintS.module.scss";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
// import SortByButton from "../../../../Components/RegisteredComplaint/Student/SortByButton";

const IndividualComplaintStudent = () => {
  // const imageUp = "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703025668/arrow_drop_up_FILL1_wght400_GRAD0_opsz24_twmqne.jpg?_s=public-apps";
  // const imageDown =
  //   "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703025668/arrow_drop_down_FILL1_wght400_GRAD0_opsz24_br1ybe.jpg?_s=public-apps";

  const imgBack =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";
  const [commentBody, setCommentBody] = useState("");
  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };
  const { key } = useParams(); // Extracted the key
  const issueId = key;
  const issueID = key;

  const { data, error, isLoading, isFetching } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { refetchOnWindowFocus: "always" }
  );

  const issueData = data?.issue;
  // console.log(issueData);
  const Comments = data?.issue?.comments;
  console.log(Comments);
  useEffect(() => {
    document.title = `${issueData?.name} | Vyatha`;
  });

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  function handleForward() {
    // Function to handle the submit button
  }
  // function handleComments() {
  //   // Function to handle the comments
  // }

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
          default:
            toast("Something went wrong");
            break;
        }
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.title}>
        <Link to="/dashboard">
          <img src={imgBack} alt="Back" />
        </Link>
        <h1>{issueData?.title}</h1>
      </div>
      <div className={styles.Identity}>
        <div className={styles.Info}>
          <div className={styles.FilledBy}>Filled by</div>
          <li>Name of the Student:{issueData?.name}</li>
          <li>Scholar ID:{issueData?.scholarID}</li>
          <li>Room No.:{issueData?.room}</li>
          {/* <li>Phone No.:{issueData?.phone}</li> */}
        </div>
        <div className={styles.img}>
          <img src={issueData?.IDCard} alt="ID Card"></img>
        </div>
      </div>
      <div className={styles.ComplaintProgress}>
        <div className={styles.ComplaintImg}>
          <img src={issueData?.photo} alt="ComplaintImg"></img>
        </div>
        <div className={styles.Progress}>
          {/* This section to be created the Rishab */}
          Progress details assigned to Rishab
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
            <main id={styles.mainComment} key={item?._id}>
              <li name={item?.author} value={item?.author}>
                <span>{item?.author}</span>
              </li>
              <p>{item?.commentBody}</p>
              <div className={styles.Date}>{item.createdAt}</div>
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
          <button id={styles.addcommentbtn} onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
        <div className={styles.TapToSelect}>
          <span>Raise Complaint</span>
          <select name="TapToSelect" className={styles.TapToSelect} required>
            <option value="No input" id="No_input" name="TapToSelect">
              Tap to Select
            </option>
            <option value="Warden" id="1" name="Warden">
              Warden
            </option>
            <option value="Supervisor" id="2" name="Supervisor">
              Supervisor
            </option>
          </select>
        </div>
      </div>
      <div className={styles.ForwardButton}>
        <button onClick={handleForward}>Forward</button>
      </div>
    </div>
  );
};

export default IndividualComplaintStudent;
