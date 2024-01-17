/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import styles from "../AllSignups/Style.module.scss";
import { fetchAllClosedIssuesHostelWise } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/ClosedIssues";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";
// closed issue

const ClosedIssues = () => {
  const { hostel } = useParams();
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = `${hostel} Closed issues | Vyatha`;
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [hostel, role, navigate]);
  const queryKey = useMemo(() => ["allClosedIssuesHostelWise"], []);
  const { data, error, isLoading } = useQuery(
    queryKey,
    () => fetchAllClosedIssuesHostelWise({ hostel }),
    { refetchOnWindowFocus: false, enabled: isLoggedIn, retry: 0, retryDelay: 100000 }
  );

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const allHostelSpecificIssues = data?.allHostelSpecificIssues;
  // console.log(allHostelSpecificIssues)
  return (
    <div className={styles.top}>
      <h1>
        {hostel}&apos;s Closed issues({allHostelSpecificIssues?.length}) :{" "}
      </h1>
      {allHostelSpecificIssues?.map((item) => {
        return (
          <main>
            <Link to={`/superadmin/issue/${item._id}`}>
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
