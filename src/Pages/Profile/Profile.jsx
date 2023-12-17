import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";

const Profile = () => {
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate("/profile/edit");
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
          <button
            type="button"
            aria-label="Edit Profile"
            className={styles.Editprofile}
            onClick={handleProfileEdit}
          >
            <img
              src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1698398076/Group_40569_kskfcv.jpg?_s=public-apps"
              alt=""
            />
          </button>
          <button
            type="button"
            aria-label="Signout"
            className={styles.Signout}
            onClick={handleSignOut}
          >
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

export default Profile;
