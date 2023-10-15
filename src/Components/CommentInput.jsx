import styles from "./CommentInput.module.scss";

const CommentInput = () => {
  return (
    <div className={styles.comments}>
      <input type="text" placeholder="Tap to comment" />
    </div>
  );
};

export default CommentInput;
