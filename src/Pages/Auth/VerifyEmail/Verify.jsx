import React from "react";
import Verified from "./Verified";
import NotVerify from "./NotVerify";

// response will be fetched from the api
const response = true;

const Verify = () => {
  return <main>{response ? <Verified /> : <NotVerify />}</main>;
};

export default Verify;
