/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../../Context/Provider";
import { fetchAllDeletedAccounts } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/DeletedAccounts";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import styles from "./Style.module.scss";

const ScheduledAccounts = () => {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    document.title = "Scheduled Accounts | Vyatha";
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);
  const queryKey = useMemo(() => ["allDeletedAccounts"], []);
  const { data, error, isLoading } = useQuery(queryKey, fetchAllDeletedAccounts, {
    refetchOnWindowFocus: false,
    enabled: isLoggedIn,
    retry: 0,
    retryDelay: 100000,
  });

  const scheduledAccountsData = data?.allScheduledAccounts;

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className={styles.top}>
      <h1>Scheduled Accounts({scheduledAccountsData?.length})</h1>
      {scheduledAccountsData?.length > 0 &&
        scheduledAccountsData?.map((item) => {
          return (
            <div>
              <div className={styles.card__header}>
                <Link to={`/profile/${item?._id}`}>
                  <h4>{item?.email}</h4>
                </Link>
                <hr />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ScheduledAccounts;
