import React from 'react'
import './Footer.module.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <h1 className="navbar-logo">Logo</h1>
        <ul>
          <li><b>Vyatha</b>qazwsxedc rfvtgbyhn ujmikol p</li>
          <li><b>Email</b></li>
          <li><u>uclimited234@gmail.com</u></li>
          <li><b>Address</b></li>
          <li>NIT Silchar, Srijan E-Cell, 788010</li>
          <li><b>Phone</b></li>
          <li>+91 7165471781</li>
        </ul>
      </div>
      <div className="social-handles">
        <h6>Follow Us</h6>
        <div className="social-bg">
        <ul>
          <li><a href="#"><img src="" alt="Linkedin-handle" /></a></li>
          <li><a href="#"><img src="" alt="Facebook-handle" /></a></li>
          <li><a href="#"><img src="" alt="X-handle" /></a></li>
        </ul>
        <p>Copyright ucvyatha@ All rights protected</p>
        </div>  
      </div>
    </footer>
  );
};

export default Footer;
