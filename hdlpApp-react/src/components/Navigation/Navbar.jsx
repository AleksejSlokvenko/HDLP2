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
        <div className="nav-brand">
          <i className="material-icons brand-icon">school</i>
          <h2>Welcome <span className="welcome">{userType === 'Parent' ? 'Parent!' : 'Mr.Sunshine!'}</span></h2>
        </div>
        
        <div className="links">
          <Link to={linkTo} className="nav-link">{linkText}</Link>
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Language</a>
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Settings</a>
          <a href="#" className="nav-link logout" onClick={(e) => e.preventDefault()}>Log Out</a>
        </div>
        <i className="material-icons menu" onClick={toggleMenu}>
          {isMenuOpen ? 'close' : 'menu'}
        </i>
      </div>

      <div className={`dropdown ${isMenuOpen ? 'open' : ''}`}>
        <Link to={linkTo} className="dropdown-link" onClick={toggleMenu}>{linkText}</Link>
        <a href="#" className="dropdown-link" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>Language</a>
        <a href="#" className="dropdown-link" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>Settings</a>
        <a href="#" className="dropdown-link" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>Log Out</a>
      </div>
    </nav>
  );
}

export default Navbar;
