import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Home.module.scss";
import { UserContext } from "../../Context/Provider";
import img1 from "../../Assets/Home/img1.svg";
import img2 from "../../Assets/Home/img2.svg";
import img3 from "../../Assets/Home/img3.svg";
import img4 from "../../Assets/Home/img4.svg";
import img5 from "../../Assets/Home/img5.svg";
import img6 from "../../Assets/Home/img6.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  // console.log(isLoggedIn)
  useEffect(() => {
    document.title = "Home | Vyatha";
    if (isLoggedIn === true) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleGoTo = (e) => {
    e.preventDefault();
    navigate("/auth/signup");
  };

  return (
    <div className={styles.main}>
      <div className={styles.main2}>
        <h1 className={styles.head}>
          The Hostel <span className={styles.grievance}>Grievance</span> Website
        </h1>

        <div className={styles.container}>
          <div className={styles.card}>
            <img className={styles.imge} src={img1} alt="" />
            <p className={styles.par3}>
              Morbi a metus. <br />
              Phasellus enim erat, <br />
              vestibulum vel?
            </p>
          </div>

          <div className={styles.card}>
            <img className={styles.imge} src={img2} alt="" />
            <p className={styles.par3}>
              Morbi a metus. <br />
              Phasellus enim erat, <br />
              vestibulum vel?
            </p>
          </div>

          <div className={styles.card}>
            <img className={styles.imge} src={img3} alt="" />
            <p className={styles.par3}>
              Morbi a metus. <br />
              Phasellus enim erat, <br />
              vestibulum vel?
            </p>
          </div>
        </div>

        <p className={styles.para2}>
          Morbi a metus. Phasellus enim erat, vestibulum vel.
        </p>

        <div className={styles.butt1}>
          <button onClick={handleGoTo} className={styles.button}>
            Get Started-it&apos;s Free
          </button>
        </div>
      </div>

      <div className={styles.main1}>
        <h1 className={styles.head}>
          How it <span className={styles.works}>Works</span>?
        </h1>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={styles.container1}>
              <div className={styles.card1}>
                <h2 className={styles.head1}>Step 1</h2>
                <h3 className={styles.acc}> Account Creation</h3>
                <ul className={styles.listt}>
                  <li>
                    Choose &quot;Student&quot; or <br />
                    &quot;Admin&quot; to create an <br />
                    account.
                  </li>
                </ul>
              </div>
              <div className={styles.card1}>
                <img className={styles.imgee} src={img4} alt="Step1" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.container1}>
              <div className={styles.card1}>
                <h2 className={styles.head1}>Step 2</h2>
                <h3 className={styles.acc}>Register Problems</h3>
                <ul className={styles.listt}>
                  <li>
                    As a student submit your <br />
                    issue with proof and <br />
                    details.
                  </li>
                  <li>
                    Admins review and take <br />
                    appropriateactions on <br />
                    registered problems.
                  </li>
                </ul>
              </div>

              <div className={styles.card1}>
                <img className={styles.imgee} src={img5} alt="Step2" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.container1}>
              <div className={styles.card1}>
                <h2 className={styles.head1}>Step 3</h2>
                <h3 className={styles.acc}>Track Progress</h3>
                <ul className={styles.listt}>
                  <li>
                    Check Problem status: <br /> registrered, solved, in progress <br />{" "}
                    or cancelled.
                  </li>
                  <li>
                    Admins can update problem <br /> status and add coments for <br />{" "}
                    resolution.
                  </li>
                </ul>
              </div>

              <div className={styles.card1}>
                <img className={styles.imgee} src={img6} alt="Step3" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <p className={styles.para2}>
          Morbi a metus. Phasellus enim erat, vestibulum vel.
        </p>

        <div className={styles.butt1}>
          <button onClick={handleGoTo} className={styles.button}>
            Get Started-it&apos;s Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
