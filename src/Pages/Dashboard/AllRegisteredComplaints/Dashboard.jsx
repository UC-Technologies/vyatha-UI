import React, { useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardHome from "../../../Components/RegisteredComplaint/DashBoardHome";
import { UserContext } from "../../../Context/Provider";
import SuperAdminDashboard from "../SuperAdmin/SuperAdminDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  // get the role consuming the context
  const { role } = useContext(UserContext);
  const possibleRoles = useMemo(
    () => ["student", "warden", "dsw", "supervisor", "superadmin"],
    []
  );

  useEffect(() => {
    if (!possibleRoles.includes(role)) {
      navigate("/");
    }
  }, [navigate, possibleRoles, role]);

  return (
    <div>
      {(role === "student" ||
        role === "supervisor" ||
        role === "warden" ||
        role === "dsw") && <DashBoardHome role={role} />}
      {/* */}
      {role === "superadmin" && <SuperAdminDashboard />}
    </div>
  );
};

export default Dashboard;
