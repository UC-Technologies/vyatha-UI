import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ComplaintCardA.module.scss";

const ComplaintCardA = ({ title, date, time, content, id }) => {
  const { role } = useParams();
  // console.log(role);
  return (
    <div className={styles.cardhome}>
      <div className={styles.cardmap} key={id}>
        <div className={styles.content_entity}>
          <div className={styles.inner_map}>
            <div className={styles.complain_title}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/${role}/complaint/${id}`}
              >
                {title}
              </Link>
            </div>
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
              src="https://i.ytimg.com/vi/zrM6N-G6U_M/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvuPG7_Msty7eeBLo-m26EsQg6nA"
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
              style={{ cursor: "pointer" }}
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
