import styles from "./Loading.module.scss";

const Skeleton = () => {
  return (
    <div className={styles.maindiv}>
      <div className={styles.text}>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
        <div className={`${styles.SkeletonText} ${styles.skeleton}`}></div>
      </div>
      <div className={`${styles.SkeletonSquare} ${styles.skeleton}`}></div>
    </div>
  );
};

export default Skeleton;
