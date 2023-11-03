import React from 'react';
import Logo from '../../Logos/LogoWithoutBg.png'
import './Styles.css';

const Header: React.FC = () => {
  return (
    <header className="header fixed-top">
        <img src={Logo} className='logo' />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">My Portfolio</a></li>
          <li><a href="/about">Applications</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
