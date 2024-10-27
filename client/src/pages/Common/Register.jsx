import React, { useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { FaRegEnvelope, FaKey, FaUser } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const location = useLocation()
    const [data, setData] = useState(
        {
            username: '',
            email: '',
            password: '',
            role: location.state.role
        })


    const handleUsername = (e) => {
        setData({ ...data, username: e.target.value })
    }
    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value })
    }
    const handlePassword = (e) => {
        setData({ ...data, password: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.email.length === 0 || data.password.length === 0 || data.username.length === 0) {
            toast.error('Fill out empty fields')
            return
        }

        if(data.password.length < 6){
            toast.error('Password must be at least 6 characters')
            return
        }

        // Register api call 

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3A1xOtn35B8OK_anEKuIfdNTTUMaKStB4R.oCaZb3eqBDKxc97GUR1iBXJMrPrvXyByWJPIcXT3zlA");

        const raw = JSON.stringify({
            "email": data.email,
            "password": data.password,
            "role": data.role,
            "username": data.username,
            "status": true
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (!result.status) {
                    toast.error(result.message)
                }
                else {
                    toast.success(result.message)
                    console.log(result)
                    // navigate('../user/plans')

                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Toaster />
            <div className="topbar py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
                        <h5 className="logo-text color-primary fw-bold ms-2">TRIP-BIDDER</h5>
                    </div>
                </div>
            </div>

            <section className='register'>
                <div className="register-container">
                    <div className="content">
                        {/* <img src={Logo} alt="" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>

                        <h3 className='color-primary fw-bolder'>REGISTER</h3>
                        <p className="paragraph mt-1">Create Your A ccount</p>
                    </div>

                    <form action="" className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Username</label>
                            <div className="myinput">
                                <input type="text" value={data.username} onChange={handleUsername} maxLength="30" />
                                <FaUser className='input-icon' />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <div className="myinput">
                                <input type="email" value={data.email} onChange={handleEmail} maxLength="50" />
                                <FaRegEnvelope className='input-icon' />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <div className="myinput">
                                <input type="password" value={data.password} onChange={handlePassword} />
                                <FaKey className='input-icon' maxLength="20" />
                            </div>
                        </div>
                        <button className="btn-custom float-end mb-3" style={{ width: "100%" }}>Register</button>
                        <p className='text-start'>Already have Account? <Link to='/login' className='color-primary'>Login</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}
