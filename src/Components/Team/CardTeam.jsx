import { Link } from "react-router-dom";
import styles from "./CardTeam.module.scss";

const CardTeam = ({ photo, name, designation, url }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profPhoto}>
        <Link to={url} target="_blank">
          <img className={styles.photo} src={photo} alt="profile avatar"></img>
        </Link>
      </div>
      <div className={styles.subwrapper}>
        <p className={styles.name}>{name}</p>
        <p className={styles.designation}>{designation}</p>
      </div>
    </div>
  );
};

export default CardTeam;
