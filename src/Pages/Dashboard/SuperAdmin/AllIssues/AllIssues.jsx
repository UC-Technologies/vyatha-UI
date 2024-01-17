/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../../Context/Provider";
import { fetchAllIssues } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/AllIssues";
import styles from "../AllSignups/Style.module.scss";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const AllIssues = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "All Issues | Vyatha";

    if (isLoggedIn === false) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);
  const queryKey = useMemo(() => ["allIssues"], []);
  const { data, error, isLoading } = useQuery(queryKey, fetchAllIssues, {
    refetchOnWindowFocus: false,
    enabled: isLoggedIn,
    retry: 0,
    retryDelay: 100000,
  });
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }
  // console.log(data?.AllRegissues)
  const Issues = data?.AllRegissues;
  return (
    <main className={styles.top}>
      <h1>All Issues({Issues?.length})</h1>
      {Issues?.map((item) => {
        return (
          <div key={item._id}>
            <Link to={`/superadmin/issue/${item._id}`}>
              {" "}
              <h3>Title: {item.title}</h3>
            </Link>
            <hr />
          </div>
        );
      })}
    </main>
  );
};

export default AllIssues;
