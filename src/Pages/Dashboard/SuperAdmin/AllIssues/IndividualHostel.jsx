/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
// import { fetchAllIssuesHostelWise } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualHostelIssue";
import styles from "../AllSignups/Style.module.scss";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
// open issue
const IndividualHostel = () => {
  const { hostel } = useParams();
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = `${hostel} open issues | Vyatha`;
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [hostel, role, navigate]);
  const queryKey = useMemo(() => ["complaints"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role === "superadmin");
  }, [isLoggedIn, role]);
  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    enabled: isTrue,
  });

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const allHostelSpecificIssues = data?.AllRegissues?.filter(
    (issue) => issue.hostel === hostel && issue.isSolved === false
  );

  return (
    <div className={styles.top}>
      <h1>
        {hostel}&apos;s open issues({allHostelSpecificIssues?.length}) :{" "}
      </h1>

      {allHostelSpecificIssues?.map((item) => {
        return (
          <main>
            <Link to={`/open/superadmin/issue/${item._id}`}>
              {" "}
              <h3>{item.title}</h3>
            </Link>
            <br />
            <hr />
          </main>
        );
      })}
    </div>
  );
};

export default IndividualHostel;
