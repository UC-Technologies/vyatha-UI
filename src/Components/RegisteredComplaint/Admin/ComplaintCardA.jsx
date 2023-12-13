import React from "react";
import styles from "./ComplaintCardA.module.scss";

const ComplaintCardA = ({ title, date, time, content, id }) => {
  return (
    <div className={styles.cardhome}>
      <div className={styles.cardmap} key={id}>
        
        <div className={styles.content_entity}>
          <div className={styles.inner_map}>
            <div className={styles.complain_title}>{title}</div>
            <div className={styles.date_time}>
              <span>{date}</span>
              <span>{time}</span>
            </div>
            <div className={styles.complain_description}>
              <div className={styles.complain_content}>{content}</div>
            </div>
          </div>
          <div className={styles.complain_con_img}>
            <img
              src="https://s3-alpha-sig.figma.com/img/f06f/6691/b92fc31e86c9ce481017ad11657f2bcb?Expires=1699228800&Signature=qPuHg-rurXdrJQgZT861Uejmq6mD-KjMK61xmQMoKQkh6rP45x8q3OWGOBDejd8UxvtUKfkP-C7jmqr1Fx7L7UNyfejLJDjt9JXAhjGJ9m~~GP7Upd2XPey43WjL~6rJyKsa4vQZHp0pVy5HWSbJPY9o-yAe0YjRFgVbKHUXOkwn~wcEKuXwtS9fmoLBP7wfYR5zBBACntvQXevZBHrWVdyM8F7bXP25yg8Ui8TIbKYDPE1vk7L7Ww2q2zOYBfJ4d-l6Twm-AqHjFQ2twacJYP~oz7KFcaiO1lVH3WMH1mIVyEpd4CIOoom7lXnW~6iQTID8B1zwGouYX8v6iiN3fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt=""
              width="317px"
              height="170px"
            />
          </div>
        </div>
        <div className={styles.tag_line}>
          <div className={styles.vector1}>
            <div className={styles.vect_card}>
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811897/UC%20VYATHA/Vector_1_oiwy9x.jpg?_s=public-apps"
                width="170px"
                alt=""
              />
              <div className={styles.vect_card_text}>Registered</div>
            </div>

            <div className={styles.vect_card}>
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811897/UC%20VYATHA/Vector_2_b1t7sy.jpg?_s=public-apps"
                width="170px"
                alt=""
              />
              <div className={styles.vect_card_text}>Supervisor</div>
            </div>

            <div className={styles.vect_card}>
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811897/UC%20VYATHA/Vector_3_r7gtew.jpg?_s=public-apps"
                alt=""
                width="170px"
              />
              <div className={styles.vect_card_text}>Warden</div>
            </div>

            <div className={styles.vect_card}>
              <img
                src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697811897/UC%20VYATHA/Vector_4_vnlx6n.jpg?_s=public-apps"
                width="170px"
                alt=""
              />
              <div className={styles.vect_card_text}>Dean</div>
            </div>
          </div>

          <div className={styles.comment_box}>
            <img
              src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1698397726/Round_ats37t.jpg?_s=public-apps"
              width="54px"
              height="52px"
              alt=""
            />
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default ComplaintCardA;
