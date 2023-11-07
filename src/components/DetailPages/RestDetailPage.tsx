import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { AiOutlineStar } from 'react-icons/ai'

import { IoLocationSharp } from 'react-icons/io5'

import { TiShoppingBag } from 'react-icons/ti'

import { ThreeDots } from "react-loader-spinner";


import Header from '../ChefHome/Header'
import Cookies from 'js-cookie'

import defaultRestuarant from '../../Logos/defaultRestaurant.png'

import './Styles.css'

interface Reqs {
  exp: string;
  rate: string;
}

interface Portfolio {
  name: string;
  mail: string;
  location: string;
  style: string;
  salaryMargin: string;
  req: Reqs;
  desc: string;
  mailVerification: boolean;
  avgCust: number;
  isCompleted: boolean;
  other: string;
  rating: number;
}

interface Data {
  name: string;
  mail: string;
  password: string;
  mobile: string;
}

const sampleData = {
  name: '',
  mail: '',
  password: '',
  mobile: ''
}

const samplePortfolio = {
  name: '',
  mail: '',
  location: '',
  style: '',
  salaryMargin: '',
  req: { exp: '', rate: '' },
  desc: '',
  mailVerification: false,
  avgCust: 0,
  isCompleted: false,
  other: '',
  rating: 0,
}



const RestDetailPage: React.FC = () => {

  const jwt_token = Cookies.get('jwt_token')
  const nav = useNavigate()
  const { name } = useParams<{ name: string }>()
  const [userData, setData] = useState<Data>(sampleData)
  const [portfolio, setPortfolio] = useState<Portfolio>(samplePortfolio)
  const [loading, setLoading] = useState(true)
  const user_type = Cookies.get('user_type');
  

  useEffect(() => {
    if (user_type != 'Chef' || jwt_token === null) {
      nav('/', { replace: true })
    }
    getRestDetail()
  }, [])

  const getRestDetail = async () => {
    setLoading(true)
    const url = 'http://localhost:3005/restDetail'
    const options = {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    const infoResp = await fetch(url, options)
    if (infoResp.status === 200) {
      const data = await infoResp.json()
      console.log(data, 'data')
      const { user_data, portfolio } = data
      setData(user_data)
      setPortfolio(portfolio)
      setLoading(false)
    } else {
      alert('Error Occured. Please try Again..!')
    }
  }

  const requestFor = async () => {
    const url = 'http://localhost:3005/addRequest'
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, mail: Cookies.get('mail') }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    const infoResp = await fetch(url, options)
    if (infoResp.status === 200) {
      const data = await infoResp.json()
      console.log(data, 'data')
      alert(data.data)
    } else {
      alert('Error Occured. Please try Again..!')
    }
  }

  const renderContext = () => {
    if (loading) {
      return <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 400 }}>
        <ThreeDots color=" #3b82f6" height="50" width="50" />
      </div>
    }
    return <div className="job-detail-bg">
      <div className="job-card shadow">
        <div className="job-logo-cont">
          <img
            src={defaultRestuarant}
            className="logoComp w-25"
            alt="job details company logo"
          />
          <div className="logo-name-cont">
            <h1 className="logo-name">{userData.name}</h1>
            <div className="star-cont">
              <AiOutlineStar className="star" />
              <p className="rating ml-2">{portfolio.rating}</p>
            </div>
          </div>
        </div>
        <div className="details-cont">
          <div className="right-det">
            <p className="det-cont">
              <IoLocationSharp />
              {portfolio.location}
            </p>
            <p className="det-cont">
              <TiShoppingBag />
              {portfolio.style}
            </p>
          </div>
          <div className="package-cont">
            <p className="salary">Salary Range: {portfolio.salaryMargin}</p>


          </div>
        </div>

        <hr className="h-break h-sp" />
        <div className="dec-cont">
          <h1 className="desc-text">Description</h1>
          {/* <a className="visit" href={job.companyWebsiteUrl}>
            Visit
          </a> */}
        </div>
        <p className="description">{portfolio.desc}</p>
        <p className="req">Requirements</p>
        <ul className="skill-cont">

          <li className="skill">
            <p className="desc-text" style={{ display: 'row' }}>Minimum Experience : {portfolio.req.exp} Years</p>
          </li>
          <li className='skill'>
            <p className="desc-text">Minimum Rating : {portfolio.req.rate} Star</p>
          </li>
        </ul>
        <button style={{ backgroundColor: 'green', color: 'white', padding: 5, border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }} onClick={requestFor}>Request</button>


      </div>


    </div>
  }

  return (
    <div>
      <Header />
      {renderContext()}
    </div>

  )
}

export default RestDetailPage