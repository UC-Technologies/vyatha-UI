import React, { useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IndividualComplaintAdmin from "./Admin/IndividualComplaintAdmin";
import IndividualComplaintStudent from "./Student/IndividualComplaintStudent";

const IndividualComplaint = () => {
  // const [role, setRole] = useState("warden");
  const { role } = useParams();
  const navigate = useNavigate();
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
    <div style={{ marginTop: "4rem" }}>
      {role === "student" && <IndividualComplaintStudent />}

      {(role === "supervisor" ||
        role === "warden" ||
        role === "dsw" ||
        role === "superadmin") && <IndividualComplaintAdmin />}
    </div>
  );
};

export default IndividualComplaint;
