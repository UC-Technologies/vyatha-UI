/* eslint-disable no-console */
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import styles from "../RegisterComplaint/ComplaintForm.module.scss";
import { UserContext } from "../../Context/Provider";
import Captcha from "../../Components/Shared/CaptchaComponent/Captcha";
import { fetchIndividualIssue } from "../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import Skeleton from "../../Components/Shared/Loading/Skeletion";
import { formattedDate } from "../../Components/Lib/GetDate";
// import Captcha from '../../Components/Shared/CaptchaComponent/Captcha'

const EditIssue = () => {
  const editedAt = formattedDate;
  const { issueID } = useParams();
  const issueId = issueID;

  const navigate = useNavigate();
  const { isLoggedIn, role, profile, captchaVerified, setCaptchaVerified } =
    useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);

  // for new photo that user will provide
  const [newComplaintPhoto, setNewComplaintPhoto] = useState("");
  const [uploadingNewComplaintPhoto, setUploadingNewComplaintPhoto] = useState();
  const [hasUploadedFinished, setHasUploadedFinished] = useState(false);
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/auth/login");
    }

    if (role !== "student") {
      navigate("/dashboard");
    }

    if (profile?.user?.isVerified === false) {
      toast("you must verify your email first");
      navigate("/dashboard");
    }

    if (profile?.user?.idcard === "") {
      toast("you must upload your id card first");
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate, role, profile?.user?.isVerified, profile?.user?.idcard]);

  // filling the inputs using the fetched data
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role === "student");
  }, [isLoggedIn, role]);
  const queryKey = useMemo(() => ["oneIssue"], []);
  const { data, isLoading } = useQuery(
    queryKey,
    () => fetchIndividualIssue({ issueId }),
    { enabled: isTrue }
  );

  useEffect(() => {
    document.title = `Edit ${data?.issue?.title} | Vyatha`;
  }, [data?.issue?.title]);

  const issueData = data?.issue;

  useEffect(() => {
    if (issueData?.isSolved === true) {
      toast("Issue is Solved, can't edit");
      navigate(`/dashboard`);
    }

    if (issueData?.isClosed === true) {
      toast("Issue is Closed, can't edit");
      navigate(`/dashboard`);
    }
  }, [issueData?.isSolved, issueData?.isClosed, navigate]);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    title: "",
  });

  useEffect(() => {
    if (issueData) {
      setFormData({
        category: issueData.category,
        description: issueData.description,
        title: issueData.title,
      });
      setPhoto(issueData.photo);
      // setImagePreview(issueData.photo);
    }
  }, [issueData]);

  const [photo, setPhoto] = useState("");
  // Image preview
  // const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (newComplaintPhoto) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInBytes = 500 * 1024;

      if (!allowedTypes.includes(newComplaintPhoto.type)) {
        toast.error("Only JPEG/JPG/PNG file types are allowed.");
        setNewComplaintPhoto("");
        return;
      }

      if (newComplaintPhoto.size > maxSizeInBytes) {
        toast.error("Complaint Photo size exceeds 500KB limit");
        setNewComplaintPhoto("");
        return;
      }

      const newComplaintPhotoData = new FormData();
      newComplaintPhotoData.append("file", newComplaintPhoto);
      newComplaintPhotoData.append(
        "upload_preset",
        import.meta.env.VITE_REACT_APP_UPLOADPRESET
      );
      newComplaintPhotoData.append(
        "cloud_name",
        import.meta.env.VITE_REACT_APP_cloud_name
      );

      const uploagComplaintImageFunc = async () => {
        try {
          setUploadingNewComplaintPhoto(true);
          await fetch(import.meta.env.VITE_REACT_APP_cloudinaryapilink, {
            method: "post",
            body: newComplaintPhotoData,
          })
            .then((resp) => resp.json())
            .then((responseData) => {
              setPhoto(responseData.url);
              setNewComplaintPhoto("");
              // setImagePreview(responseData.url);
              setHasUploadedFinished(true);
            });
        } catch (eeer) {
          console.error(eeer);
        } finally {
          setUploadingNewComplaintPhoto(false);
        }
      };
      uploagComplaintImageFunc();
    }
  }, [newComplaintPhoto]);

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
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/editissue`,
          {
            description: formData.description,
            category: formData.category,
            title: formData.title,
            photo,
            issueID,
            editedAt,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Issue updated successfully") {
            toast("Complaint updated successfully");
            navigate("/dashboard");
            window.location.reload();
            setFormData({
              category: "",
              description: "",
              title: "",
            });
            setPhoto("");
          }
        });
    } catch (err) {
      setCaptchaVerified(false);
      if (err.response) {
        switch (err.response.data.error) {
          case "Please edit atleast one filled":
            toast("Please edit atleast one filled");
            break;
          case "issueID missing":
            toast("issueID missing");
            break;
          case "Issue not found":
            toast("Issue not found");
            break;
          case "Not authorized to edit this issue":
            toast("Not authorized to edit this issue");
            break;
          case "Not authorized":
            toast("Not authorized");
            break;
          case "Internal Server Error":
            toast("Internal Server Error");
            break;
          case "Issue is closed, can't edit":
            toast("Issue is closed, can't edit");
            break;
          case "Issue is solved, can't edit":
            toast("Issue is solved, can't edit");
            break;
          case "no changes made":
            toast("please make some changes to edit");
            break;
          default:
            toast("Something went wrong");
            console.error(err);
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
  // console.log("photo", photo)
  if (!issueData) return null;
  if (isLoading) return <Skeleton />;
  return (
    <div className={styles.ComplaintForm}>
      <div className={styles.Title} id={styles.paddd}>
        {data?.issue?.title}
      </div>

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

          <div className={styles.photoUpload}>
            <div className={styles.twodiv1}>
              <div className={styles.Uploadyourphoto}>
                <div>
                  {hasUploadedFinished
                    ? "New Complaint Image Attached"
                    : "Attach New Complaint Photo"}
                </div>
              </div>

              {hasUploadedFinished ? (
                <div
                  className={`${styles.photoupload_inner} ${
                    photo ? styles.fullSize : styles.fixedImageArea
                  }`}
                >
                  <p>New Complaint Image Attached</p>
                </div>
              ) : (
                <div
                  className={`${styles.photoupload_inner} ${
                    photo ? styles.fullSize : styles.fixedImageArea
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {uploadingNewComplaintPhoto ? null : (
                    <img
                      src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694535132/UC%20VYATHA/Frame_58066_1_nnkr62.jpg?_s=public-apps"
                      alt=""
                      draggable="true"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  )}

                  {uploadingNewComplaintPhoto ? null : (
                    <div className={styles.photouploadcontent}>
                      <span className={styles.Dragdrop}>Drag and Drop File</span>
                      <span className={styles.or}>-OR-</span>
                    </div>
                  )}

                  {/* complaint photo */}
                  {uploadingNewComplaintPhoto ? (
                    <p>uploading...</p>
                  ) : (
                    <label id="Browsebutton">
                      BROWSE
                      <input
                        type="file"
                        onChange={(e) => setNewComplaintPhoto(e.target.files[0])}
                      ></input>
                    </label>
                  )}
                </div>
              )}
            </div>

            {photo && (
              <div className={styles.imagePreview}>
                {/* <p>Image Preview:</p> */}
                <img style={{ pointerEvents: "none" }} src={photo} alt="Preview" />
              </div>
            )}
          </div>

          <div>{captchaVerified === false && <Captcha />}</div>

          <div style={{ marginTop: "2vw" }} className={styles.captcha}>
            <button
              disabled={submitting || uploadingNewComplaintPhoto}
              className={styles.button}
              style={{
                cursor:
                  submitting || uploadingNewComplaintPhoto ? "not-allowed" : "pointer",
                opacity: submitting || uploadingNewComplaintPhoto ? "0.5" : "1",
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
export default EditIssue;
