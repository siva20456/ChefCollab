import React from 'react';
import Logo from '../../Logos/LogoWithoutBg.png'
import './Styles.css';

const Header: React.FC = () => {
  return (
    <header className="header fixed-top">
        <img src={Logo} className='logo' />
      <nav>
        <ul>
          <li><a href="/ChefHome">Home</a></li>
          <li><a href="/ChefPortfolio">My Portfolio</a></li>
          <li><a href="/about">My Applications</a></li>
          <li><a href="/about">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
