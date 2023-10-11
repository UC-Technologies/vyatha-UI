import React,{useState} from "react"
import Captcha from "../CaptchaComponent/captcha";
// import Captcha from "./CaptchaComponent/Captcha"
import styles from "./Login.module.scss"
const Login=()=>{
    function verifyCaptcha() {
        const userResponseInt = userResponse;
        if (userResponseInt === answer){
          // setMessage('CAPTCHA verified.');
          // alert("verified")
          toast.success('Verified', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          
        } 
        else 
        {
          // setMessage('CAPTCHA verification failed. Please try again.');
          
            toast.error('Invalid Captcha', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
           
          // use toast message in place of alert react-toastify
          // following props:
          // position: top-right
          // dark-mode: true (bg should be dark)
          // toast.error in place of alert
          // install react-toastify pnpm i react-toastify 
          generateCaptcha();
        }
      }
    
    
    return(
        <div className={styles.container}>
            <p className={styles.login}>Log in</p>
            <form className={styles.form_group}>
                <div className={styles.input_group}>
                    <input type="email" className={styles.form_input} placeholder=" "></input>
                    <label className={styles.form_label}>Email</label>
                </div>
                <div className={styles.input_group}>
                     <input type="password" className={styles.form_input} placeholder=" "></input>
                    <label className={styles.form_label}>password</label>

                </div>
                {/* <Captcha/> */}
                <p className={styles.password}>Forgot Password?</p>
                <div className={styles.captcha}>
                    <Captcha/>
                </div>
                <div className={styles.button}>
                    <button type="submit" onClick={verifyCaptcha}className={styles.btn}>Login</button>
                </div>
                <p className={styles.signup}>Don't have an account?Sign up</p>
            </form>

        </div>
    )
}
export default Login