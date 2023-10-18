import React from 'react';
import styles from './Admin.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const handleAdminLogin = () => {
      navigate('/auth/admin/login');
  };

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
                                <button className={styles.login} onClick={handleAdminLogin}>
                                    <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1695295732/login_w7ltqc.jpg?_s=public-apps" alt="" />
                                </button>
                            </div>
                            <div className={styles.content}>
                                <p>Don't have an account? <Link to={'/auth/admin/signup'}>Sign up</Link></p>
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

export default Admin;