import React from 'react';
import Logo from '../../Logos/LogoWithoutBg.png'
import './Styles.css';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header: React.FC = () => {

  const nav = useNavigate()
  const Logout = () => {
    Cookies.remove('name')
    Cookies.remove('jwt_token')
    Cookies.remove('user_type')
    Cookies.remove('mail')
    Cookies.remove('restMail')
    nav('/',{replace:true})
  }

  
  return (
    <header className="header fixed-top">
        <img src={Logo} className='logo' />
      <nav>
        <ul>
          <li><a href="/RestHome">Home</a></li>
          <li><a href="/RestPortfolio">My Portfolio</a></li>
          <li><a href="/RestApplications">Applications</a></li>
          <li><a onClick={Logout} style={{cursor:'pointer'}}>Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
