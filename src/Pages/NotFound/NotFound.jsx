import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return <div>NotFound</div>;
};

export default NotFound;
