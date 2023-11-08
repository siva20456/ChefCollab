import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

interface ChefCardProps {
  username: string;
  mail: string;
  specialty: string;
  f_name: string;
  l_name: string;
  location: string;
  imageUrl: string;
}

const ChefCard: React.FC<ChefCardProps> = ({ username, specialty, imageUrl, mail, f_name,l_name,location}) => {
  console.log(username,mail, f_name,l_name,location,specialty)
  return ( 
    <div className="chef-cont shadow">
      <img src={imageUrl} alt={username} />
      <div>
        <h3 style={{fontSize:16}}>{f_name} {l_name}</h3>
        <p >{specialty} || {location}</p>
        <Link to={`/chefDetail/${username}`}><button className='btn-danger'>Portfolio</button></Link>
      </div>
    </div>
  );
};

export default ChefCard;
