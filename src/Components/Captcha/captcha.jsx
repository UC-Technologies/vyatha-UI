import React,{useState} from "react"
const Captcha=()=>{
     const num1=()=>{
        min = Math.ceil(1);
        max = Math.floor(9);
        return Math.floor(Math.random() * (9 - 1 + 1) + 1)
     }
     const num2=()=>{
        min = Math.ceil(1);
        max = Math.floor(9);
        return Math.floor(Math.random() * (9 - 1 + 1) + 1)
     }
     const num=num1+num2
     

}
export default Captcha;