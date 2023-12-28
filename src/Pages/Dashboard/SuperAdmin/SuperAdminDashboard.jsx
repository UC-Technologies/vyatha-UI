import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Styles.module.scss";

const SuperAdminDashboard = () => {
  useEffect(() => {
    document.title = "Super Admin Dashboard | Vyatha";
  }, []);
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
          <Link to="/superadmin/hostelwise">Hostel wise Issue</Link>
        </div>
      </h1>
    </main>
  );
};

export default SuperAdminDashboard;
