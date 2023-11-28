import React from 'react';
import Navbar from '../components/Navbar';
import Footerbar from '../components/Footerbar';

const Layout = ({ children }) => {
  return (
    <div className="wraper padded" style={{backgroundColor: '#fff'}}>
      <Navbar />
      <div className="main-container-second">
        {children}
      </div>
      
      <Footerbar />
    </div>
  );
};

export default Layout;
