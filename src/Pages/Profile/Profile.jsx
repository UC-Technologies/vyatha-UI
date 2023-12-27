import { React, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/Provider";
import styles from "./Profile.module.scss";
import { fetchProfile } from "../../Components/ReactQuery/Fetchers/User";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile | Vyatha";
  }, []);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const { data, error, isLoading, isFetching } = useQuery("profile", fetchProfile, {
    refetchOnWindowFocus: "always",
  });

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const myProfile = data?.user;

  const handleProfileEdit = () => {
    navigate("/profile/edit");
  };

  const handleSignOut = () => {
    navigate("/auth");
  };

  const token = Cookies.get("authToken");
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API}/sendmagiclink`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "magic link sent successfully") {
            toast("magic link sent successfully");
          }
        });
    } catch (errr) {
      if (errr.response) {
        switch (errr.response.data.message) {
          case "Email already verified":
            toast("Email already verified");
            break;
          case "Error in generating token":
            toast("Error in generating token");
            break;
          case "Internal Server Error":
            toast("Internal Server Error");
            break;
          default:
            toast("something went wrong");
            break;
        }

        switch (errr.response.data.error) {
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          default:
            toast("something went wrong");
            break;
        }
      }
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Profileheading}>
            <p>My Profile</p>
          </div>
          <div className={styles.Profile_details}>
            <div className={styles.profile_image}>
              <div className={styles.image}>
                <img
                  src="https://imgv3.fotor.com/images/gallery/Cartoon-Male-Headshot.jpg"
                  alt="profileimage"
                />
              </div>
              <div className={styles.profile}>
                <p>Student Profile</p>
              </div>
            </div>
            <div className={styles.Student_details}>
              <div className={styles.heading}>Profile Details</div>
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
                  <div className={styles.left_section}>{myProfile?.name}</div>
                  <div
                    style={{ display: myProfile?.role === "student" ? "block" : "none" }}
                    className={styles.left_section}
                  >
                    {myProfile?.scholarID}
                  </div>
                  <div className={styles.left_section}>{myProfile?.email}</div>
                  <div className={styles.left_section}>{myProfile?.hostel}</div>
                  <div className={styles.left_section}>{myProfile?.room}</div>
                  <div className={styles.left_section}>{myProfile?.phone}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_section}>
            <button
              type="button"
              aria-label="Edit Profile"
              className={styles.Editprofile}
              onClick={handleProfileEdit}
            >
              <div>
                <div>Edit Profile</div>
              </div>
            </button>
            <button
              type="button"
              aria-label="Signout"
              className={styles.Signout}
              onClick={handleSignOut}
            >
              <div>
                <div>Sign out</div>
              </div>
            </button>

            <button
              style={{ display: myProfile?.isVerified === true ? "none" : "block" }}
              type="button"
              aria-label="Signout"
              className={styles.Signout}
              onClick={handleVerify}
            >
              <div>
                <div>Send Email verification link</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
