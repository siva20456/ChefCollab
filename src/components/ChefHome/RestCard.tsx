import React from 'react';
import './Styles.css';

interface RestCardProps {
  name: string;
  email: string;
  style: string;
  mobile: string;
  location: string;
  imageUrl: string;
}

const RestCard: React.FC<RestCardProps> = ({ name,style, imageUrl, email,mobile,location}) => {
  console.log(name,email, mobile,location)
  return (
    <div className="chef-card">
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{style}</p>
        <button className='btn-danger'>Portfolio</button>
      </div>
    </div>
  );
};

export default RestCard;
