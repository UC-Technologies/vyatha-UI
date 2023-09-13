import React from 'react';
import './Authentication.scss';
import Lottie from 'lottie-react';
import LoginPage2 from './LoginPage2';
import { Link } from "react-router-dom";

// import LoginPage2 from './LoginPage2';

const LoginPage = () => {
    return (
        <div className='container_div'>
            <div className='main_div'>
                <div className='upper_div'>
                    <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694542881/Frame_58100_glvong.jpg?_s=public-apps" alt="" />
                </div>
                <div className='middle_div'></div>
                <div className='lower_div'>
                    <div className='div_1'>
                        <button className='student_div' >
                            <Link to="/LoginPage2"> <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_3_1_p791jw.jpg?_s=public-apps" alt="" />
                            </Link>
                        </button>
                        <button className='admin_div' >
                            <Link to="/LoginPage2"> <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_1_w8h3pa.jpg?_s=public-apps" alt="" />
                            </Link>
                        </button>
                    </div>
                    <div className='div_2'>
                        <p>Vyatha</p>
                    </div>
                </div>
            </div>
        </div>

    )
}











export default LoginPage;