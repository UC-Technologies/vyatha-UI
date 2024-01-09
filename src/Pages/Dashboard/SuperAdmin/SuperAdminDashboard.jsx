import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Styles.module.scss";
import { UserContext } from "../../../Context/Provider";

const SuperAdminDashboard = () => {
  useEffect(() => {
    document.title = "Super Admin Dashboard | Vyatha";
  }, []);
  const { role } = useContext(UserContext);
  return (
    <main className={styles.top}>
      <h1>
        <div>
          <Link to="/superadmin/allsignups">All signups</Link>
        </div>
        <div>
          <Link to="/superadmin/allissues">All Registered Issues</Link>
        </div>
        <div>
          <Link to={`/${role}/closedissues`}>All Closed Issues</Link>
        </div>
        <div>
          <Link to="/superadmin/hostelwise">Hostel wise Issue</Link>
        </div>
      </h1>
    </main>
  );
};

export default SuperAdminDashboard;
