import React, { useState, useEffect } from "react"
import { Button, Label, Col, Row } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Header from "../ChefHome/Header";
import Cookies from "js-cookie";


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
    mailVerification: boolean;
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
    isCompleted: false,
    mailVerification: false

}


const ChefPortfolio: React.FC = () => {

    const [portfolio, setPortfolio] = useState<Portfolio>(samplePortfolio)
    const [data, setData] = useState<Data>(sampleData)
    const [otp, setOtp] = useState('')
    const [inputOTP, setInputOtp] = useState('')
    const [loading, setLoading] = useState(true)
    const [mailVerification, setMailVerification] = useState(true)
    const jwt_token = Cookies.get('jwt_token')
    const user_type = Cookies.get('user_type');
    const nav = useNavigate()
    

    useEffect(() => {
        if (user_type != 'Chef' || jwt_token === null) {
            nav('/', { replace: true })
        }
        getPersonalData()
    }, [])

    const getPersonalData = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${jwt_token}`
            }
        }

        const url = `https://chefcollabapi.onrender.com/getInfo`
        const infoResp = await fetch(url, options)
        if (infoResp.status === 200) {
            const data = await infoResp.json()
            console.log(data, 'data')
            const { user_data, user_portfolio } = data
            setData(user_data)
            setPortfolio(user_portfolio)
            setMailVerification(user_portfolio.mailVerification)
            setLoading(false)
        }
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const new_obj = { ...data }
        switch (name) {
            case 'location':
                new_obj['location'] = value
                break;
            case 'style':
                new_obj['specialty'] = value
                break;
            case 'rating':
                new_obj['rating'] = parseInt(value)
                break;
            case 'prev_salary':
                new_obj['prev_salary'] = parseInt(value)
                break;
            case 'exp_salary':
                new_obj['exp_salary'] = parseInt(value)
                break;
            case 'experience':
                new_obj['experience'] = parseInt(value)
                break;
            case 'age':
                new_obj['age'] = parseInt(value)
                break;
            case 'mobile':
                new_obj['mobile'] = parseInt(value)
                break;
            case 'relocate':
                new_obj['relocate'] = !new_obj['relocate']
                break;
            default:
                break;
        }
        setData(new_obj)
    };

    const handleSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const new_data = { ...portfolio }
        new_data.skills = value.split(',')
        setPortfolio(new_data)
    }

    const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const new_data = { ...portfolio }
        new_data.desc = value
        setPortfolio(new_data)
    }

    const handleOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputOtp(value)
    }

    const sendMailOtp = async () => {
        const { mail } = data
        const url = `https://chefcollabapi.onrender.com/verifyMail`
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ mail })
        }
        const res = await fetch(url, options)
        // console.log(res)
        if (res.ok) {
            const resData = await res.json()
            console.log(resData, 'otp')
            setOtp(resData.otp)
        }
    }

    const verifyOtp = () => {
        if (parseInt(otp) === parseInt(inputOTP)) {
            console.log('OK')
            setMailVerification(true)
            alert('Verified Successfully')
        } else {
            alert('Invalid OTP, try again by sending it.')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        var completion = true
        if (data.mobile == 0 || data.location == '' || data.exp_salary == 0 || portfolio.desc == '' || data.prev_salary == 0 || data.experience == 0 || data.specialty == '' || data.rating == 0) {
            completion = false
        }
        if (!mailVerification) {
            completion = false
        }

        const options = {
            method: "POST",
            body: JSON.stringify({ data, portfolio: { ...portfolio, isCompleted: completion, mailVerification } }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${jwt_token}`
            }
        }
        const res = await fetch(`https://chefcollabapi.onrender.com/updateChefPortfolio`, options)
        console.log(res)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            const new_obj = { ...portfolio, mailVerification: true }
            setPortfolio(new_obj)
            alert('Data Updated Successfully')
        } else {
            const data = await res.json()
            console.log(data)
            alert(data.error)
        }
    }

    const renderContext = () => {
        if (loading) {
            return (
                <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 400 }}>
                    <ThreeDots color=" #3b82f6" height="50" width="50" />
                </div>
            )
        }
        return (
            <div className="container" style={{ marginTop: 200 }}>
                <div className="row col-12 justify-content-center">
                    <h4 className="text-success" style={{ fontSize: 30 }}>Portfolio</h4>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center card2 wcu-card shadow ">
                    <div className="col-12 col-md-8">

                        <form className="create-form" onSubmit={handleSubmit}
                        >
                            <Row className="form-group">
                                <Label htmlFor="username" md={3}>Name:</Label>
                                <Col md={9}>
                                    <input type='text' role="username" id="username" name="username"
                                        className="form-control"
                                        value={data.username}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="mail" md={3}>Email:</Label>
                                <Col md={9}>
                                    <input type='text' role="mail" id="mail" name="mail"
                                        className="form-control"
                                        value={data.mail}
                                    />

                                </Col>
                            </Row>
                            {!portfolio.mailVerification && <Row className="form-group">
                                <Col md={4}><button type="button" onClick={sendMailOtp} style={{ backgroundColor: 'blue', color: 'white', padding: 5, border: 'none', cursor: 'pointer' }}>Send OTP</button></Col>
                                <Col md={4}>
                                    <input type='text' role="otp" id="otp" name="otp"
                                        className="form-control" onChange={handleOTP}
                                    />
                                </Col>
                                <Col md={4}><button onClick={verifyOtp} type="button" style={{ backgroundColor: 'blue', color: 'white', padding: 5, border: 'none', cursor: 'pointer' }}>Verify</button></Col>
                            </Row>}
                            <Row className="form-group">
                                <Label htmlFor="age" md={4}>Age:</Label>
                                <Col md={4}>
                                    <input type='text' role="age" id="age" name="age" placeholder="19"
                                        className="form-control" defaultValue={data.age} onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="mobile" md={3}>Mobile:</Label>
                                <Col md={9}>
                                    <input type='text' role="mobile" id="mobile" name="mobile"
                                        className="form-control"
                                        defaultValue={data.mobile}
                                        onChange={handleChange}
                                    />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="location" md={3}>Location (Nearest City):</Label>


                                <Col md={9}>
                                    <input type='text' role="location" id="location" name="location" placeholder="E.g. Hyderabad"
                                        className="form-control" list="data" defaultValue={data.location} onChange={handleChange} />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="specialty" md={3}>Cuisine Style:</Label>
                                <Col md={9}>
                                    <input type='text' role="specialty" id="specialty" name="specialty" placeholder="E.g. South Indian"
                                        className="form-control" defaultValue={data.specialty} onChange={handleChange} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="skills" md={8}>List Out the Skills that make you StandOut of Others :</Label>
                                <Col md={9}>
                                    <input type='text' role="skills" id="skills" name="skills" placeholder="E.g. Signature Dishes"
                                        className="form-control" defaultValue={portfolio.skills} onChange={handleSkills} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="experience" md={4}>Experience :</Label>
                                <Col md={6}>
                                    <input type='text' role="experience" id="experience" name="experience" placeholder=""
                                        className="form-control" defaultValue={data.experience} onChange={handleChange} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="prev_salary" md={8}>Previous Salary (Per Year):</Label>
                                <Col md={4}>
                                    <input type='text' role="prev_salary" id="prev_salary" name="prev_salary"
                                        placeholder="4" className="form-control" defaultValue={data.prev_salary} onChange={handleChange} />
                                </Col>

                            </Row>



                            <Row className="form-group">
                                <Label htmlFor="exp_salary" md={4}>Expected Salary (Per Year):</Label>
                                <Col md={6}>
                                    <input type='text' role="exp_salary" id="exp_salary" name="exp_salary" placeholder="3 - 5"
                                        className="form-control" defaultValue={data.exp_salary} onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="relocate" md={6}>Willing to Relocate for Offer:</Label>
                                <Col md={9} >
                                    <select role="relocate" id="relocate" name="relocate"
                                        className="form-control" onChange={handleChange}>
                                        <option value="" selected disabled>Choose here</option>
                                        <option>True</option>
                                        <option>False</option>
                                    </select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating:</Label>
                                <Col md={6}>
                                    <input type='text' role="rating" id="rating" name="rating" placeholder=""
                                        className="form-control" defaultValue={data.rating} onChange={handleChange} />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="desc" md={3}>Description:</Label>
                                <Col md={9}>
                                    <textarea rows={10} role="desc" id="desc" name="desc" defaultValue={portfolio.desc} onChange={handleDesc}

                                        className="form-control" placeholder="Describe about your bussiness with atleast 100 words." />
                                </Col>
                            </Row>



                            <Row className="form-group">
                                <Label htmlFor="addInfo" md={3}>Additional Info:</Label>
                                <Col md={9}>
                                    <textarea rows={5} role="addInfo" id="addInfo" name="addInfo"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group text-center">
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Button className="submit-btn" type="submit" value="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    return (

        <>
            <Header />
            {renderContext()}
        </>
    );
}

export default ChefPortfolio