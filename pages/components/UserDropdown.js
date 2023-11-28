import React, { useState } from 'react';
import Image from 'next/image';

const UserDropdown = ({ username, links }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <li className={`nav-item dropdown nav-user ${isDropdownOpen ? 'show' : ''}`}>
      <a
        className="nav-link nav-user-img"
        href="#"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <img src="/images/avatar-1.jpg" alt="No Image Found" className="user-avatar-md rounded-circle" />
      </a>
      <div className={`dropdown-menu dropdown-menu-right nav-user-dropdown ${isDropdownOpen ? 'show' : ''}`}>
        <div className="nav-user-info">
          <h5 className="mb-0 text-white nav-user-name">{username}</h5>
          <span className="status"></span>
          
        </div>
        {links && links.map((link, index) => (
          <a key={index} className="dropdown-item py-4 px-3" href={link.url}>
            {link.icon && <i className={`fas ${link.icon} mr-2`}></i>}
            {link.text}
          </a>
        ))}

      </div>
      {isDropdownOpen && (
        <div className="backdrop" onClick={closeDropdown}></div>
      )}
      <style jsx>{`
        .dropdown-menu {
          display: ${isDropdownOpen ? 'block' : 'none'};
        }
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 999;
        }
      `}</style>
    </li>
  );
};

export default UserDropdown;


