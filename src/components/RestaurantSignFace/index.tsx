import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import restauarnt from '../../Logos/restaurant-interior.jpg'
import './index.css'

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width:35%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
  animation: backgroundAnimation 10s ease infinite;
  
  @keyframes backgroundAnimation {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color:Red;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Change the background color on hover */
  }
`;

const RestaurantRegister: React.FC = () => {
  const navigate = useNavigate()
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('')
  const [location, setLocation] = useState('')
  const [style, setStyle] = useState('')
  const [status, setStatus] = useState('SignIn')

  const handleRestRegister = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ restaurantName, email, password, mobile,location,style }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }

    }
    const res = await fetch(`https://chefcollabapi.onrender.com/RestRegister`, options)
    console.log(res)
    if (res.status === 200) {
      const data = await res.json()
      console.log(data)
      // alert('Success..!')
      // Cookies.set('user_details',{token:data.jwt_token,userType:'Restaurant'},{expires:1})
      Cookies.set('jwt_token', data.jwt_token, { expires: 1 })
      Cookies.set('user_type', 'Restaurant', { expires: 1 })
      navigate('/RestHome', { replace: true })
    } else {
      const data = await res.json()
      console.log(data)
      alert(data.error)
    }
  };

  const handleRestSign = async () => {
    if (email === "" || password === "") {
      alert('Please give valid inputs')
    } else {

      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
      const res = await fetch(`https://chefcollabapi.onrender.com/RestLogin`, options)
      console.log(res)
      if (res.status === 200) {
        const data = await res.json()
        console.log(data)
        // alert('Login Success ..!')
        navigate('/RestHome', { replace: true })
        Cookies.set('jwt_token', data.jwt_token, { expires: 1 })
        Cookies.set('user_type', 'Restaurant', { expires: 1 })
      } else {
        console.log('Restaurant Not Found')
        const data = await res.json()
        alert(data.data)
      }
    }
  }

  const renderInterface = () => {
    switch (status) {
      case 'Register':
        return <Container >
          <Title>Restaurant Registration</Title>
          <Input
            type="text"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="mobile"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Input
            type="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="style"
            placeholder="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
          <Button onClick={handleRestRegister}>Register</Button>
          <p className='text-secondary mt-3' style={{ fontSize: 12 }}>Already had account?<button className='signup-btn' onClick={() => setStatus('SignIn')}>Sign In</button></p>

        </Container>

      case 'SignIn':
        return <Container >
          <Title>Restaurant Login</Title>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRestSign}>Sign In</Button>
          <p className='text-secondary mt-3' style={{ fontSize: 12 }}>Didn't have account?<button className='signup-btn' onClick={() => setStatus('Register')}>Register</button></p>

        </Container>
    }
  }

  return (
    <MainContainer className="cont">
      {renderInterface()}
    </MainContainer>
  );
};

export default RestaurantRegister;
