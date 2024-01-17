import React, { useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/Provider";
import { fetchAllDeletedAccounts } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/DeletedAccounts";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import styles from "./Style.module.scss";

const AllDeletedAccounts = () => {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    document.title = "All Deleted Accounts | Vyatha";
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);
  const queryKey = useMemo(() => ["allDeletedAccounts"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role === "superadmin");
  }, [isLoggedIn, role]);
  const { data, error, isLoading } = useQuery(queryKey, fetchAllDeletedAccounts, {
    enabled: isTrue,
  });

  const deltedAccountsData = data?.allDeletedAccounts;
  // console.log(deltedAccountsData)
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.top}>
      <h1>All Deleted Accounts({deltedAccountsData?.length})</h1>
      {deltedAccountsData?.length > 0 &&
        deltedAccountsData?.map((item) => {
          return (
            <div>
              <div className={styles.card__header}>
                <h4>{item?.email}</h4>

                <hr />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AllDeletedAccounts;
