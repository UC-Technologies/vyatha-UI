/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import styles from "../AllSignups/Style.module.scss";
const IndividualIssue = () => {
  const { _id } = useParams();
  const issueId = _id;
  const { isLoggedIn, role } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "All Issues | Vyatha";

    if (isLoggedIn === false) {
      navigate("/auth");
    }

    if (role !== "superadmin") {
      navigate("/");
    }
  }, [isLoggedIn, navigate, role]);

  const { data, error, isLoading, isFetching } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { refetchOnWindowFocus: "always" }
  );

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  console.log(typeof data?.issue?.IssueForwardedToDsw);
  const issueData = data?.issue;
  return (
    <main className={styles.top}>
      {issueData && (
        <main>
          <h3>Name of filer: {issueData?.name}</h3>
          <h3>otherID: {issueData?.oterID}</h3>
          <h3>Email of filer: {issueData?.email}</h3>
          <h3>ScholarID of filer: {issueData?.scholarID}</h3>
          <h3>hostel of filer: {issueData?.hostel}</h3>
          <h3>room of filer: {issueData?.room}</h3>
          <h3>title: {issueData?.title}</h3>
          <h3>description: {issueData?.description}</h3>
          <h3>category: {issueData?.category}</h3>
          <div>
            <img src={issueData?.photo} alt="" />
          </div>
          <h3>Forwarded to : {issueData?.forwardedTo}</h3>
          <h3>IssueCreatedAt : {issueData?.IssueCreatedAt}</h3>
          <h3>IssueEditedAt : {issueData?.IssueEditedAt}</h3>
          <h3>
            IssueForwardedAtToSupervisor : {issueData?.IssueForwardedAtToSupervisor}
          </h3>
          <h3>isSolved : {issueData?.isSolved}</h3>
          <h3>solvedAt : {issueData?.solvedAt}</h3>
          <h3>isClosed : {issueData?.isClosed}</h3>
          {/* {issueData?.IssueForwardedToDsw && <h3>IssueForwardedToDsw (time) : {issueData?.IssueForwardedToDsw[0]}</h3>} */}
          <br />
          <hr />
        </main>
      )}
    </main>
  );
};

export default IndividualIssue;
