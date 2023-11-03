import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Header from './Header';
import SearchBar from './SearchTab';
import ChefCard from './ChefCard';
import './Styles.css';
import chefFemale from '../../Logos/chefFemale.png'
import chefFemale2 from '../../Logos/chefFemale2.png'
import chefFemale3 from '../../Logos/chefFemale3.png'
import chefMale1 from '../../Logos/chefMale1.png'
import chefMale2 from '../../Logos/chefMale2.png'
import chefMale3 from '../../Logos/chefMale3.png'

const femaleChefs = [chefFemale, chefFemale2, chefFemale3]
const maleChefs = [chefMale1, chefMale2, chefMale3]

interface Chef {
  username: string;
  specialty: string;
  imageUrl: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  age: number;
  mobile: string;
  location: string;
  gender: string;
}


function Home() {
  const [chefList, setChefList] = useState<Chef[]>([])
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([])
  const jwt_token = Cookies.get('jwt_token');
  const user_type = Cookies.get('user_type');
  const nav = useNavigate()
  if (user_type != 'Restaurant' || jwt_token === null) {
    nav('/', { replace: true })
  }

  useEffect(() => {

    getChefData()
  }, [])

  const getChefData = async () => {
    const url = 'http://localhost:3005/chefData'
    const response = await fetch(url)
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const chefData = data.map((e: Chef) => {
        if (e.gender === 'male') {
          return ({ ...e, imageUrl: maleChefs[Math.floor(Math.random() * 3)] })
        }
        return ({ ...e, imageUrl: femaleChefs[Math.floor(Math.random() * 3)] })
      })
      setChefList(chefData)
      setFilteredChefs(chefData)
    }
  }

  const handleSearch = (category: string, text: string) => {
    var chefs: Chef[] = chefList
    switch (category) {
      case 'Location':
        chefs = chefList.filter(each => each.location.includes(text));
        break;
      case 'Name':
        chefs = chefList.filter(each => each.username.includes(text));
        break
      case 'Specialty':
        chefs = chefList.filter(each => each.specialty.includes(text));
        break
      default:
        break;
    }
    setFilteredChefs(chefs)
    console.log('chefs')
  };


  return (
    <div className="Home">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className="chef-list">
        {filteredChefs.map((chef, index) => (
          <ChefCard key={index} {...chef} />
        ))}
      </div>
    </div>
  );
}

export default Home;
