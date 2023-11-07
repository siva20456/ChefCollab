import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

interface RestCardProps {
  name: string;
  email: string;
  style: string;
  // mobile: string;
  location: string;
  imageUrl: string;
}

const RestCard: React.FC<RestCardProps> = ({ name,style, imageUrl, email,location}) => {
  console.log(name,email,location)
  return (
    <div className="chef-cont shadow">
      <img src={imageUrl} alt={name} />
      <div>
        <h3 style={{fontSize:18}}>{name}</h3>
        <p>{style} || {location}</p>
        <Link to={`/restDetail/${name}`}><button className='btn-danger'>Portfolio</button></Link>
      </div>
    </div>
  );
};

export default RestCard;
