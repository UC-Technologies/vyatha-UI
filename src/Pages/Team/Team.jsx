import { useEffect } from "react";
import styles from "./Team.module.scss";
import CardTeam from "../../Components/Team/CardTeam";
import teamData from "../../Assets/Team/teamData.json";
import profPhoto from "../../Assets/Team/profPhoto.png";

const Team = () => {
  useEffect(() => {
    document.title = "Team | Vyatha";
  });

  const head = {
    photo: profPhoto,
    name: "Manish Sarmah",
    designation: "Lead Developer",
    url: "vyatha-ui.onrender.com/",
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainwrapper}>
        <div className={styles.head}>
          <CardTeam
            photo={head.photo}
            name={head.name}
            designation={head.designation}
            url={head.url}
          />
        </div>
        <div className={styles.devs}>
          {teamData &&
            teamData.map((item) => (
              <div className={styles.subwrapper}>
                <CardTeam
                  photo={item.photo}
                  name={item.name}
                  designation={item.designation}
                  url={item.url}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
