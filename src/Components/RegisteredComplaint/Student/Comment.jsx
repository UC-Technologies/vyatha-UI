import styles from "./Comment.module.scss";

const Comment = () => {
  return (
    <div className={styles.comments}>
      <input type="text" placeholder="Tap to comment" />
      <h1 className={styles.RaiseComplain}>Raise Complain</h1>

      <div className={styles.dropdown}>
        <div className={styles.select}>
          <span className={styles.selected}>Warden</span>
        </div>
      </div>
      <ul className={styles.menu}>
        <li className={styles.active}>Warden</li>
        <li>Dean</li>
      </ul>
    </div>
  );
};

export default Comment;
