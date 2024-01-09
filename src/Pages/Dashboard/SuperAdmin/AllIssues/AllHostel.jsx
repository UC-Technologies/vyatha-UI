import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../AllSignups/Style.module.scss";
import { UserContext } from "../../../../Context/Provider";

const HostelWise = () => {
  const allHostels = [
    "Aryabhatt-PGH",
    "BH1",
    "BH2",
    "BH3",
    "BH4",
    "BH6",
    "BH7",
    "BH8",
    "BH9A",
    "BH9B",
    "BH9C",
    "BH9D",
    "GH1",
    "GH2",
    "GH3",
    "GH4",
  ];

  const { role } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "All Hostels | Vyatha";
    if (role !== "superadmin") {
      navigate("/");
    }
  }, [role, navigate]);
  return (
    <main className={styles.top}>
      <h1 style={{ textDecoration: "underline" }}>Issues which are not closed: </h1>
      {allHostels.map((item) => {
        return (
          <div>
            <Link to={`/superadmin/issues/${item}`}>
              <h3>{item}</h3>
            </Link>
          </div>
        );
      })}

      <h1 style={{ textDecoration: "underline" }}>Closed Issues: </h1>
      {allHostels.map((item) => {
        return (
          <div>
            <Link to={`/superadmin/issues/closed/${item}`}>
              <h3>{item}</h3>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default HostelWise;
