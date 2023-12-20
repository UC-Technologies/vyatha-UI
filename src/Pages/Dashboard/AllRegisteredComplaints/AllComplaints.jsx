import React, { useState } from "react";
import SuperAdminDashboard from "../SuperAdmin/SuperAdminDashboard";
import AllComplaintsAdmin from "./Admin/AllComplaintsAdmin";
import AllComplaintsStudent from "./Student/AllComplaintsStudent";
import DashBoardHome from "../../../Components/RegisteredComplaint/DashBoardHome";

const AllComplaints = () => {
  const [role, setRole] = useState("warden");

  const handleRoleChange = (e) => {
    e.preventDefault();
    // setRole("warden");
    // setRole("superadmin");
    if (role === "warden") {
      setRole("client");
    }
    setRole("warden");
  };

  return (
    <div>
      AllComplaints
      <DashBoardHome role={role} />
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
