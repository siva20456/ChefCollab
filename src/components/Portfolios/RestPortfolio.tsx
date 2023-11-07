import React, { useState, useEffect } from "react"
import { Button, Label, Col, Row } from 'reactstrap';
import Header from "../RestHome/Header";
import Cookies from "js-cookie";

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
    other: ''
}


const Portfolio: React.FC = () => {

    const [portfolio, setPortfolio] = useState<Portfolio>(samplePortfolio)
    const [data, setData] = useState<Data>(sampleData)
    const jwt_token = Cookies.get('jwt_token') 
    const [otp,setOtp] = useState('')
    const [inputOTP,setInputOtp] = useState('')
    const [loading,setLoading] = useState(true)
    const [mailVerification,setMailVerification] = useState(true)

    useEffect(() => {
        getPersonalData()
    }, [])

    const getPersonalData = async () => {
        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${jwt_token}`
            }
        }

        const url = `http://localhost:3005/getRestInfo`
        const infoResp = await fetch(url, options)
        if (infoResp.status === 200) {
            const data = await infoResp.json()
            console.log(data, 'data')
            const { user_data, user_portfolio } = data
            setData(user_data)
            setPortfolio(user_portfolio)
        }
    }

    const handleReq = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const new_obj = { ...portfolio }
        if (name === 'exp') {
            new_obj.req.exp = value
        } else {
            new_obj.req.rate = value
        }
        setPortfolio(new_obj)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const new_obj = { ...portfolio }
        switch (name) {
            case 'location':
                new_obj['location'] = value
                break;
            case 'style':
                new_obj['style'] = value
                break;
            case 'location':
                new_obj['location'] = value
                break;
            case 'avgCust':
                new_obj['avgCust'] = parseInt(value)
                break;
            case 'salaryMargin':
                new_obj['salaryMargin'] = value
                break;
            case 'other':
                new_obj['other'] = value
                break;
            case 'desc':
                new_obj['desc'] = value
                break;
            default:
                break;
        }
        setPortfolio(new_obj)
    };

    const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const new_data = { ...data }
        new_data.mobile = value
        setData(new_data)
    }

    const handleOTP = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setInputOtp(value)
    }

    const sendMailOtp = async() => {
        const {mail} = data
        const url = `https://orent.onrender.com/verifyMail`
        const options = {
            method:'POST',
            headers:{
              "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({mail})
        }
        const res = await fetch(url,options)
        // console.log(res)
        if(res.ok){
            const resData = await res.json()
            // console.log(resData,'otp')
            setOtp(resData.otp)
        }
    }

    const verifyOtp = () => {
        if(parseInt(otp) === parseInt(inputOTP)){
            console.log('OK')
            setMailVerification(true)
            alert('Verified Successfully')
        }else{
            alert('Invalid OTP, try again by sending it.')
        }
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        var completion = true
        if(data.mobile == '' || portfolio.location == '' || portfolio.avgCust == 0 || portfolio.desc == '' || portfolio.other == '' || portfolio.salaryMargin == '' || portfolio.style == ''){
            completion = false
        }
        if(!mailVerification){
            completion = false
        }
        const options = {
            method: "POST",
            body: JSON.stringify({data,portfolio:{...portfolio,isCompleted:completion,mailVerification}}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${jwt_token}`
            }
        }
        const res = await fetch(`http://localhost:3005/updateRestPortfolio`, options)
        console.log(res)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            alert('Data Updated Successfully')
        } else {
            const data = await res.json()
            console.log(data)
            alert(data.error)
        }
    }


    return (

        <>
            <Header />
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
                                        value={data.name}
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
                                <Col md={4}><button type="button" onClick={sendMailOtp} style={{backgroundColor:'blue',color:'white',padding:5,border:'none',cursor:'pointer'}} >Send OTP</button></Col>
                                <Col md={4}>
                                    <input type='text' role="otp" id="otp" name="otp"
                                        className="form-control" placeholder="00000" onChange={handleOTP}
                                    />
                                </Col>
                                <Col md={4}><button onClick={verifyOtp} type="button" style={{backgroundColor:'blue',color:'white',padding:5,border:'none',cursor:'pointer'}}>Verify</button></Col>
                            </Row>}
                            <Row className="form-group">
                                <Label htmlFor="mobile" md={3}>Mobile:</Label>
                                <Col md={9}>
                                    <input type='text' role="mobile" id="mobile" name="mobile"
                                        className="form-control"
                                        defaultValue={data.mobile}
                                        onChange={handleMobile}
                                    />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="location" md={3}>Location (Nearest City):</Label>


                                <Col md={9}>
                                    <input type='text' role="location" id="location" name="location" placeholder="E.g. Hyderabad"
                                        className="form-control" list="data" defaultValue={portfolio.location} onChange={handleChange} />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="style" md={3}>Cuisine Style:</Label>
                                <Col md={9}>
                                    <input type='text' role="style" id="style" name="style" placeholder="E.g. South Indian"
                                        className="form-control" defaultValue={portfolio.style} onChange={handleChange} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="avgCust" md={8}>Avg. No of Customers (Per Month):</Label>
                                <Col md={4}>
                                    <input type='text' role="avgCust" id="avgCust" name="avgCust"
                                        placeholder="20,000" className="form-control" defaultValue={portfolio.avgCust} onChange={handleChange} />
                                </Col>

                            </Row>



                            <Row className="form-group">
                                <Label htmlFor="salaryMargin" md={4}>Salary Margin:</Label>
                                <Col md={6}>
                                    <input type='text' role="salaryMargin" id="salaryMargin" name="salaryMargin" placeholder="30k - 50k"
                                        className="form-control" defaultValue={portfolio.salaryMargin} onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="other" md={6}>Other Cuisines Offering:</Label>
                                <Col md={9} defaultValue={portfolio.other}>
                                    <select role="other" id="other" name="other"
                                        className="form-control" placeholder="E.g. IndoChinese" onChange={handleChange}>
                                        <option value="" selected disabled>Choose here</option>
                                        <option>Indian</option>
                                        <option>Mexican</option>
                                        <option>Indo-Chinese</option>
                                        <option>North Styles</option>
                                        <option>Western</option>
                                    </select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="req" md={9}>Basic Requirements Looking For:</Label>
                            </Row>









                            <Row className="form-group">

                                <Col md={5}>
                                    <input type='text' role="exp" id="exp" name="exp"
                                        className="form-control" placeholder="Basic Experience" defaultValue={portfolio.req.exp} onChange={handleReq} />
                                </Col>
                                <Col md={5}>
                                    <input type='text' role="rate" id="rate" name="rate"
                                        className="form-control" placeholder="Basic Rating" defaultValue={portfolio.req.rate} onChange={handleReq} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="desc" md={3}>Description:</Label>
                                <Col md={9}>
                                    <textarea rows={10} role="desc" id="desc" name="desc" defaultValue={portfolio.desc} onChange={handleChange}

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
        </>
    );
}

export default Portfolio