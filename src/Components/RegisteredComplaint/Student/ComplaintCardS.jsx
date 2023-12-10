import styles from "./ComplaintCardS.module.scss";

const ComplaintCardS = () => {
  return (
    <div className={styles.CommentContainer}>
      <div className={styles.MainHeading}>Comments</div>
      <input id="sh" type="checkbox" />
      <div className={styles.Comment}>
        <h1>Supervisor</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illum enim
          eveniet nemo, dolorem blanditiis nihil atque consequatur magnam dolore!
        </h2>
        <h3>hh:mm day - dd/mm/yy</h3>
      </div>
      <div className={styles.Comment}>
        <h1>You</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illum enim
          eveniet nemo, dolorem blanditiis nihil atque consequatur magnam dolore!
        </h2>
        <h3>hh:mm day - dd/mm/yy</h3>
      </div>
      <div className={styles.HiddenComments}>
        <div className={styles.Comment}>
          <h1>Supervisor</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illum enim
            eveniet nemo, dolorem blanditiis nihil atque consequatur magnam dolore!
          </h2>
          <h3>hh:mm day - dd/mm/yy</h3>
        </div>
        <div className={styles.Comment}>
          <h1>You</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illum enim
            eveniet nemo, dolorem blanditiis nihil atque consequatur magnam dolore!
          </h2>
          <h3>hh:mm day - dd/mm/yy</h3>
        </div>
        <div className={styles.Comment}>
          <h1>Supervisor</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illum enim
            eveniet nemo, dolorem blanditiis nihil atque consequatur magnam dolore!
          </h2>
          <h3>hh:mm day - dd/mm/yy</h3>
        </div>
        <label htmlFor="sh">Collapse</label>
      </div>
      <label htmlFor="sh" className={styles.ReadMore}>
        See all comments
      </label>
    </div>
  );
};

export default ComplaintCardS;
