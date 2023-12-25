import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardHome from "../../../Components/RegisteredComplaint/DashBoardHome";

const Dashboard = () => {
  const navigate = useNavigate();
  // get the role consuming the context

  const possibleRoles = useMemo(
    () => ["student", "warden", "dsw", "supervisor", "superadmin"],
    []
  );
  const role = "student";
  useEffect(() => {
    if (!possibleRoles.includes(role)) {
      navigate("/");
    }
  }, [navigate, possibleRoles]);

  return (
    <div>
      {/* AllComplaints */}
      <DashBoardHome role={role} />
    </div>
  );
};

export default Dashboard;
