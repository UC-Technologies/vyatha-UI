import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllComplaintsAdmin from "./Admin/AllComplaintsAdmin";
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
      {role === "student" && <AllComplaintsStudent />}
      {(role === "supervisor" || role === "warden" || role === "dsw") && (
        <AllComplaintsAdmin />
      )}
      {role === "superadmin" && <SuperAdminDashboard />}
    </main>
  );
};

export default AllComplaints;
