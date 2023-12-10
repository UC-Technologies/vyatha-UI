import { useState } from 'react';
import './Navbar.module.scss';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">Logo</h1>
        <button onClick={toggleNavbar} className="navbar-menu-button">
          &#9776;
        </button>
        <ul className={`navbar-nav-links ${isOpen ? 'open' : ''}`}>
          <li><a href="#"><img src="" alt="My Profile"></img><p>My Profile</p></a></li>
          <li><a href="#"><img src="" alt="Register complaints"></img><p>Register complaints</p></a></li>
          <li><a href="#"><img src="" alt="Registered complaints"></img><p>Registered complaints</p></a></li>
          <li><a href="#"><img src="" alt="About Us"></img><p>About Us</p></a></li>
          <li><a href="#"><img src="" alt="Log Out"></img><p>Log Out</p></a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
