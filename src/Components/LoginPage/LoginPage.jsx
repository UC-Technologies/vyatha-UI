import React, { useState } from 'react';
import './Authentication.scss';
import Lottie from "lottie-react";
import animationData from "./Comp.json";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    const Login = () => {
        navigate('/login');
  };
    
    
    return (

        <div className='container_div'>
            <div className='main_div'>
                <div className='upper_div'>
                    <div className='logo_div'>
                        <Lottie animationData={animationData}  loop={false} />
                    </div>
                </div>

                <div className='middle_div'></div>
                <div className='lower_div'>
                    <div className='div_1'>
                        
                            <button className='student_div' onClick={Login}>

                                <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_3_1_p791jw.jpg?_s=public-apps" alt="" />

                            </button>
                        
                        
                            <button className='admin_div' onClick={Login}>

                                <img src="https://res.cloudinary.com/dlx4meooj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694618443/Property_1_Default_1_w8h3pa.jpg?_s=public-apps" alt="" />
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