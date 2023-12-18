import React, { useEffect } from "react";

const ForgotPwd = () => {
  useEffect(() => {
    document.title = "Forgot Password?";
  }, []);
  return (
    <div>
      {/* it will have a from that will ask for email */}
      ForgotPwd
    </div>
  );
};

export default ForgotPwd;
