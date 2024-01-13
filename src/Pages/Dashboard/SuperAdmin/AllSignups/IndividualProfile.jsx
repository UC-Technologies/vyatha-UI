/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserContext } from "../../../../Context/Provider";
import { individualProfile } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualProfile";
import styles from "./Style.module.scss";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const IndividualProfile = () => {
  const navigate = useNavigate();

  const { role, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);

  const { _id } = useParams();
  const { data, error, isLoading } = useQuery(
    "indiProfile",
    () => individualProfile({ _id }),
    { refetchOnWindowFocus: "always", enabled: isLoggedIn }
  );

  useEffect(() => {
    if (data) document.title = `${data?.individualProfile?.name} | Vyatha`;
  }, [data]);

  if (isLoading) return <Skeleton />;
  if (error) return <h1>Error fetching data</h1>;

  const all = data?.individualProfile;
  const token = Cookies.get("authToken");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const accountID = all?._id;
  const wrtrole =
    all.role === "student"
      ? "promotetosupervisor"
      : all.role === "supervisor"
      ? "promotetowarden"
      : all.role === "warden"
      ? "promotetodsw"
      : null;

  const handleElevate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/${wrtrole}`,
          { accountID },
          tokenConfig
        )
        .then((res) => {
          if (res.data.success === true) {
            toast("Role elevated sucessfully");
          }
        });
    } catch (err) {
      // if (err.response) {
      //     switch (err.response.data.error) {
      //         case "Not authorized to access this api":
      //             toast("Not authorized to access this api")
      //             break
      //         default:
      //             toast("something went wrong")
      //     }
      // }
      console.error(err);
    }
  };

  const handleDemote = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API}/demoterole`,
          { accountID },
          tokenConfig
        )
        .then((res) => {
          if (res.data.message === "Role demoted successfully") {
            toast("Role demoted to student successfully");
          }
        });
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "No such account exists":
            toast("No such account exists");
            break;
          case "No such role exists":
            toast("No such role exists");
            break;
          case "Not authorized to access this api":
            toast("Not authorized to access this api");
            break;
          default:
            toast("something went wrong");
        }
      }
    }
  };

  const roleElevate =
    all.role === "student"
      ? "Promote to Supervisor"
      : all.role === "supervisor"
      ? "Promote to Warden"
      : all.role === "warden"
      ? "Promote to DSW"
      : null;

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`${import.meta.env.VITE_REACT_APP_API}/deleteaccount`, {
          data: { accountID },
          ...tokenConfig,
        })
        .then((res) => {
          if (res.data.message === "account deleted successfully") {
            toast("account deleted successfully");
            navigate("/superadmin/allsignups");
          }
        });
    } catch (edd) {
      console.error(edd);
    }
  };

  return (
    <main className={styles.top}>
      <h1>Individual Profile</h1>
      <h2>Name: {all?.name}</h2>
      <h3>Email: {all?.email}</h3>
      <h3>Phone: {all?.phone}</h3>
      <h3>Hostel: {all?.hostel}</h3>
      <h3>Room: {all?.room}</h3>
      <h3>Designation: {all?.designation}</h3>
      <h3>Scholar ID: {all?.scholarID}</h3>
      <h3>Role: {all?.role}</h3>
      <h3>DeleteAccount: {all?.deleteAccount}</h3>

      <button onClick={handleElevate}>{roleElevate}</button>

      <button
        style={{ display: all.role === "superadmin" ? "none" : "block" }}
        disabled={all.role === "student"}
        onClick={handleDemote}
      >
        Demote role to Student
      </button>

      <button onClick={handleDeleteAccount} disabled={all.role !== "student"}>
        Delete account
      </button>
    </main>
  );
};

export default IndividualProfile;
