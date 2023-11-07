import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { AiOutlineStar } from 'react-icons/ai'

import { IoLocationSharp } from 'react-icons/io5'

import { TiShoppingBag } from 'react-icons/ti'

import Header from '../RestHome/Header'
import Cookies from 'js-cookie'

import defaultChef from '../../Logos/defaultChef.png'

import './Styles.css'

interface Data {
  username: string;
  mail: string;
  password: string;
  mobile: number;
  exp_salary: number;
  experience: number;
  f_name: string;
  l_name: string;
  age: number;
  prev_salary: number;
  rating: number;
  relocate: boolean;
  location: string;
  specialty: string;
}

interface Portfolio {
  username: string;
  mail: string;
  desc: string;
  skills: string[];
  isCompleted: boolean;
}

const sampleData = {
  username: '',
  mail: '',
  password: '',
  mobile: 0,
  exp_salary: 0,
  experience: 0,
  f_name: '',
  l_name: '',
  age: 0,
  prev_salary: 0,
  rating: 0,
  relocate: false,
  location: '',
  specialty: ''
}

const samplePortfolio = {
  username: '',
  mail: '',
  desc: '',
  skills: [],
  isCompleted: false
}


const ChefDetailPage: React.FC = () => {

  const jwt_token = Cookies.get('jwt_token')
  const nav = useNavigate()
  const { username } = useParams<{ username: string }>()
  const [userData, setData] = useState<Data>(sampleData)
  const [portfolio, setPortfolio] = useState<Portfolio>(samplePortfolio)
  const [similarChefs, setChefs] = useState<Data[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getChefDetail()
  }, [])

  const getChefDetail = async () => {
    setLoading(true)
    const url = 'http://localhost:3005/chefDetail'
    const options = {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    const infoResp = await fetch(url, options)
    if (infoResp.status === 200) {
      const data = await infoResp.json()
      console.log(data, 'data')
      const { user_data, portfolio, similarChefs } = data
      setData(user_data)
      setPortfolio(portfolio)
      setChefs(similarChefs)
      setLoading(false)
    } else {
      alert('Error Occured. Please try Again..!')
      nav('/', { replace: true })
    }
  }

  const getDetails = async () => {
    const isRestMail = Cookies.get('restMail')
    if (!isRestMail) {
      alert('Complete Your Portfolio for recieving further details..')
    }
    else if (!portfolio.isCompleted) {
      alert('Chef did not Completed his/her portfolio. You will recieve once the other party Completed their portfolio.')
    } else {
      const url = 'http://localhost:3005/sendChefDetails'
      const options = {
        method: 'POST',
        body: JSON.stringify({ username,mail:Cookies.get('mail') }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
      const infoResp = await fetch(url, options)
      if (infoResp.status === 200) {
        const data = await infoResp.json()
        console.log(data, 'data')
        alert('Details Of Chef was sent to your Mail...!')
      } else {
        alert('Error Occured. Please try Again..!')
      }
    }


  }


  const renderContext = () => {
    if (loading) {
      return <div className='d-flex flex-column justify-content-grid'>
        Loading...
      </div>
    }
    return <div className="job-detail-bg">
      <div className="job-card shadow">
        <div className="job-logo-cont">
          <img
            src={defaultChef}
            className="logoComp w-25"
            alt="job details company logo"
          />
          <div className="logo-name-cont">
            <h1 className="logo-name">{userData.f_name} {userData.l_name}</h1>
            <div className="star-cont">
              <AiOutlineStar className="star" />
              <p className="rating ml-2">{userData.rating}</p>
            </div>
          </div>
        </div>
        <div className="details-cont">
          <div className="right-det">
            <p className="det-cont">
              <IoLocationSharp />
              {userData.location}
            </p>
            <p className="det-cont">
              <TiShoppingBag />
              {userData.specialty}
            </p>
          </div>
          <div className="package-cont">
            <p className="salary">Expected Salary : {userData.exp_salary}</p>
            <p className="salary">Previous Salary : {userData.prev_salary}</p>


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
        <p className="desc-text">Skills</p>
        <ul className="skill-cont">
          {portfolio.skills.map(e => (
            <li className="skill">
              {/* <img src={e.image_url} className="skill-img" alt={e.name} /> */}
              <p className="desc-text">{e}</p>
            </li>
          ))}
        </ul>
        {/* <h1 className="desc-text">Life at Company</h1>
        <div className="comp-life">
          <p className="description">{job.lifeAtCompany.description}</p>
          <img
            src={job.lifeAtCompany.image_url}
            className="campany-img"
            alt="life at company"
          />
        </div> */}
        <button style={{backgroundColor:'green',color:'white',padding:5,border:'none',cursor:'pointer',alignSelf:'flex-end'}} onClick={getDetails}>Get Details</button>
      </div>

      <ul className="similar-bg">
        <h1 className="desc-text" style={{ width: '100%' }}>
          Similar Jobs
        </h1>
        {similarChefs.map(e => (
          <li className="similar-job" key={e.username}>
            <div className="job-logo-cont">
              <img
                src={defaultChef}
                className="logoComp w-50"
                alt="similar job company logo"
              />
              <div className="logo-name-cont">
                <h1 style={{ fontSize: 15 }}>{e.f_name} {e.l_name}</h1>
                <div className="star-cont">
                  <AiOutlineStar className="star" />
                  <p className="rating">{e.rating}</p>
                </div>
              </div>
            </div>

            <div className="right-det">
              <p className="det-cont">
                <IoLocationSharp />
                {e.location}
              </p>
              <p className="det-cont">
                <TiShoppingBag />
                {e.specialty}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  }

  return (
    <div>
      <Header />
      {renderContext()}
    </div>

  )
}

export default ChefDetailPage