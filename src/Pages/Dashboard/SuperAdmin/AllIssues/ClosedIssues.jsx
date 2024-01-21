/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import styles from "../AllSignups/Style.module.scss";
// import { fetchAllClosedIssuesHostelWise } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/ClosedIssues";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
import { fetchComplaints } from "../../../../Components/ReactQuery/Fetchers/AllComplaints";
// closed issue

const ClosedIssues = () => {
  const { hostel } = useParams();
  // console.log(hostel)
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = `${hostel} Closed issues | Vyatha`;
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [hostel, role, navigate]);
  // const queryKey = useMemo(() => ["allClosedIssuesHostelWise"], []);
  const queryKey = useMemo(() => ["complaints"], []);
  const isTrue = useMemo(() => {
    return Boolean(isLoggedIn && role === "superadmin");
  }, [role, isLoggedIn]);
  const { data, error, isLoading } = useQuery(queryKey, fetchComplaints, {
    refetchOnWindowFocus: false,
    enabled: isTrue,
  });

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }
  // console.log(data)
  const allHostelSpecificIssues = data?.AllClosedissues?.filter(
    (issue) => issue.hostel === hostel
  );

  if (!allHostelSpecificIssues) {
    return <Skeleton />;
  }

  return (
    <div className={styles.top}>
      <h1>
        {hostel}&apos;s Closed issues({allHostelSpecificIssues?.length}) :{" "}
      </h1>
      {allHostelSpecificIssues?.map((item) => {
        return (
          <main>
            <Link to={`/closed/superadmin/issue/${item._id}`}>
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

export default ClosedIssues;
