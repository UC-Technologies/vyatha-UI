import { useState } from "react";
import IndividualComplaintAdmin from "./Admin/IndividualComplaintAdmin";
import IndividualComplaintStudent from "./Student/IndividualComplaintStudent";

const IndividualComplaint = () => {
  const [role, setRole] = useState("client");

  // define role in Context provider and consume it here

  return (
    <div>
      {role === "client" && <IndividualComplaintStudent />}

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
