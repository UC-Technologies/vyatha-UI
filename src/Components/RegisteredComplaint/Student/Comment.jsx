import styles from "./Comment.module.scss";

const Comment = () => {
  return (
    <div className={styles.comments}>
      <input type="text" placeholder="Tap to comment" />
      <h1 className={styles.RaiseComplain}>Raise Complain</h1>

      <div className={styles.SelectContainer}>
        <select className={styles.SelectMenu}>
          <option value="dean" className={styles.option}>
            Dean
          </option>
          <option value="warden" className={styles.option}>
            Warden
          </option>
        </select>
        <div className={styles.SelectArrow}>&#9660;</div>
      </div>
    </div>
  );
};

export default Comment;
