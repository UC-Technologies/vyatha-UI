import { useState, useEffect } from "react";

const UseInternetConnectivity = () => {
  const [isOnline, setIsOnline] = useState(true);

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
