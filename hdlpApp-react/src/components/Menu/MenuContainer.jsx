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
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <main id="menu" key={index}>
          <ul>
            {renderMenuItem(item)}
          </ul>
        </main>
      ))}
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
