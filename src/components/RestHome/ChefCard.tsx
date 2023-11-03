import React from 'react';
import './Styles.css';

interface ChefCardProps {
  username: string;
  email: string;
  specialty: string;
  fname: string;
  lname: string;
  age: number;
  mobile: string;
  location: string;
  gender: string;
  imageUrl: string;
}

const ChefCard: React.FC<ChefCardProps> = ({ username, specialty, imageUrl, email, fname,lname,age,mobile,location,gender}) => {
  console.log(username,email, fname,lname,age,mobile,location,gender)
  return (
    <div className="chef-card">
      <img src={imageUrl} alt={username} />
      <div>
        <h3>{username}</h3>
        <p>{specialty}</p>
        <button className='btn-danger'>Portfolio</button>
      </div>
    </div>
  );
};

export default ChefCard;
