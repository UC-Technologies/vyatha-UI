/* eslint-disable no-console */
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import FileBase64 from "react-file-base64";
import styles from "./ComplaintForm.module.scss";
import { UserContext } from "../../Context/Provider";
import Captcha from "../../Components/Shared/CaptchaComponent/Captcha";
import { formattedDate } from "../../Components/Lib/GetDate";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";
// import Captcha from '../../Components/Shared/CaptchaComponent/Captcha'
// TODO: instead of base64, store the complaint image, profile photo in cloudinary api. this will improve the performance of the webapp

// todo: currently there is separate button for image upload and complaint registration. make sure upload starts as soon as user select the file

const ComplaintForm = () => {
  useEffect(() => {
    document.title = "Complaint Form | Vyatha";
  }, []);
  const IssueCreatedAt = formattedDate;
  const navigate = useNavigate();
  const { isLoggedIn, role, profile, captchaVerified } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/auth/login");
      return;
    }

    if (role !== "student") {
      navigate("/dashboard");
      return;
    }

    if (profile?.user?.isVerified === false) {
      toast("you must verify your email first");
      navigate("/dashboard");
      return;
    }

    if (profile?.user?.idcard === "") {
      toast("you must upload your id card first");
      navigate("/dashboard");
    }
  }, [
    isLoggedIn,
    navigate,
    profile?.user?.designation,
    role,
    profile?.user?.isVerified,
    profile?.user?.idcard,
  ]);
  const [formData, setFormData] = useState({
    category: "LAN",
    description: "",
    title: "",
  });
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingComplaintImg, setUploadingComplaintImg] = useState();
  const [hasComplaintRegistered, setHasComplaintRegistered] = useState(false);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  function handleDragOver(e) {
    // console.log("dragover");
    e.preventDefault();
  }

  function handleDrop(e) {
    // console.log('drop');
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const { name } = file;
      setFormData({
        ...formData,
        photo: name,
      });
    }
  }

  const token = Cookies.get("authToken");

  // complaint img uploader function
  const ifUploadImageButtonIsDisabled = useMemo(() => {
    return Boolean(image);
  }, [image]);
  // console.log("ifUploadImageButtonIsDisabled", ifUploadImageButtonIsDisabled);

  useEffect(() => {
    if (image) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInBytes = 500 * 1024;

      if (!allowedTypes.includes(image.type)) {
        toast.error("Only JPEG/JPG/PNG file types are allowed.");
        setImage("");
        return;
      }

      if (image.size > maxSizeInBytes) {
        toast.error("Complaint Image size exceeds 500KB limit");
        setImage("");
        return;
      }

      const complaintData = new FormData();
      complaintData.append("file", image);
      complaintData.append("upload_preset", import.meta.env.VITE_REACT_APP_UPLOADPRESET);
      complaintData.append("cloud_name", import.meta.env.VITE_REACT_APP_cloud_name);

      const uploagComplaintImageFunc = async () => {
        try {
          setUploadingComplaintImg(true);
          await fetch(import.meta.env.VITE_REACT_APP_cloudinaryapilink, {
            method: "post",
            body: complaintData,
          })
            .then((resp) => resp.json())
            .then((data) => {
              setPhoto(data.url);
              setImage("");
              setImagePreview(data.url);
              // console.log(photo);
            });
        } catch (eee) {
          console.error(eee);
        } finally {
          setUploadingComplaintImg(false);
        }
      };
      uploagComplaintImageFunc();
    }
  }, [image]);

  const uploadImage = async () => {
    if (!image) {
      toast.error("Select Complaint image to upload.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 500 * 1024;

    if (!allowedTypes.includes(image.type)) {
      toast.error("Only JPEG/JPG/PNG file types are allowed.");
      setImage("");
      return;
    }

    if (image.size > maxSizeInBytes) {
      toast.error("Complaint Image size exceeds 500KB limit");
      setImage("");
      return;
    }

    const complaintData = new FormData();
    complaintData.append("file", image);
    complaintData.append("upload_preset", import.meta.env.VITE_REACT_APP_UPLOADPRESET);
    complaintData.append("cloud_name", import.meta.env.VITE_REACT_APP_cloud_name);

    try {
      setUploadingComplaintImg(true);
      await fetch(import.meta.env.VITE_REACT_APP_cloudinaryapilink, {
        method: "post",
        body: complaintData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setPhoto(data.url);
          setImage("");
          setImagePreview(data.url);
          // console.log(photo);
        });
    } catch (eee) {
      console.error(eee);
    } finally {
      setUploadingComplaintImg(false);
    }
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();

    if (captchaVerified === false) {
      toast("Verify Captcha first");
      return;
    }
    setCheck(true);
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API}/createissue`,
          {
            description: formData.description,
            category: formData.category,
            title: formData.title,
            photo,
            IssueCreatedAt,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue registered successfully") {
            toast("Complaint Registered Successfully");
            // navigate("/dashboard");
            // window.location.reload();
            setFormData({
              category: "",
              description: "",
              title: "",
            });
            setPhoto("");
            setHasComplaintRegistered(true);
          }
        });
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "You must verify your email to submit an issue":
            toast("You must verify your email to submit an issue");
            break;
          case "Please provide title, description and photo":
            toast("Please provide title, description, category and photo");
            break;
          case "Only student can file an issue":
            toast("Only student can file an issue");
            break;
          case "Something went wrong on the server side":
            toast("Something went wrong on the server side");
            break;
          default:
            toast("Something went wrong");
            break;
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);

  const validateTitle = useCallback(() => {
    const title = document.getElementById("title")?.value;
    if (title.length === 0) {
      setValidTitle(false);
      setErrors((prev) => ({
        ...prev,
        title: "Title is required",
      }));
    } else setValidTitle(true);
  }, []);

  const validateDesc = useCallback(() => {
    const description = document.getElementById("description")?.value;
    if (description.length === 0) {
      setValidDesc(false);
      setErrors((prev) => ({
        ...prev,
        desc: "Description is required",
      }));
    } else setValidDesc(true);
  }, []);

  const validateForm = useCallback(() => {
    validateTitle();
    validateDesc();
    return validTitle && validDesc;
  }, [validTitle, validDesc, validateDesc, validateTitle]);

  if (hasComplaintRegistered) {
    return (
      <main>
        <Navbar />
        <main id={styles.mainbodyafterreg}>
          <h4>
            Your Complaint has been succesfully Received by the Supervisor. Please check
            the dashboard for regular updates
          </h4>
          <div>
            <a href={`/${role}/allcomplaints`}>Click here to go to all complaints page</a>
          </div>
        </main>
        <Footer />
      </main>
    );
  }

  return (
    <div className={styles.ComplaintForm}>
      <div className={styles.Title}>Complaint form</div>

      <div className={styles.CForm}>
        <form className={styles.ComplaintForm}>
          <div
            className={`${styles.form_group} ${
              check && !validTitle ? styles.error : null
            }`}
          >
            <input
              type="text"
              id="title"
              value={formData.title}
              name="Title"
              onChange={(e) => {
                handleInput(e);
                validateTitle();
              }}
              required
            />
            <label htmlFor="title">Title of the Issue</label>
            <span>{errors.title}</span>
          </div>
          <div
            className={`${styles.form_group} ${
              check && !validDesc ? styles.error : null
            }`}
          >
            <textarea
              type="text"
              id="description"
              value={formData.description}
              name="description"
              onChange={(e) => {
                handleInput(e);
                validateDesc();
              }}
              autoComplete="off"
              rows="5"
              cols="40"
              required
            />
            <label htmlFor="description">Description of the Issue</label>
            <span>{errors.desc}</span>
          </div>
          <div className={styles.form_group}>
            <select
              value={formData.category}
              id="category"
              onChange={handleInput}
              style={{ cursor: "pointer" }}
            >
              <option value="" id="category" name="Category">
                LAN
              </option>
              <option id="category" name="Category">
                Electricity
              </option>
              <option id="category" name="Category">
                Water Issue
              </option>
              <option id="category" name="Category">
                Roommate issue
              </option>
            </select>
            <label htmlFor="category">Category</label>
          </div>
          {/* <div  className={styles.Uploadyourphoto}>
          <p>Upload Your Photo</p>
            </div> */}
          <div className={styles.photoUpload}>
            {/* <p>Upload Your Photo</p> */}
            <div className={styles.twodiv1}>
              <div className={styles.Uploadyourphoto}>
                <div>
                  {!photo
                    ? "Upload Complaint Photo(max: 500KB jpg, jpeg, png files only)"
                    : "Photo uploaded"}
                </div>
              </div>
              <div
                // className={styles.photoupload_inner}
                className={`${styles.photoupload_inner} ${
                  imagePreview === null ? styles.fullSize : styles.fixedImageArea
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* <p>Upload Your Photo</p> */}
                {!photo && (
                  <img
                    src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694535132/UC%20VYATHA/Frame_58066_1_nnkr62.jpg?_s=public-apps"
                    alt=""
                    draggable="true"
                    onDragStart={(e) => e.preventDefault()}
                  />
                )}

                <div className={styles.photouploadcontent}>
                  <span className={styles.Dragdrop}>
                    {!photo ? "Drag and Drop File" : "Photo uploaded"}
                  </span>
                  {!photo && <span className={styles.or}>-OR-</span>}
                </div>

                {!uploadingComplaintImg && !photo && (
                  <label
                    id="Browsebutton"
                    style={imagePreview ? { width: "150px", height: "50px" } : {}}
                  >
                    BROWSE
                    {/* upload image button */}
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                  </label>
                )}

                {ifUploadImageButtonIsDisabled && (
                  <button
                    id={styles.uploadImageid}
                    style={{ cursor: uploadingComplaintImg ? "not-allowed" : "pointer" }}
                    disabled={uploadingComplaintImg}
                    onClick={uploadImage}
                  >
                    {uploadingComplaintImg ? "Uploading..." : "Upload Complaint Image"}
                  </button>
                )}
              </div>
            </div>

            {imagePreview && (
              <div className={styles.imagePreview}>
                {/* <p>Image Preview:</p> */}
                <img style={{ pointerEvents: "none" }} src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div style={{ width: "20rem" }}>{captchaVerified === false && <Captcha />}</div>

          <div style={{ marginTop: "2vw" }} className={styles.captcha}>
            <button
              className={styles.button}
              disabled={submitting || uploadingComplaintImg}
              style={{
                cursor: submitting || uploadingComplaintImg ? "not-allowed" : "pointer",
                opacity: submitting || uploadingComplaintImg ? "0.5" : "1",
                marginTop: "2vw",
              }}
              onClick={handleIssueSubmit}
              type="submit"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ComplaintForm;
