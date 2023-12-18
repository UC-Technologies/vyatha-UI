import React, { useEffect } from "react";

const ResetPwd = () => {
  useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <div>
      {/* there will be a form that will ask for new password */}
      ResetPwd
    </div>
  );
};

export default ResetPwd;
