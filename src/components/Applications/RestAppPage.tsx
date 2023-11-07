import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import ChefCard from '../RestHome/ChefCard';
import Header from '../RestHome/Header';

import { ThreeDots } from 'react-loader-spinner';

import defaultChef from '../../Logos/defaultChef.png'

type Request = {
    rest_name: string;
    rest_mail: string;
    rest_location: string;
    rest_style: string;
    chef_name: string;
    chef_mail: string;
    chef_location: string;
    chef_style: string;

};

const sampleData = {
    rest_name: '', rest_mail: '', rest_location: '', rest_style: '', chef_name: '', chef_mail: '', chef_location: '', chef_style: ''
}




const RestApplicationsPage: React.FC = () => {

    const [requests, setRequests] = useState<Request[]>([sampleData])
    const [loading, setLoading] = useState(true)
    const jwt_token = Cookies.get('jwt_token')
    const user_type = Cookies.get('user_type');
    const nav = useNavigate()

    useEffect(() => {
        if (user_type != 'Restaurant' || jwt_token === null) {
            nav('/', { replace: true })
        } else {
            getRequests()
        }

    }, [])

    const getRequests = async () => {
        setLoading(true)
        const url = 'http://localhost:3005/getRequests'

        const infoResp = await fetch(url)
        if (infoResp.status === 200) {
            const data = await infoResp.json()
            console.log(data, 'data')
            const reqData = data.data.filter((e:any) => e.rest_mail === Cookies.get('mail'))
            setRequests(reqData)
            setLoading(false)
        } else {
            alert('Error Occured. Please try Again..!')
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
            <div style={{ marginTop: 200, padding: 20 }}>
                <div className="row col-12 justify-content-center">
                    <h4 className="text-success" style={{ fontSize: 30 }}>Applications</h4>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>

                <ul style={{display:'flex',flexDirection:'row',flexWrap:'wrap',padding:30}}>
                    {requests.map((request: Request) => {
                        const obj = { username: request.chef_name, specialty: request.chef_style, imageUrl: defaultChef, mail: request.chef_mail, f_name: request.chef_name, l_name: '', location: request.chef_location }
                        return (
                            <ChefCard key={request.rest_name} {...obj} />
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <>
            <Header />
            {renderContext()}
        </>
    );
};



export default RestApplicationsPage;
