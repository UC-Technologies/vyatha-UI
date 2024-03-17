import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Verified from "./Verified";
import NotVerified from "./NotVerified";
import { formattedDate } from "../../../Components/lib/GetDate";
// response will be fetched from the api

const Verify = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const currentTime = formattedDate;

  useEffect(() => {
    const verifyEmail = async () => {
      await axios
        .put(`${import.meta.env.VITE_REACT_APP_API}/verifyemail/${token}/${currentTime}`)
        .then((res) => {
          if (res.data.message === "Email verified") {
            setVerified(true);
            setVerifying(false);
          }
        })

        .catch((err) => {
          setVerified(false);
          setVerifying(false);
          if (err.response) {
            switch (err.response.data.error) {
              case "Email already verified":
                toast("Email already verified");
                break;
              case "Internal Server Error":
                toast("Internal Server Error");
                break;
              default:
                toast("something went wrong");
                break;
            }

            switch (err.response.data.message) {
              case "Token missing":
                toast("Token missing");
                break;
              case "no user exists":
                toast("no user exists");
                break;
              case "Token expired":
                toast("Token expired");
                break;
              default:
                toast("something went wrong");
                break;
            }
          }
        });
    };

    verifyEmail();
  }, [token]);

  if (verifying === true) {
    return (
      <main>
        <div className="veriyfing..."></div>
      </main>
    );
  }

  return <div>{verified === true ? <Verified /> : <NotVerified />}</div>;
};

export default Verify;
