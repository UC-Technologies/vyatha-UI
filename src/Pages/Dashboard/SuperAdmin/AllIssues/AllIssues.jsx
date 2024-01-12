/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
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

  const { data, error, isLoading } = useQuery("allIssues", fetchAllIssues, {
    refetchOnWindowFocus: "always",
    enabled: isLoggedIn,
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
