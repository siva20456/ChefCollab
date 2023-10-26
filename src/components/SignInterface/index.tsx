import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './SignInterface.css';

interface ChefFormData {
    name: string;
    email: string;
    password: string;
    specialty: string;
}

const initialFormData: ChefFormData = {
    name: '',
    email: '',
    password: '',
    specialty: '',
};

function SignInterface() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<ChefFormData>(initialFormData);
    const [status, setStatus] = useState<String>('SignIn')
    const [mail, setMail] = useState<String>('')
    const [password, setPassword] = useState<String>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const res = await fetch(`http://localhost:3005/register`, options)
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
            const res = await fetch(`http://localhost:3005/login`, options)
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
                    <div className="form-group">
                        <label className='label' htmlFor="name">Name:</label>
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
