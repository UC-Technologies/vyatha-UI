/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Provider";
import { fetchIndividualIssue } from "../../../../Components/ReactQuery/Fetchers/SuperAdmin/IndividualIssue";
import styles from "../AllSignups/Style.module.scss";
import Skeleton from "../../../../Components/Shared/Loading/Skeletion";

const IndividualIssue = () => {
  const { _id } = useParams();
  const issueId = _id;
  const { isLoggedIn, role } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/auth");
    }

    if (role !== "superadmin") {
      navigate("/");
    }
  }, [isLoggedIn, navigate, role]);

  const { data, error, isLoading } = useQuery(
    "oneIssue",
    () => fetchIndividualIssue({ issueId }),
    { refetchOnWindowFocus: "always", enabled: isLoggedIn }
  );

  const issueData = data?.issue;
  useEffect(() => {
    document.title = `${issueData?.title} | Vyatha`;
  });

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  // console.log(typeof data?.issue?.IssueForwardedToDsw);

  // console.log( issueData?.IssueForwardedToWarden[0]);
  return (
    <main className={styles.top}>
      {issueData && (
        <main>
          <h3>Name of filer: {issueData?.name}</h3>
          <h3>otherID: {issueData?.otherID}</h3>
          <h3>Email of filer: {issueData?.email}</h3>
          <h3>ScholarID of filer: {issueData?.scholarID}</h3>
          <h3>hostel of filer: {issueData?.hostel}</h3>
          <h3>room of filer: {issueData?.room}</h3>
          <h3>title: {issueData?.title}</h3>
          <h3>description: {issueData?.description}</h3>
          <h3>category: {issueData?.category}</h3>
          <h3>Photo: </h3>
          <div id={styles.imgholder}>
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
          <h3>IssueForwarded to Warden : </h3>
          {issueData?.IssueForwardedToWarden && (
            <main>
              <h3>Time : {issueData?.IssueForwardedToWarden[0]?.time}</h3>
              <h3>
                reasonForForwarding :{" "}
                {issueData?.IssueForwardedToWarden[0]?.reasonForForwarding}
              </h3>
              <h3>isApproved : {issueData?.IssueForwardedToWarden[0]?.isApproved}</h3>
            </main>
          )}
          <br />
          <h3>IssueForwarded to DSW : </h3>

          {issueData?.IssueForwardedToDsw && (
            <main>
              <h3>Time : {issueData?.IssueForwardedToDsw[0]?.time}</h3>
              <h3>
                reasonForForwarding :{" "}
                {issueData?.IssueForwardedToDsw[0]?.reasonForForwarding}
              </h3>
              <h3>isApproved : {issueData?.IssueForwardedToDsw[0]?.isApproved}</h3>
            </main>
          )}
          <br />

          <br />
          <hr />
        </main>
      )}
    </main>
  );
};

export default IndividualIssue;
