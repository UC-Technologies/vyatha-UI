import Verified from "./Verified";
import NotVerified from "./NotVerified";

// response will be fetched from the api
const response = false;

const Verify = () => {
  return <div>{response ? <Verified /> : <NotVerified />}</div>;
};

export default Verify;
