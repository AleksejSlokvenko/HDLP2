import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuContainer.css';

/**
 * Reusable MenuContainer component
 * Renders a horizontal scrollable menu with nested submenus
 * 
 * @param {Array} menuItems - Array of menu item objects
 * Each menu item object should have:
 * - label: string - The display text
 * - link: string (optional) - The href for the menu item
 * - submenu: Array (optional) - Nested submenu items with same structure
 */
function MenuContainer({ menuItems }) {
  const menuRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!menuRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Set up scroll listener and initial check
  useEffect(() => {
    checkScroll();
    const menuElement = menuRef.current;
    
    if (menuElement) {
      menuElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      // Hide scroll hint after first interaction
      const hideHint = () => setShowScrollHint(false);
      menuElement.addEventListener('scroll', hideHint, { once: true });
      menuElement.addEventListener('touchstart', hideHint, { once: true });
      
      return () => {
        menuElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  // Scroll left/right handlers
  const scroll = (direction) => {
    if (!menuRef.current) return;
    const scrollAmount = 300;
    menuRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Recursive function to render menu items and their submenus
  const renderMenuItem = (item, level = 1) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    
    return (
      <li key={item.label}>
        <a href={item.link || '#'}
           target={item.isExternal ? '_blank' : undefined}
           rel={item.isExternal ? 'noopener noreferrer' : undefined}>
          {item.label}
        </a>
        {hasSubmenu && (
          <ul>
            {item.submenu.map(subItem => renderMenuItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="menu-wrapper">
      {showLeftArrow && (
        <button 
          className="scroll-arrow scroll-arrow-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}
      
      <div className="menu-container" ref={menuRef}>
        {showScrollHint && <div className="scroll-hint">← Scroll →</div>}
        {menuItems.map((item, index) => (
          <main className="menu-line-item" key={index}>
            <ul>
              {renderMenuItem(item)}
            </ul>
          </main>
        ))}
      </div>
      
      {showRightArrow && (
        <button 
          className="scroll-arrow scroll-arrow-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}

MenuContainer.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
      isExternal: PropTypes.bool,
      submenu: PropTypes.arrayOf(PropTypes.object)
    })
  ).isRequired
};

export default MenuContainer;
