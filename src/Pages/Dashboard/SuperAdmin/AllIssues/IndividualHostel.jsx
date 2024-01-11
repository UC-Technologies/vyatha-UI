/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import { fetchAllIssuesHostelWise } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualHostelIssue";
import styles from "../AllSignups/Style.module.scss";
import Loading from "../../../../Components/Shared/Loading/loading";
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

  const { data, error, isLoading, isFetching } = useQuery(
    "allIssuesHostelWise",
    () => fetchAllIssuesHostelWise({ hostel }),
    { refetchOnWindowFocus: "always", enabled: isLoggedIn }
  );

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return { Loading };
  }

  const allHostelSpecificIssues = data?.allHostelSpecificIssues;
  // console.log(allHostelSpecificIssues)
  return (
    <div className={styles.top}>
      <h1>{hostel}&apos;s open issues : </h1>
      {allHostelSpecificIssues?.map((item) => {
        return (
          <main>
            <Link to={`/superadmin/issue/${item._id}`}>
              {" "}
              <h3>{item.description}</h3>
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
