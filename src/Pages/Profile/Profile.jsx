import { React, useMemo, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/Provider";
import styles from "./Profile.module.scss";
import { fetchProfile } from "../../Components/ReactQuery/Fetchers/User";
import Skeleton from "../../Components/Shared/Loading/Skeletion";
import { formattedDate } from "../../Components/Lib/GetDate";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile | Vyatha";
  }, []);
  const linkSendAt = formattedDate;
  const [showPopUp, setShowPopUp] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: "0",
      left: "0",
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (showPopUp) scrollToTop();
  }, [showPopUp]);

  const navigate = useNavigate();
  const { isLoggedIn, role } = useContext(UserContext);
  const queryKey = useMemo(() => ["profile"], []);

  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role);
  }, [isLoggedIn, role]);
  // console.log(isTrue)

  const { data, error, isLoading } = useQuery(queryKey, fetchProfile, {
    enabled: isTrue,
  });

  const handleShowPopUp = () => {
    setShowPopUp(!showPopUp);
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const myProfile = data?.user;
  // console.log(myProfile);

  const handleProfileEdit = () => {
    navigate("/profile/edit");
  };

  const handleSignOut = () => {
    navigate("/logout");
  };

  const token = Cookies.get("authToken");
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API}/sendmagiclink`,
          { linkSendAt },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "magic link sent successfully") {
            toast("Verification link sent successfully");
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/studentdeleteaccount`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Account deletion scheduled successfully") {
            toast("Account deletion scheduled successfully");
            Cookies.remove("authToken");
            navigate("/");
            window.location.reload();
          }
        });
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "Account already scheduled for deletion":
            toast("Account already scheduled for deletion");
            break;
          case "only role with student are allowed to delete their account":
            toast("only role with student are allowed to delete their account");
            break;
          case "Something went wrong":
            toast("Something went wrong");
            break;
          default:
            toast("something went wrong");
            break;
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {showPopUp && (
        <div
          id={styles.PopUp}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 0.14)",
            backdropFilter: showPopUp && "blur(10px)",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "250px",
              width: window.innerWidth < 768 ? "90%" : "50%",
              height: window.innerWidth > 768 ? "30rem" : "50%",
              boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 0.14)",
              borderRadius: "10px",
              background: "#fff",
              padding: "2rem",
            }}
          >
            <div>Are you sure you want to delete the account?</div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <button
                style={{
                  minWidth: "40px",
                  width: "5rem",
                  minHeight: "10px",
                  height: "2rem",
                  borderRadius: "5px",
                  backgroundColor: "Red",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onClick={handleDelete}
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
                onClick={handleShowPopUp}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Profileheading}>
            <p>My Profile</p>
          </div>
          <div className={styles.Profile_details}>
            <div className={styles.profile_image}>
              <div className={styles.image}>
                <img src={myProfile?.profilepic} alt="profileimage" />
              </div>
              <div className={styles.profile}>{myProfile?.name}&apos;s Profile</div>
            </div>
            <div className={styles.Student_details}>
              <div className={styles.heading}>Profile Details</div>
              <div className={styles.details_section}>
                <div className={styles.details_about}>
                  <div className={styles.right_section}>Name</div>
                  {role === "student" && myProfile?.designation === "Student" && (
                    <div className={styles.right_section}>Scholar ID</div>
                  )}
                  <div className={styles.right_section}>Email</div>
                  {(role === "student" || role === "supervisor" || role === "warden") && (
                    <div className={styles.right_section}>Hostel</div>
                  )}
                  {role === "student" && myProfile?.designation === "Student" && (
                    <div className={styles.right_section}>Room No.</div>
                  )}
                  <div className={styles.right_section}>Phone</div>
                </div>

                <div className={styles.details_info}>
                  <div className={styles.left_section}>{myProfile?.name}</div>
                  {role === "student" && myProfile?.designation === "Student" && (
                    <div className={styles.left_section}>{myProfile?.scholarID}</div>
                  )}

                  <div className={styles.left_section}>{myProfile?.email}</div>

                  {(role === "student" || role === "supervisor" || role === "warden") && (
                    <div className={styles.left_section}>{myProfile?.hostel}</div>
                  )}
                  {role === "student" && myProfile?.designation === "Student" && (
                    <div className={styles.left_section}>{myProfile?.room}</div>
                  )}

                  <div className={styles.left_section}>{myProfile?.phone}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_section}>
            <div>
              <button
                type="button"
                aria-label="Edit Profile"
                className={styles.Editprofile}
                onClick={handleProfileEdit}
              >
                Edit Profile
              </button>
            </div>
            <div>
              <button
                type="button"
                aria-label="Signout"
                className={styles.Signout}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>

            <div>
              <button
                style={{ display: myProfile?.isVerified === true ? "none" : "block" }}
                type="button"
                aria-label="Signout"
                className={styles.Signout}
                onClick={handleVerify}
              >
                Send Email verification link
              </button>
            </div>

            <div>
              {myProfile?.deleteAccount === "no" && role === "student" && (
                <button
                  type="button"
                  aria-label="Signout"
                  onClick={handleShowPopUp}
                  className={styles.Signout}
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
