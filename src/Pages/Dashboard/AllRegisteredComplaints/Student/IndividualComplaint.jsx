import { useState } from "react";
import IndividualComplaintAdmin from "../Admin/IndividualComplaintAdmin";

const IndividualComplaint = () => {
  const [role, setRole] = useState("client");

  return (
    <div>
      {role === "client" && <h1>Student stuff </h1>}

      {(role === "supervisor" || role === "warden" || role === "dsw") && (
        <IndividualComplaintAdmin />
      )}

      <button
        onClick={() => {
          setRole("supervisor");
        }}
      >
        Toggle role
      </button>
    </div>
  );
};

export default IndividualComplaint;
