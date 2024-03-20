import { useState, useEffect } from "react";

const UseInternetConnectivity = () => {
  const [isOnline, setIsOnline] = useState(true);

  // todo: this method of checking whether internet is available or not depends on the response from the api. this might not be the best solution out there.
  // ! try alternatives for eg: we can use navigator.Online but this is also not full proof.
  // ! some inbuilt js api might solve the issue.
  // ! one such api is navigator.onLine but this is not perfect. doesn't work in all cases.
  // ! so we are sticking to implemented method as for now.
  // ! upon scaling of the app, we can try other methods.
  // ! we can also use is-online package from npm. this is also a good alternative.

  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_REACT_APP_CHECK, {
          method: "HEAD",
          cache: "no-cache",
        });
        if (response.status === 200) {
          setIsOnline(response.ok);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        setIsOnline(false);
      }
    };

    const intervalId = setInterval(checkConnectivity, 2000);

    checkConnectivity();

    return () => clearInterval(intervalId);
  }, []);

  return isOnline;
};

export default UseInternetConnectivity;
