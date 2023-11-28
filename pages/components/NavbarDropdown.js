import React, { useState } from 'react';

const NavbarDropdown = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="nav-item">
      <a
        className={`nav-link ${isOpen ? 'active' : ''}`}
        href="#"
        onClick={toggleDropdown}
        data-toggle="collapse"
        aria-expanded={isOpen ? 'true' : 'false'}
        data-target="#submenu-1"
        aria-controls="submenu-1"
      >
        {title}
        {isOpen ? (
          <i className="fa fa-fw fa-caret-up" />
        ) : (
          <i className="fa fa-fw fa-caret-down" />
        )}
        <span className={`badge ${isOpen ? 'badge-success' : ''}`}>6</span>
      </a>
      <div
        id="submenu-1"
        className={`collapse submenu ${isOpen ? 'show' : ''}`}
        style={{}}
      >
        <ul className="nav flex-column">
          {links && links.map((link, index) => (
            <li key={index} className="nav-item">
              <a className="nav-link" href={link.url}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NavbarDropdown;
