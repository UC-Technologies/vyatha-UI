import React, { useState } from "react";
import SuperAdminDashboard from "../../SuperAdmin/SuperAdminDashboard";
import AllComplaintsAdmin from "../Admin/AllComplaintsAdmin";

const AllComplaints = () => {
  const [role, setRole] = useState("client");

  const handleRoleChange = (e) => {
    e.preventDefault();
    setRole("warden");
  };

  return (
    <div>
      AllComplaints
      {role === "client" && <h1>Client stuff </h1>}
      {(role === "supervisor" || role === "warden" || role === "dsw") && (
        <AllComplaintsAdmin />
      )}
      {role === "Superadmin" && <SuperAdminDashboard />}
      <button onClick={handleRoleChange}>toggle role</button>
    </div>
  );
};

export default AllComplaints;
