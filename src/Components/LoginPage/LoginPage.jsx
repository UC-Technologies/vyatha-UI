import React from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function LoginPage(props) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.upper_div}>
                        <div className={styles.logo}>
                        <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58099_igiaij.jpg?_s=public-apps" alt="" />
                        </div>
                    </div>
                {/* <p>Login as {props.type=="student"?"Student":"Admin"}</p> */}
                    <div className={styles.lower_div}>
                        <div className={styles.content_div}>
                            <div className={styles.image}>
                                <button className={styles.login}>
                                    <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1695295732/login_w7ltqc.jpg?_s=public-apps" alt="" />
                                </button>
                            </div>
                            <div className={styles.content}>
                                <p>Don't have an account? <Link to={''}>Sign up</Link></p>
                            </div>
                        </div>
                        <div className={styles.text}>
                            <p>Vyatha</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;