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
        <h1 className={styles.head} id={styles.top__head}>
          The Hostel <span className={styles.grievance}>Grievance</span> Website
        </h1>

        <div className={styles.container}>
          <div className={styles.card}>
            <img className={styles.imge} src={img1} alt="" />
            <p className={styles.par3}>
              <center>
                {" "}
                <strong> Registration:</strong>
              </center>{" "}
              <br />
              Join Vyatha! Hostel boarders, register to submit your complaints—simply fill
              in your credentials. Alternatively, sign up as an authority figure to
              oversee all submitted complaints.
            </p>
          </div>

          <div className={styles.card}>
            <img className={styles.imge} src={img2} alt="" />
            <p className={styles.par3}>
              <center>
                {" "}
                <strong>Progress Tracking:</strong>
              </center>
              <br />
              Utilise Vyatha to monitor the status of your concerns. Easily determine
              whether your issue is in the process of being resolved or has already been
              addressed
            </p>
          </div>

          <div className={styles.card}>
            <img className={styles.imge} src={img3} alt="" />
            <p className={styles.par3}>
              <center>
                <strong>Resolution Assurance:</strong>
              </center>
              <br />
              Vyatha ensures prompt awareness among authorities regarding your concerns,
              providing timely updates and solutions to keep you informed
            </p>
          </div>
        </div>

        <p className={styles.para2}>
          <strong>Streamlining Hostel Complaints!</strong>
        </p>

        <div className={styles.butt1}>
          <button onClick={handleGoTo} className={styles.button}>
            Get Started-it&apos;s Free
          </button>
        </div>
      </div>

      <div className={styles.main1}>
        <h1 className={styles.head} id={styles.howitwworks}>
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
          <strong>Register. Monitor. Resolve.</strong>
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
