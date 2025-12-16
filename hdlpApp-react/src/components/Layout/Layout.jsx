import { useEffect, useState } from 'react';
import Navbar from '../Navigation/Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout({ children, userType = 'Parent' }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div id="content">
      <button 
        onClick={scrollToTop} 
        id="myBtn" 
        title="Go to top"
        style={{ display: showScrollTop ? 'block' : 'none' }}
      >
        Top
      </button>
      
      <Navbar userType={userType} />
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
