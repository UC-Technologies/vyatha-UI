import styles from "./Status.module.scss";

const StatusOfComplaint = () => {
  return (
    <div className={styles.MainDiv}>
      <div className={styles.StatusBarContainer}>
        <div className={styles.StatusBar}></div>
        <div className={styles.StatusBar2}></div>
        <div className={styles.StatusBar3}></div>
        <div className={styles.StatusBar4}></div>
      </div>
      <div className={styles.status}>
        <div className={styles.Registered}>
          <h1>Registered</h1>
          <h2>
            hh:mm <br />
            day - dd/mm/yy
          </h2>
        </div>

        <div className={styles.Supervisor}>
          <h1>Supervisor</h1>
          <h2>Delivered hh:mm day - dd/mm/yy</h2>
        </div>

        <div className={styles.Warden}>
          <h1>Warden</h1>
        </div>

        <div className={styles.Dean}>
          <h1>Dean</h1>
        </div>
      </div>
    </div>
  );
};

export default StatusOfComplaint;
