/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Style.module.scss";
import { fetchAllAccounts } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/AllAccounts";
import { UserContext } from "../../../../Context/Provider";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const AllSignups = () => {
  useEffect(() => {
    document.title = "All Signups | Vyatha";
  }, []);

  const navigate = useNavigate();

  const { role, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);
  const queryKey = useMemo(() => ["accounts"], []);
  const { data, error, isLoading } = useQuery(queryKey, fetchAllAccounts, {
    refetchOnWindowFocus: false,
    enabled: isLoggedIn,
    retry: 0,
    retryDelay: 100000,
  });

  if (isLoading) return <Skeleton />;
  if (error) return <h1>Error fetching data</h1>;

  const all = data?.allAccounts;
  // console.log(typeof all)
  return (
    <main className={styles.top}>
      <h1>All Signups({all?.length})</h1>
      {all?.length > 0 &&
        all?.map((item) => {
          return (
            <div className={styles.card}>
              <Link to={`/profile/${item._id}`}>
                {" "}
                <h3>Email : {item.email}</h3>
              </Link>

              <hr />
              {/* <h2>Name: {item.name}</h2>
            <h3>Phone: {item.phone}</h3>
            <h3>Hostel :{item.hostel}</h3>
            <h3>Room: {item.room}</h3>
            <h3>Designation :{item.designation}</h3>
            <h3>Scholar id:{item.scholarID}</h3>
            <h3>Role: {item.role}</h3> */}
              {/* <h3>_id: {item._id}</h3> */}
              <hr />
            </div>
          );
        })}
    </main>
  );
};

export default AllSignups;
