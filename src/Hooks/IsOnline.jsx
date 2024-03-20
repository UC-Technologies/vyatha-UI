/* eslint-disable no-console */
import { useState, useEffect } from "react";
import isOnline from "is-online";

const useInternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const checkInternetStatus = async () => {
      try {
        const online = await isOnline();
        if (isMounted) {
          setIsConnected(online);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    checkInternetStatus();
    const intervalId = setInterval(checkInternetStatus, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return isConnected;
};

export default useInternetStatus;
