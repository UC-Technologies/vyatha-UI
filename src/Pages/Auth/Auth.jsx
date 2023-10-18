import React from 'react';
import styles from './Auth.module.scss';
import Lottie from "lottie-react";
import animationData from '../../../public/lottie/logo.json';
import { useNavigate } from "react-router-dom";


const Auth = () => {

    const navigate = useNavigate();

    const handleAdmin = () => {
        navigate('/auth/admin');
    };
    const handleStudent = () => {
        navigate('/auth/student');
    };
        
    return (

        <div className={styles.container_div}>
            <div className={styles.main_div}>
                <div className={styles.upper_div}>
                    <div className={styles.logo_div}>
                        <Lottie animationData={animationData}  loop={false} />
                    </div>
                </div>

                <div className={styles.middle_div}></div>
                <div className={styles.lower_div}>
                    <div className={styles.div_1}>
                        
                            <button className={styles.student_div} onClick={handleStudent}>

                                <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_3_1_p791jw.jpg?_s=public-apps" alt="" />
                            </button>                        
                        
                            <button className={styles.admin_div} onClick={handleAdmin}>

                                <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_1_w8h3pa.jpg?_s=public-apps" alt="" />
                            </button>
                       
                    </div>
                    <div className={styles.div_2}>
                        <p>Vyatha</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;