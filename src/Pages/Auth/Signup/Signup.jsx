import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { UserContext } from "../../../Context/Provider";
import styles from "./Signup.module.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
    document.title = "Signup | Vyatha";
  }, [isLoggedIn, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const phone = document.getElementById("phone")?.value;
    const password = document.getElementById("pass")?.value;
    const cpassword = document.getElementById("passconf")?.value;
    const hostel = document.getElementById("hostel")?.value;
    const room = document.getElementById("room")?.value;
    const scholarID = document.getElementById("scholar")?.value;
    const designation = selects;
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
    register();
  };

  const [selects, setSelects] = useState("Student");
  const ref = useRef(null);

  useEffect(() => {
    if (selects === "Student") {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }, [selects]);

  return (
    <div className={styles.maindiv}>
      <h1 id={styles.details_heading}>Enter your Details</h1>
      <form action="">
        <div className={styles.form}>
          <input type="text" placeholder=" " className={styles.nameinput} id="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.form}>
          <input type="email" placeholder=" " className={styles.nameinput} id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.form}>
          <input type="number" placeholder=" " className={styles.nameinput} id="phone" />
          <label htmlFor="phone">Phone</label>
        </div>

        <div className={styles.form}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={styles.nameinput}
            id="pass"
          />
          <label htmlFor="pass">Password</label>
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

        <div className={styles.form}>
          <input
            type="password"
            placeholder=" "
            className={styles.nameinput}
            id="passconf"
          />
          <label htmlFor="passconf">Confirm Password</label>
        </div>
        <div className={styles.designation}>
          <select value={selects} onChange={(e) => setSelects(e.target.value)}>
            <option>Student</option>
            <option>Warden</option>
            <option>Supervisor</option>
            <option>Dean</option>
          </select>
        </div>
        <div className={styles.form} ref={ref}>
          <input
            type="number"
            placeholder=" "
            className={styles.nameinput}
            id="scholar"
          />
          <label htmlFor="scholar">Scholar ID</label>
        </div>
        {selects !== "Dean" && (
          <div className={styles.designation}>
            <select id="hostel">
              <option value="">BH1</option>
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
          className={styles.form}
          style={{ display: selects === "Student" ? "block" : "none" }}
        >
          <input type="number" placeholder=" " className={styles.nameinput} id="room" />
          <label htmlFor="scholar">Room Number</label>
        </div>

        <button
          id={styles.btn_signup}
          style={{ cursor: "pointer" }}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <Link id={styles.already_account_login} to="/auth/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
