import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { UserContext } from "../../../Context/Provider";
import styles from "./Signup.module.scss";
import Captcha from "../../../Components/Shared/CaptchaComponent/Captcha";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, captchaVerified } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
    document.title = "Signup | Vyatha";
  }, [isLoggedIn, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaVerified === false) {
      toast("Verify captcha first");
      return;
    }
    setCheck(true);
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const phone = document.getElementById("phone")?.value;
    const password = document.getElementById("pass")?.value;
    const cpassword = document.getElementById("passconf")?.value;
    const hostel = document.getElementById("hostel")?.value;
    const room = document.getElementById("room")?.value;
    const scholarID = document.getElementById("scholar")?.value;
    const designation = selects;
    // // captcha things goes below
    // const userResponseInt = Number(userResponse);
    // if (userResponseInt === Answer) {
    //   toast("Correct")
    //   generateCaptcha();
    // } else {
    //   toast("Invalid Captcha")
    //   generateCaptcha();
    // }

    const register = async () => {
      try {
        await axios
          .post(`${import.meta.env.VITE_REACT_APP_API}/signup`, {
            name,
            email,
            phone,
            password,
            cpassword,
            hostel,
            room,
            designation,
            scholarID,
          })
          .then((response) => {
            toast(response.data.message);
            setTimeout(() => {
              navigate("/auth/login");
            }, [3000]);
          });
      } catch (error) {
        if (error.response) {
          switch (error.response.data.error) {
            case "Please fill all required fields":
              toast("Please fill all required fields");
              break;
            case "Signup with this email already exists":
              toast("Signup with this email already exists");
              break;
            case "Password should not be less than 8 characters":
              toast("Password should not be less than 8 characters");
              break;
            case "Passwords must match":
              toast("Passwords must match");
              break;
            case "missing scholarID":
              toast("missing scholarID");
              break;
            case "Invalid designation":
              toast("Invalid designation");
              break;
            case "Something went wrong":
              toast("Something went wrong");
              break;
            case "email is missing":
              toast("email is missing");
              break;
            case "password missing":
              toast("password missing");
              break;

            case "Password must contain one uppercase, lowercas, digit and special character":
              toast(
                "Password must contain one uppercase, lowercas, digit and special character"
              );
              break;
            case "Password must be atleast 8 characters":
              toast("Password must be atleast 8 characters");
              break;

            case "Password must be same":
              toast("Password must be same");
              break;

            case "No space allowed in password":
              toast("No space allowed in password");
              break;

            case "Email is not valid":
              toast("Email is not valid");
              break;
            default:
              toast("Something went wrong");
          }
        }
      }
    };
    if (validateForm()) register();
  };

  const [selects, setSelects] = useState("Student");
  const ref = useRef(null);

  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfPassword, setValidConfPassword] = useState(true);
  const [validScholarID, setValidScholarID] = useState(true);
  const [validRoomNumber, setValidRoomNumber] = useState(true);
  const validateForm = () => {
    validateEmail();
    validateName();
    validatePhone();
    validatePassword();
    validateConfPassword();
    validateRoom();
    validateScholarID();
    if (selects !== "Student")
      return validEmail && validName && validPhone && validPassword && validConfPassword;
    return (
      validEmail &&
      validName &&
      validPhone &&
      validPassword &&
      validConfPassword &&
      validRoomNumber &&
      validScholarID
    );
  };
  const validateName = () => {
    const name = document.getElementById("name")?.value;
    if (name.length === 0) {
      setValidName(false);
      setErrors((prev) => ({
        ...prev,
        name: "Name is mandatory",
      }));
    } else setValidName(true);
  };
  const validateEmail = () => {
    const email = document.getElementById("email")?.value;
    if (email.length === 0) {
      setValidEmail(false);
      setErrors((prev) => ({
        ...prev,
        email: "Email is mandatory",
      }));
      return;
    }
    if (selects === "Supervisor") {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(email)) {
        setValidEmail(false);
        setErrors((prev) => ({
          ...prev,
          email: "Not a valid email",
        }));
      } else setValidEmail(true);
    } else if (!/^[a-zA-Z0-9._-]+@([a-z]+\.)?nits\.ac\.in$/.test(email)) {
      setValidEmail(false);
      setErrors((prev) => ({
        ...prev,
        email: "Only institute email id is allowed",
      }));
    } else setValidEmail(true);
  };
  const validatePhone = () => {
    const phone = document.getElementById("phone")?.value;
    if (phone.length !== 10) {
      setValidPhone(false);
      if (phone.length === 0) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number is mandatory",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: "Enter a valid phone number",
        }));
      }
    } else setValidPhone(true);
  };
  const validatePassword = () => {
    const password = document.getElementById("pass")?.value;
    if (password.length === 0) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password is mandatory",
      }));
    } else if (/\s/.test(password)) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password must not have whitespace",
      }));
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()])/.test(password)) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Include a digit, lower & uppercase letter, & special character",
      }));
    } else if (password.length < 8) {
      setValidPassword(false);
      setErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 8 characters",
      }));
    } else setValidPassword(true);
  };
  const validateConfPassword = () => {
    const password = document.getElementById("pass")?.value;
    const cpassword = document.getElementById("passconf")?.value;
    if (password !== cpassword) {
      setValidConfPassword(false);
      setErrors((prev) => ({
        ...prev,
        confpassword: "Passwords don't match",
      }));
    } else setValidConfPassword(true);
  };
  const validateScholarID = () => {
    const scholarID = document.getElementById("scholar")?.value;
    if (scholarID.length !== 7) {
      setValidScholarID(false);
      if (scholarID.length === 0) {
        setErrors((prev) => ({
          ...prev,
          scholarID: "Scholar ID is mandatory",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          scholarID: "Enter a valid Scholar ID",
        }));
      }
    } else setValidScholarID(true);
  };
  const validateRoom = () => {
    const room = document.getElementById("room")?.value;
    if (room.length === 0) {
      setValidRoomNumber(false);
      setErrors((prev) => ({
        ...prev,
        room: "Room number is mandatory",
      }));
    } else setValidRoomNumber(true);
  };

  useEffect(() => {
    if (selects === "Student") {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
    validateForm();
  }, [selects]);

  return (
    <div className={styles.maindiv}>
      <h1 id={styles.details_heading}>Enter your Details</h1>
      <form action="">
        <div className={`${check && !validName ? styles.error : null} ${styles.form}`}>
          <input
            type="text"
            placeholder=" "
            className={styles.nameinput}
            id="name"
            onChange={validateName}
          />
          <label htmlFor="name">Name</label>
          <span>{errors.name}</span>
        </div>
        <div className={`${check && !validEmail ? styles.error : null} ${styles.form}`}>
          <input
            type="email"
            placeholder=" "
            className={styles.nameinput}
            id="email"
            onChange={validateEmail}
          />
          <label htmlFor="email">Email</label>
          <span>{errors.email}</span>
        </div>
        <div className={`${check && !validPhone ? styles.error : null} ${styles.form}`}>
          <input
            type="number"
            placeholder=" "
            className={styles.nameinput}
            id="phone"
            onChange={validatePhone}
          />
          <label htmlFor="phone">Phone</label>
          <span>{errors.phone}</span>
        </div>

        <div
          className={`${check && !validPassword ? styles.error : null} ${styles.form}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={styles.nameinput}
            id="pass"
            onChange={validatePassword}
          />
          <label htmlFor="pass">Password</label>
          <span>{errors.password}</span>
        </div>

        <div className={styles.showpassword__container}>
          <label className="labelshowpass">
            <input
              className="inputshowpass"
              type="checkbox"
              name="showPassword"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <span>Show password</span>
          </label>
        </div>

        <div
          className={`${check && !validConfPassword ? styles.error : null} ${
            styles.form
          }`}
        >
          <input
            type="password"
            placeholder=" "
            className={styles.nameinput}
            id="passconf"
            onChange={validateConfPassword}
          />
          <label htmlFor="passconf">Confirm Password</label>
          <span>{errors.confpassword}</span>
        </div>
        <div className={styles.designation}>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option>Student</option>
            <option>Warden</option>
            <option>Supervisor</option>
            <option>Dean</option>
          </select>
        </div>
        <div
          className={`${check && !validScholarID ? styles.error : null} ${styles.form}`}
          ref={ref}
        >
          <input
            type="number"
            placeholder=" "
            className={styles.nameinput}
            id="scholar"
            onChange={validateScholarID}
          />
          <label htmlFor="scholar">Scholar ID</label>
          <span>{errors.scholarID}</span>
        </div>
        {selects !== "Dean" && (
          <div className={styles.designation}>
            <select id="hostel">
              <option value="BH1">BH1</option>
              <option>BH2</option>
              <option>BH3</option>
              <option>BH4</option>
              <option>BH6</option>
              <option>BH7</option>
              <option>BH8</option>
              <option>BH9A</option>
              <option>BH9B</option>
              <option>BH9C</option>
              <option>BH9D</option>
              <option>GH1</option>
              <option>GH2</option>
              <option>GH3</option>
              <option>GH4</option>
              <option>Aryabhatt-PGH</option>
            </select>
          </div>
        )}

        <div
          className={`${check && !validRoomNumber ? styles.error : null} ${styles.form}`}
          style={{ display: selects === "Student" ? "block" : "none" }}
        >
          <input
            type="number"
            placeholder=" "
            className={styles.nameinput}
            id="room"
            onChange={validateRoom}
          />
          <label htmlFor="room">Room Number</label>
          <span>{errors.room}</span>
        </div>
        {captchaVerified === false && <Captcha />}
        <button
          id={styles.btn_signup}
          style={{ cursor: "pointer" }}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {captchaVerified === true ? (
          <a id={styles.already_account_login} href="/auth/login">
            {" "}
            Already have an account?
          </a>
        ) : (
          <Link id={styles.already_account_login} to="/auth/login">
            Already have an account?
          </Link>
        )}
      </form>
    </div>
  );
};

export default SignUp;
