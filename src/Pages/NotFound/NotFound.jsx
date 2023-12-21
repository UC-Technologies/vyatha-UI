import React, { useEffect } from "react";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <div className={styles.container}>
      <img
        src="https://res.cloudinary.com/dt2zy7sny/image/upload/v1703175903/error-404-page-not-available-9561127-7706458_1_ovqjoo.png"
        alt=""
        className={styles.img1}
      ></img>
      <div className={styles.err}>ERROR!!</div>
    </div>
  );
};

export default NotFound;
