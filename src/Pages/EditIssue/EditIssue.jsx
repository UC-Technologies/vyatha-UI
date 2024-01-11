/* eslint-disable no-console */
import { useState, useEffect, useContext, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import FileBase64 from "react-file-base64";
import styles from "../RegisterComplaint/ComplaintForm.module.scss";
import { UserContext } from "../../Context/Provider";
import Captcha from "../../Components/Shared/CaptchaComponent/Captcha";
import { fetchIndividualIssue } from "../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import Skeleton from "../../Components/Shared/Loading/Skeletion";
// import Captcha from '../../Components/Shared/CaptchaComponent/Captcha'

const EditIssue = () => {
  const { issueID } = useParams();
  const issueId = issueID;

  const navigate = useNavigate();
  const { isLoggedIn, role, profile, captchaVerified, setCaptchaVerified } =
    useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
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
  const { data, isLoading } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { refetchOnWindowFocus: "always", enabled: isLoggedIn }
  );

  useEffect(() => {
    document.title = `Edit ${data?.issue?.title} | Vyatha`;
  }, [data?.issue?.title]);

  const issueData = data?.issue;

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
    }
  }, [issueData]);

  const [photo, setPhoto] = useState("");
  const handleImgChange = (base64) => {
    setPhoto(base64);
  };

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

  if (!issueData) return null;
  if (isLoading) return <Skeleton />;
  return (
    <div className={styles.ComplaintForm}>
      <div className={styles.Title}>{data?.issue?.title}</div>

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
            <p>Upload Your Photo</p>
            <div
              className={styles.photoupload_inner}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694535132/UC%20VYATHA/Frame_58066_1_nnkr62.jpg?_s=public-apps"
                alt=""
                draggable="true"
                onDragStart={(e) => e.preventDefault()}
              />
              <div className={styles.photouploadcontent}>
                <span className={styles.Dragdrop}>Drag and Drop File</span>
                <span className={styles.or}>-OR-</span>
              </div>

              <label id="Browsebutton">
                BROWSE
                {/* <input
                  type="file"
                  name="Imagefile"
                  id="imagebrowse"
                  
                /> */}
                <FileBase64
                  id="imagebrowse"
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
              </label>
            </div>
          </div>

          <div>{captchaVerified === false && <Captcha />}</div>

          <div style={{ marginTop: "2vw" }} className={styles.captcha}>
            <button
              disabled={submitting}
              style={{
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? "0.5" : "1",
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
