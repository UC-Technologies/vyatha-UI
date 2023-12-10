import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentEditProfile.module.scss";

const StudentEditProfile = () => {
  const navigate = useNavigate();

  const handleProfileSave = () => {
    navigate("/student/profile");
  };

  const handleSignOut = () => {
    navigate("/auth/student");
  };

  // const profilePic = document.getElementById("profile-pic");

  // const inputFile = document.getElementById("input-file");

  // inputFile.onchange = () => {
  //   profilePic.src = URL.createObjectURL(inputFile.files[0]);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.Profileheading}>
          <p>My Profile</p>
        </div>
        <div className={styles.profile_image}>
          <div>
            <img
              src="https://imgv3.fotor.com/images/gallery/Cartoon-Male-Headshot.jpg"
              alt="profileimage"
              id="profile-pic"
            />
          </div>

          <div className={styles.changeprofile}>
            <label htmlFor="input-file">Change Photo</label>
            <input type="file" accept="image/jpeg, image/png, imagejpg" id="input-file" />
          </div>
        </div>
        <div className={styles.details_section}>
          <form>
            <div className={styles.details_section}>
              <div className={styles.details_about}>
                <div className={styles.right_section}>Name</div>
                <div className={styles.right_section}>Scholar ID</div>
                <div className={styles.right_section}>Email</div>
                <div className={styles.right_section}>Hostel</div>
                <div className={styles.right_section}>Room No.</div>
                <div className={styles.right_section}>Phone</div>
              </div>
              <div className={styles.details_fill}>
                <div className={styles.left_section}>
                  <input type="Full Name" autoComplete="off" />
                </div>
                <div className={styles.left_section}>
                  <input type="Scholar ID" autoComplete="off" />
                </div>
                <div className={styles.left_section}>
                  <input type="Email" autoComplete="off" />
                </div>
                <div className={styles.left_section}>
                  <select className={styles.hostel_options}>
                    <option value="">BH1</option>
                    <option value="">BH2</option>
                    <option value="">BH3</option>
                    <option value="">BH4</option>
                    <option value="">PG Hostel</option>
                    <option value="">BH6</option>
                    <option value="">BH7</option>
                    <option value="">BH8</option>
                    <option value="">BH9A</option>
                    <option value="">BH9B</option>
                  </select>
                </div>
                <div className={styles.left_section}>
                  <input type="Room No." autoComplete="off" />
                </div>
                <div className={styles.left_section}>
                  <input type="Phone No." autoComplete="off" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.button_section}>
          <button className={styles.Editprofile} onClick={handleProfileSave}>
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

export default StudentEditProfile;
