import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllComplaintsStudent from "./Student/AllComplaintsStudent";
import SuperAdminDashboard from "../SuperAdmin/SuperAdminDashboard";

const AllComplaints = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "All Complaints | Vyatha";
    const possibleRoles = ["student", "warden", "dsw", "supervisor", "superadmin"];
    if (!possibleRoles.includes(role)) {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <main style={{ marginTop: "4rem" }}>
      {(role === "supervisor" ||
        role === "warden" ||
        role === "dsw" ||
        role === "student") && <AllComplaintsStudent />}
      {role === "superadmin" && <SuperAdminDashboard />}
    </main>
  );
};

export default AllComplaints;
