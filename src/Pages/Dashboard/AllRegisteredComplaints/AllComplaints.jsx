import React, { useState } from "react";
import SuperAdminDashboard from "../SuperAdmin/SuperAdminDashboard";
import AllComplaintsAdmin from "./Admin/AllComplaintsAdmin";
import AllComplaintsStudent from "./Student/AllComplaintsStudent";

const AllComplaints = () => {
  const [role, setRole] = useState("client");

  const handleRoleChange = (e) => {
    e.preventDefault();
    setRole("warden");
    // setRole("superadmin");
  };

  return (
    <div>
      AllComplaints
      {role === "client" && <AllComplaintsStudent />}
      {(role === "supervisor" || role === "warden" || role === "dsw") && (
        <AllComplaintsAdmin />
      )}
      {role === "superadmin" && <SuperAdminDashboard />}
      <button onClick={handleRoleChange}>toggle role</button>
    </div>
  );
};

export default AllComplaints;
