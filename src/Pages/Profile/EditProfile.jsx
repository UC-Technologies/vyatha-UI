import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "sonner";
import axios from "axios";
import FileBase64 from "react-file-base64";
import Cookies from "js-cookie";
import styles from "./EditProfile.module.scss";
import { fetchProfile } from "../../Components/ReactQuery/Fetchers/User";
import { UserContext } from "../../Context/Provider";

const EditProfile = () => {
  useEffect(() => {
    document.title = "Edit Profile | Vyatha";
  }, []);

  const navigate = useNavigate();
  const { isLoggedIn, role } = useContext(UserContext);

  if (!isLoggedIn) {
    navigate("/auth/login");
  }

  const { data, error, isLoading, isFetching } = useQuery("profile", fetchProfile, {
    refetchOnWindowFocus: true,
  });

  const myProfile = data?.user;

  const [formData, setFormData] = useState({
    name: myProfile?.name || "",
    newpwd: "",
    cnewpwd: "",
    hostel: myProfile?.hostel || "",
    phone: myProfile?.phone || "",
    room: myProfile?.room || "",
  });
  // console.log(myProfile);

  // const [isAdmin, setIsAdmin] = useState(false);
  const [photo, setPhoto] = useState("");
  const [idcard, setIdcard] = useState("");
  const handleImgChange = (base64) => {
    setPhoto(base64);
  };

  const handleIdCardChange = (base64) => {
    setIdcard(base64);
  };

  // useEffect(() => {
  //   if (
  //     role === "supervisor" ||
  //     role === "superadmin" ||
  //     role === "dsw" ||
  //     role === "warden"
  //   ) {
  //     setIsAdmin(true);
  //   }
  // }, [role]);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  // const profilePic = document.getElementById("profile-pic");

  // const inputFile = document.getElementById("input-file");

  // inputFile.onchange = () => {
  //   profilePic.src = URL.createObjectURL(inputFile.files[0]);
  // };

  const handleProfileSave = async (e) => {
    e.preventDefault();

    const token = Cookies.get("authToken");
    const name = document.getElementById("name")?.value;
    const newpwd = document.getElementById("newpwd")?.value;
    const cnewpwd = document.getElementById("cnewpwd")?.value;
    const hostel = document.getElementById("hostel")?.value;
    const phone = document.getElementById("phone")?.value;
    const room = document.getElementById("room")?.value;

    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/editprofile`,
          { name, newpwd, hostel, phone, cnewpwd, room, photo, idcard },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Profile updated successfully") {
            toast("Profile updated successfully");
            navigate("/profile");
          }
        });
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          case "atleast one field must be filled":
            toast("atleast one field must be filled");
            break;
          case "new password and confirm new password must be same":
            toast("new password and confirm new password must be same");
            break;
          case "password must be atleast 8 characters long":
            toast("password must be atleast 8 characters long");
            break;
          case "Something went wrong":
            toast("Something went wrong");
            break;
          default:
            toast("something went wrongF");
        }
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
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
              <div className={styles.profile_main}>
                <img src={myProfile?.profilepic} alt="profileimage" id="profile-pic" />
              </div>

              <div className={styles.changeprofile}>
                <FileBase64
                  multiple={false}
                  onDone={({ base64, file }) => {
                    if (
                      (file.type === "image/png" ||
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg" ||
                        file.type === "image/webp" ||
                        file.type === "image/avif") &&
                      file.size <= 300 * 1024
                    ) {
                      handleImgChange(base64);
                    } else {
                      toast("Invalid file type or image is greater than 300KB");
                      setPhoto("");
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles.details_section}>
              <form>
                <div className={styles.details_section}>
                  <div className={styles.details_about}>
                    <div className={styles.right_section}>Name</div>
                    <div className={styles.right_section}>Password</div>
                    <div className={styles.right_section}>Confirm Password</div>
                    {role === "student" && (
                      <div className={styles.right_section}>Id Card photo</div>
                    )}
                    {role !== "dsw" && <div className={styles.right_section}>Hostel</div>}
                    {role === "student" && (
                      <div className={styles.right_section}>Room</div>
                    )}

                    <div className={styles.right_section}>Phone</div>
                  </div>

                  <div className={styles.details_fill}>
                    <div className={styles.left_section}>
                      <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.left_section}>
                      <input
                        type="password"
                        id="newpwd"
                        autoComplete="off"
                        value={formData.newpwd}
                        onChange={handleInputChange}
                        placeholder="Password"
                      />
                    </div>
                    <div className={styles.left_section}>
                      <input
                        type="password"
                        id="cnewpwd"
                        autoComplete="off"
                        value={formData.cnewpwd}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                      />
                    </div>
                    {/* id card photo */}
                    {role === "student" && (
                      <div className={styles.left_section}>
                        {" "}
                        <FileBase64
                          multiple={false}
                          onDone={({ base64, file }) => {
                            if (
                              (file.type === "image/png" ||
                                file.type === "image/jpeg" ||
                                file.type === "image/jpg" ||
                                file.type === "image/webp" ||
                                file.type === "image/avif") &&
                              file.size <= 300 * 1024
                            ) {
                              handleIdCardChange(base64);
                            } else {
                              toast("Invalid file type or image is greater than 300KB");
                              setPhoto("");
                            }
                          }}
                        />
                      </div>
                    )}

                    {role !== "dsw" && (
                      <div className={styles.left_section}>
                        <select
                          id="hostel"
                          className={styles.hostel_options}
                          defaultValue={formData.hostel}
                        >
                          <option value="Aryabhatt PG Hostel">Aryabhatt PG Hostel</option>
                          <option value="BH1">BH1</option>
                          <option value="BH2">BH2</option>
                          <option value="BH3">BH3</option>
                          <option value="BH4">BH4</option>
                          <option value="BH6">BH6</option>
                          <option value="BH7">BH7</option>
                          <option value="BH8">BH8</option>
                          <option value="BH9A">BH9A</option>
                          <option value="BH9B">BH9B</option>
                          <option value="BH9C">BH9C</option>
                          <option value="BH9D">BH9D</option>
                          <option value="GH1">GH1</option>
                          <option value="GH2">GH2</option>
                          <option value="GH3">GH3</option>
                          <option value="GH4">GH4</option>
                        </select>
                      </div>
                    )}

                    {role === "student" && (
                      <div className={styles.left_section}>
                        <input
                          type="text"
                          id="room"
                          autoComplete="off"
                          value={formData.room}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    <div className={styles.left_section}>
                      <input
                        type="text"
                        id="phone"
                        autoComplete="off"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.button_section}>
            <button
              type="button"
              aria-label="Save Profile"
              className={styles.Editprofile}
              onClick={handleProfileSave}
            >
              <div>
                <div>Save Profile</div>
              </div>
            </button>
            {/* <button
                type="button"
                aria-label="Signout"
                className={styles.Signout}
                onClick={handleSignOut}
              >
                <div>
                  <div>Sign out</div>
                </div>
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
