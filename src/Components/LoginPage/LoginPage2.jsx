import React from 'react';
import styles from './Login.module.scss';

function LoginPage2() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.upper_div}>
                        <div className={styles.logo}>
                        <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58099_igiaij.jpg?_s=public-apps" alt="" />
                        </div>
                    </div>
                    <div className={styles.lower_div}>
                        <div className={styles.content_div}>
                            <div className={styles.image}>
                                <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1695295732/login_w7ltqc.jpg?_s=public-apps" alt="login" />
                            </div>
                            <div className={styles.content}>
                                <p>Don't have an account? Sign up</p>
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

export default LoginPage2;