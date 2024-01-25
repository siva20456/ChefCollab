import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './SignInterface.css';

import restaurant from '../../Logos/restaurant-interior.jpg'

interface ChefFormData {
    name: string;
    email: string;
    password: string;
    specialty: string;
    fname: string;
    lname: string;
    age: number;
    mobile: string;
    location: string;
    gender: string;
}

const initialFormData: ChefFormData = {
    name: '',
    email: '',
    password: '',
    specialty: '',
    fname: '',
    lname: '',
    age: 0,
    mobile: '',
    location: '',
    gender:'male',
};

function SignInterface() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<ChefFormData>(initialFormData);
    const [status, setStatus] = useState<String>('SignIn')
    const [mail, setMail] = useState<String>('')
    const [password, setPassword] = useState<String>('')


    useEffect(() => {
        const jwt_token = Cookies.get('jwt_token');
        const user_type = Cookies.get('user_type')
        console.log(user_type)
        if (user_type == 'Chef') {
            //need to check authorization

            navigate('/ChefHome', { replace: true })
        } else if (user_type == 'Restaurant') {
            //need to  check Auth

            navigate('/RestHome', { replace: true })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add code to handle form submission here
        console.log(formData);
        const options = {
            method: "POST",
            body: JSON.stringify({ ...formData }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        }
        const res = await fetch(`https://chefcollabapi.onrender.com/register`, options)
        console.log(res)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            // const {history} = this.props
            // history.replace('/',{loader:true})
            // alert('Success..!')
            Cookies.set('jwt_token', data.jwt_token, { expires: 1 })
            Cookies.set('user_type', 'Chef', { expires: 1 })
            navigate('/ChefHome', { replace: true })
        } else {
            const data = await res.json()
            console.log(data)
            alert(data.error)
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (mail === "" || password === "") {
            alert('Please give valid inputs')
        } else {

            const options = {
                method: 'POST',
                body: JSON.stringify({ mail, password: password }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
            const res = await fetch(`https://chefcollabapi.onrender.com/login`, options)
            console.log(res)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                // alert('Login Success ..!')

                Cookies.set('jwt_token', data.jwt_token, { expires: 1 })
                Cookies.set('user_type', 'Chef', { expires: 1 })
                navigate('/ChefHome', { replace: true })
            } else {
                console.log('User Not Found')
                const data = await res.json()
                alert(data.data)
            }
        }
    }

    const renderForm = () => {
        switch (status) {
            case 'Register':
                return <form className="registration-form" onSubmit={handleRegisterSubmit}>
                    <h2>Chef Registration</h2>
                    <div className='form-cont'>
                        <div className="form-group">
                            <label className='label' htmlFor="fname">First Name:</label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="lname">Last Name:</label>
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="name">Username:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="age">Age:</label>
                            <input
                                type='number'
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="gender">Gender:</label>
                            <select className='input-ele' id='gender' name='gender' value={formData.gender} onChange={handleChange} required>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="mobile">Mobile Number:</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="specialty">Specialty:</label>
                            <input
                                type="text"
                                id="specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                    <p className='text-secondary mt-2' style={{ fontSize: 12 }}>Already had account?<button className='signup-btn' onClick={() => setStatus('SignIn')}>Sign In</button></p>

                </form>

            case 'SignIn':
                return <form className="registration-form" onSubmit={handleLoginSubmit}>
                    <h2>Chef Account</h2>
                    <div className="form-group">
                        <label className='label' htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={e => setMail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        SignIn
                    </button>
                    <p className='text-secondary mt-2' style={{ fontSize: 12 }}>Didn't have account?<button className='signup-btn' onClick={() => setStatus('Register')}>Register</button></p>
                </form>

            default:
                break;
        }
    }

    return (
        <div className="registration-form-container">
            {renderForm()}
        </div>
    );
}

export default SignInterface;
