// import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// // import LoadingBar from 'react-top-loading-bar'

// const StudentProfile = () => {
//   const navigate = useNavigate()

//   // const [progress, setProgress] = useState(0)

//   const hadnleEdit = () => {
//     navigate("/student/profile/edit")
//     setProgress(100)
//   }

//   return (
//     <div>StudentProfile
//       {/* <LoadingBar
//         color='#f11946'
//         progress={progress}
//         onLoaderFinished={() => setProgress(0)}
//       /> */}
//       <button onClick={hadnleEdit}>Edit</button>
//     </div>
//   )
// }

// export default StudentProfile

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentProfile.module.scss";

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate("/student/profile/edit");
  };

  const handleSignOut = () => {
    navigate("/auth/student");
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.profile_image}>
          <img
            src="https://imgv3.fotor.com/images/gallery/Cartoon-Male-Headshot.jpg"
            alt="profileimage"
          />
        </div>
        <div className={styles.details_section}>
          <div className={styles.details_about}>
            <div className={styles.right_section}>Name</div>
            <div className={styles.right_section}>Scholar ID</div>
            <div className={styles.right_section}>Email</div>
            <div className={styles.right_section}>Hostel</div>
            <div className={styles.right_section}>Room No.</div>
            <div className={styles.right_section}>Phone</div>
          </div>
          <div className={styles.details_info}>
            <div className={styles.left_section}>Jassi Laskar</div>
            <div className={styles.left_section}>2211086</div>
            <div className={styles.left_section}>jassilaskar27@gmail.com</div>
            <div className={styles.left_section}>GH1</div>
            <div className={styles.left_section}>320</div>
            <div className={styles.left_section}>600********</div>
          </div>
        </div>
        <div className={styles.button_section}>
          <button className={styles.Editprofile} onClick={handleProfileEdit}>
            <img
              src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1698398076/Group_40569_kskfcv.jpg?_s=public-apps"
              alt=""
            />
          </button>
          <button className={styles.Signout} onClick={handleSignOut}>
            <img
              src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1698398071/Group_40570_i3jsow.jpg?_s=public-apps"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
