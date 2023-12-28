/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import styles from "../AllSignups/Style.module.scss";
import { fetchAllClosedIssuesHostelWise } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/ClosedIssues";
// closed issue

const ClosedIssues = () => {
  const { hostel } = useParams();
  const navigate = useNavigate();
  const { role } = useContext(UserContext);

  useEffect(() => {
    document.title = `${hostel} Closed issues | Vyatha`;
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [hostel, role, navigate]);

  const { data, error, isLoading, isFetching } = useQuery(
    "allClosedIssuesHostelWise",
    () => fetchAllClosedIssuesHostelWise({ hostel }),
    { refetchOnWindowFocus: "always" }
  );

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const allHostelSpecificIssues = data?.allHostelSpecificIssues;
  // console.log(allHostelSpecificIssues)
  return (
    <div className={styles.top}>
      <h1>{hostel}&apos;s Closed issues : </h1>
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

export default ClosedIssues;
