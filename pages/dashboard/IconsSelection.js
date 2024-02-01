// pages/fontawesome.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import Admin from '../layouts/Admin';

const FontAwesomePage = () => {
  const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
  const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <Admin>
      <div className='container-fluid my-5'>
        <h1>Font Awesome Icons</h1>
        {selectedIcon && (
          <div className="mt-3">
            <FontAwesomeIcon icon={selectedIcon.icon} size="3x" className="selected-icon" />
            <p className="mt-2">Selected Icon: {selectedIcon.name}</p>
          </div>
        )}
        <div className="icon-container card d-flex flex-wrap" style={{ width: '1440px', height: '400px', overflowY: 'auto' }}>
          {[...solidIcons, ...brandIcons].map((item, index) => (
            <div
              key={index}
              className={`icon-item ${selectedIcon && selectedIcon.name === item.name ? 'text-primary' : ''}`}
              onClick={() => handleIconClick(item)}
            >
              <FontAwesomeIcon icon={item.icon} size="4x" className="icon m-2" />
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
};

export default FontAwesomePage;
