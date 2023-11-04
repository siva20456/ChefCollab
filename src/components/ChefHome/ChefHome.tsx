import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Header from './Header';
import SearchBar from './SearchTab';
import RestCard from './RestCard';
import Notification from './Notification';
import './Styles.css';

import restaurant1 from '../../Logos/restaurant1.png'
import restaurant2 from '../../Logos/restaurant2.png'
import restaurant3 from '../../Logos/restaurant3.png'
import restaurant4 from '../../Logos/restaurant4.png'

const restaurants = [restaurant1, restaurant2, restaurant3, restaurant4]


interface Restaurant {
  name: string;
  style: string;
  imageUrl: string;
  email: string;
  password: string;
  mobile: string;
  location: string;
}


function ChefHome() {
  const [ResList, setRestList] = useState<Restaurant[]>([])
  const [filteredRests, setFilteredRests] = useState<Restaurant[]>([])
  const [Notifies,setNotifies] = useState(false)
  const jwt_token = Cookies.get('jwt_token');
  const user_type = Cookies.get('user_type');
  const nav = useNavigate()
  if (user_type != 'Chef' || jwt_token === null) {
    nav('/', { replace: true })
  }

  useEffect(() => {
    const user_portfolio  = getPersonalData()
    getRestData(user_portfolio)
  }, [])

  const getPersonalData = async () => {
    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${jwt}`
      }
    }

    const url = 'http://localhost:3005/getInfo'
    const response = await fetch(url,options)
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const { user_data, user_portfolio } = data
      return user_portfolio
    }
  }

  const getRestData = async (user_portfolio:any) => {
    const url = 'http://localhost:3005/restData'
    const response = await fetch(url)
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const restData = data.map((e: Restaurant) => {

        return ({ ...e, imageUrl: restaurants[Math.floor(Math.random() * 4)] })
      })
      if(!user_portfolio.isCompleted){
        setNotifies(true)
      }
      setRestList(restData)
      setFilteredRests(restData)
    }
  }

  const handleSearch = (category: string, text: string) => {
    var rests: Restaurant[] = ResList
    switch (category) {
      case 'Location':
        rests = ResList.filter(each => each.location.includes(text));
        break;
      case 'Name':
        rests = ResList.filter(each => each.name.includes(text));
        break
      case 'Specialty':
        rests = ResList.filter(each => each.style.includes(text));
        break
      default:
        break;
    }
    setFilteredRests(rests)
    console.log('rests')
  };


  return (
    <div className="Home">
      {Notifies && <Notification message={`Hello Chef, Complete your protfolio for better recommendations..!`} type='success' />}
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className="chef-list">
        {filteredRests.map((rest, index) => (
          <RestCard key={index} {...rest} />
        ))}
      </div>

    </div>
  );
}

export default ChefHome;

// export default <div>Hi</div>
