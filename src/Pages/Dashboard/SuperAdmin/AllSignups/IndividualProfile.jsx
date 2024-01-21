/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserContext } from "../../../../Context/Provider";
// import { individualProfile } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualProfile";
import styles from "./Style.module.scss";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import { fetchAllAccounts } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/AllAccounts";

const IndividualProfile = () => {
  const [elevating, setElevating] = useState(false);
  const [demoting, setDemoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const { role, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);

  const { _id } = useParams();
  const queryKey = useMemo(() => ["accounts"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role === "superadmin");
  }, [isLoggedIn, role]);
  // console.log(isTrue)
  // const { data, error, isLoading } = useQuery(
  //   queryKey,
  //   () => individualProfile({ _id }),
  //   {  enabled: isTrue }
  // );
  const { data, error, isLoading } = useQuery(queryKey, fetchAllAccounts, {
    enabled: isTrue,
  });
  const all = data?.allAccounts?.find((acc) => acc._id === _id);
  useEffect(() => {
    if (all) document.title = `${all?.name} | Vyatha`;
  }, [all]);

  if (isLoading) return <Skeleton />;
  if (error) return <h1>Error fetching data</h1>;

  const token = Cookies.get("authToken");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const accountID = all?._id;
  const wrtrole =
    all?.role === "student"
      ? "promotetosupervisor"
      : all?.role === "supervisor"
      ? "promotetowarden"
      : all?.role === "warden"
      ? "promotetodsw"
      : null;

  const handleElevate = async (e) => {
    e.preventDefault();
    setElevating(true);
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
            window.location.reload();
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
          case "Something went wrong":
            toast("Something went wrong, please try again");
            break;
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          default:
            console.error(err);
            toast("something went wrong");
        }
      }
    } finally {
      setElevating(false);
    }
  };

  const handleDemote = async (e) => {
    e.preventDefault();
    setDemoting(true);
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
            window.location.reload();
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
          case "Something went wrong":
            toast("Something went wrong on the server side, please try again");
            break;
          default:
            toast("something went wrong");
        }
      }
    } finally {
      setDemoting(false);
    }
  };

  const roleElevate =
    all?.role === "student"
      ? "Promote to Supervisor"
      : all?.role === "supervisor"
      ? "Promote to Warden"
      : all?.role === "warden"
      ? "Promote to DSW"
      : null;

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleting(true);
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
            window.location.reload();
          }
        });
    } catch (edd) {
      if (edd.response) {
        switch (edd.response.data.error) {
          case "Unauthorized":
            toast("Unauthorized");
            break;
          case "User not found":
            toast("User not found");
            break;
          case "No such account exists":
            toast("No such account exists");
            break;
          case "No such deletion account control of other role exists as of now":
            toast("No such deletion account control of other role exists as of now");
            break;
          case "Not authorized to access this api":
            toast("Not authorized to access this api");
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
      setDeleting(false);
    }
  };

  if (!all) return <Skeleton />;

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

      {all?.deleteAccount === "no" && (
        <div>
          <button
            style={{ cursor: elevating ? "not-allowed" : "pointer" }}
            disabled={elevating}
            onClick={handleElevate}
          >
            {elevating ? "Elevating role..." : roleElevate}
          </button>

          <button
            style={{
              display: all?.role === "superadmin" ? "none" : "block",
              cursor: demoting ? "not-allowed" : "pointer",
            }}
            disabled={all?.role === "student" || demoting}
            onClick={handleDemote}
          >
            {demoting ? "Demoting..." : "Demote role to Student"}
          </button>
        </div>
      )}

      <button
        style={{ cursor: deleting ? "not-allowed" : "pointer" }}
        onClick={handleDeleteAccount}
        disabled={all?.role !== "student" || deleting}
      >
        {deleting ? "Deleting account..." : "Delete account"}
      </button>
    </main>
  );
};

export default IndividualProfile;
