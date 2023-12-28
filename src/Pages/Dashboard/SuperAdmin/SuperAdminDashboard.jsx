import React from "react";
import { Link } from "react-router-dom";
import styles from "./Styles.module.scss";
const SuperAdminDashboard = () => {
  return (
    <main className={styles.top}>
      <h1>
        <Link to="/superadmin/allsignups">All signups</Link>
      </h1>
    </main>
  );
};

export default SuperAdminDashboard;
