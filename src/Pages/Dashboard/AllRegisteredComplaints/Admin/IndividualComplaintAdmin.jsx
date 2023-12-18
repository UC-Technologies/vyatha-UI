import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import styles from "./IndividualComplaintA.module.scss";
import Data from "./Records.json";

const IndividualComplaintAdmin = () => {
  const { key } = useParams();

  const Key = Number(key);
  const complaint = Data.find((item) => item.key === Key);

  if (!complaint) {
    return <div>Complaint not found</div>;
  }

  return (
    <div className={styles.title_page}>
      <Helmet>
        <title>{`${complaint.title} | Vyatha`}</title>
      </Helmet>
      <div className={styles.title_bar}>
        <div className={styles.title_content}> {complaint.title}</div>
      </div>
      <div className={styles.dropdown_img}>
        <img src="" alt="" />
      </div>
      <div className={styles.student_info}>
        <fieldset className={styles.field_set}>
          <legend>
            <div>Filled by</div>
          </legend>
          <div className={styles.list}>
            <ul>
              <li>Name of the Student</li>
              <li>Scholar ID</li>
              <li>Room Number</li>
              <li>Phone Number</li>
            </ul>
            <div className={styles.card_photo}>
              <div className={styles.card_photo_content}>ID Card Photo</div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className={styles.comment_section}>
        <span> Comment hh:mm day - dd/mm/yr</span>
      </div>
      <div className={styles.photo_uploaded}>
        <span>Photo uploaded</span>
        <div>
          <img
            src="https://s3-alpha-sig.figma.com/img/f06f/6691/b92fc31e86c9ce481017ad11657f2bcb?Expires=1698624000&Signature=iCKUoDlkQk9RmQPlV1bRBpXWXC4M1-KRjOLcg9ddfmCygWsGiIPiYEWdc9EDVZFkPW-Ba0YHnZ7XLgHRFb-xIcCtmsq2CW6GMcn5VGrxV1JSvB~A9i9PA7qPTVsP~fuFxmv0KqKIFadWMkfWs14xwLtjzlOkzMgul7MTl~rmDLy5aodBNnwGQIF-0LE9UAIbIhIWx0omo0dHYTL~2aMIF3aoX79jHqVZDzPHU4fgEtlAa9HWukLxuJf3ZPwWLC~xsgJQ~CBX0TgqY-ZqftV8EcMEG383AL59Mb5IBo8viRBZdzd41FDqspgcyHm43ytOcQgX2fup8SDMAzaINt-qKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
      </div>
      <div className={styles.comment_form}>
        <input type="text" placeholder="Tap to Comment " />
        <span>Forwarded to</span>
        <input type="text" placeholder="Tap to Select" />
        <input type="text" placeholder="Reson to forward" />
      </div>
      <div className={styles.submit}>
        <input type="submit" />
      </div>
    </div>
  );
};

export default IndividualComplaintAdmin;
