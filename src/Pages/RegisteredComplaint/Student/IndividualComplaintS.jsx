import React from "react";
import { useParams } from "react-router-dom";
import Data from "../../../Data/ComplaintRegister.json";
import styles from "./IndividualComplaintS.module.scss";

const IndividualComplaint = () => {
  const { key } = useParams(); // Extracted the key

  // Finding the dataset using key
  const complaint = Data.find((item) => item.key === key);

  if (!complaint) {
    return <div>Complaint not found</div>;
  }
  function handleForward() {
    // Function to handle the submit button
  }
  function handleComments() {
    // Function to handle the comments
  }
  function handleCommentsDropD() {
    // Function to handle the dropdown
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Title}>Title of Complaint</div>
      <div className={styles.Identity}>
        <div className={styles.Info}>
          <div className={styles.FilledBy}>Filled by</div>
          <li>Name of the Student:{complaint.Name}</li>
          <li>Scholar ID:{complaint.ScholarID}</li>
          <li>Room No.:{complaint.RoomNo}</li>
          <li>Phone No.:{complaint.PhoneNo}</li>
        </div>
        <div className={styles.img}>
          <img src={complaint.IDCard} alt="ID Card"></img>
        </div>
      </div>
      <div className={styles.ComplaintProgress}>
        <div className={styles.ComplaintImg}>
          <img src={complaint.ComplaintImg} alt="ComplaintImg"></img>
        </div>
        <div className={styles.Progress}>
          {/* This section to be created the Rishab */}
          Progress details assigned to Rishab
        </div>
      </div>
      <div className={styles.Comments}>
        <div className={styles.CommentsHeading}>Comments</div>
        <li name="Supervisor" value="Supervisor">
          <label htmlFor="Supervisor">
            <span>Supervisor</span>
          </label>
        </li>
        <p>Morbi a metus.Phasellus enim erat, vestibulum vel,aliquam..........</p>
        <div className={styles.Date}>hh:mm day - dd/mm/yy</div>
        <li name="You" value="You">
          <label htmlFor="You">
            <span>You</span>
          </label>
        </li>
        <p>Morbi a metus.Phasellus enim erat, vestibulum vel,aliquam..........</p>
        <div className={styles.Date}>hh:mm day - dd/mm/yy</div>
        <li name="Supervisor" value="Supervisor">
          <label htmlFor="Supervisor">
            <span>Supervisor</span>
          </label>
        </li>
        <p>Morbi a metus.Phasellus enim erat, vestibulum vel,aliquam..........</p>
        <div className={styles.Date}>hh:mm day - dd/mm/yy</div>
        <li name="You" value="You">
          <label htmlFor="You">
            <span>You</span>
          </label>
        </li>
        <p>Morbi a metus.Phasellus enim erat, vestibulum vel,aliquam..........</p>
        <div className={styles.Date}>hh:mm day - dd/mm/yy</div>
        <div className={styles.CommentsDropD}>
          <button onClick={handleCommentsDropD}>See all comments</button>
        </div>
      </div>
      <div className={styles.ComplaintButtons}>
        <div className={styles.TapToComment}>
          <button onClick={handleComments}>Tap to Comment</button>
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

export default IndividualComplaint;
