import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ userType = 'Parent' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkTo = userType === 'Parent' ? '/childs_view' : '/';
  const linkText = userType === 'Parent' ? "Child's View" : "Parent View";

  return (
    <nav role="navigation">
      <div className="content">
        <div>
          <h2>Welcome <span className="welcome">{userType === 'Parent' ? 'Parent!' : 'Mr.Sunshine!'}</span></h2>
        </div>
        
        <div className="links">
          <Link to={linkTo}>{linkText}</Link>
          <a href="">Language</a>
          <a href="">Settings</a>
          <a href="">Log Out</a>
        </div>
        <i className="material-icons menu" onClick={toggleMenu}>
          {isMenuOpen ? 'close' : 'menu'}
        </i>
      </div>

      <div className={`dropdown ${isMenuOpen ? 'open' : ''}`}>
        <Link to={linkTo}>{linkText}</Link>
        <a href="">Language</a>
        <a href="">Settings</a>
        <a href="">Log Out</a>
      </div>
    </nav>
  );
}

export default Navbar;
