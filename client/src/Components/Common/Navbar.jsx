import React, { useEffect, useRef, useState } from 'react'
import profile from '../../assets/images/profile.jpg'
import { FaBars, FaEnvelope, FaGear, FaMoon, FaNoteSticky, FaPowerOff, FaSun, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import aiAnimation from '../../assets/ai-animation.json'
import axios from 'axios';
import { SERVER_URL } from '../../assets/data/secret';
import { FaUserCircle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import AILogo from '../../assets/images/ai-green-logo-fill.png'


export default function Navbar() {

    const [showNav, setShowNav] = useState(false)
    const [showdropdown, setShowdropdown] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})
    const [user, setUser] = useState({})

    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    const navigate = useNavigate()
    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
            setShowdropdown(false)
        }
    };

    const handleClickInside = () => setClickedOutside(false);


    const getUserData = (id, role) => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getUserDetails/${id}/${role}`)
            .then(response => {
                let apiResponse = response.data
                if (apiResponse.status) {
                    setUserData(apiResponse.data)
                }
                else {
                    console.log(apiResponse.message)
                }
            })
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            getUserData(user._id, user.role)
            setIsLoggedIn(true)
            setUser(user)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])


    const logout = () => {
        localStorage.removeItem('user')
        navigate('../')
        setIsLoggedIn(false)
    }


    return (
        <nav className='navbar'>
            <FaBars className='bars-icon' onClick={() => setShowNav(true)} />
            <FaXmark className={`cross-icon ${showNav ? 'show' : ''}`} onClick={() => setShowNav(false)} />
            <div className="container">
                <div className="split">
                    <Link to="../" className="logo d-flex align-items-center text-decoration-none" >
                        {/* <img src={Logo} alt="" width="50" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
                        <h5 className="logo-text ms-1">TRIP-BIDDER</h5>
                    </Link>
                    <div className={`nav-split ${showNav ? 'show' : ''}`}>

                        <ul className="links">
                            {
                                isLoggedIn ? (
                                    user.role === "agent" ? (
                                        <>
                                            <li className='link'>
                                                <Link to="../agent/" href="/">Home</Link>
                                            </li>
                                            <li className='link'>
                                                <Link to={`../agent/my-proposals`}>My Proposals</Link>
                                            </li>
                                            <li className='link'>
                                                <Link to={`../agent/chats`}>Messages</Link>
                                            </li>
                                        </>
                                    )
                                        : (
                                            <>
                                                <li className='link'>
                                                    <Link to="../user/plans" href="/">Home</Link>
                                                </li>
                                                <li className='link'>
                                                    <Link to={`../user/create-new-trip`}>Create New Trip</Link>
                                                </li>
                                                <li className='link'>
                                                    <Link to={`../user/chats`}>Messages</Link>
                                                </li>
                                            </>
                                        )
                                ) : (
                                    <></>
                                )
                            }

                        </ul>


                        {
                            !isLoggedIn ? (
                                <div className="account">
                                    <Link to="/login" className="">Login</Link>
                                    <Link to="/role" className="btn-nav text-white">Sign Up</Link>
                                </div>
                            ) : (
                                <div className="profile" >

                                    <div className="profile-image" onClick={() => { setShowdropdown(true) }}>
                                        <img src={userData.profileImage ? userData.profileImage : profile} alt="" />
                                    </div>


                                    {
                                        user.role === "agent" ? (
                                            <ul ref={myRef} onClick={handleClickInside} className={`profile-dropdown ${showdropdown ? 'show' : ''}`}>
                                                <Link to={`../agent/profile/${user && user._id}`} className="dropdown-item"><p className='dom-link'><FaUserCircle className='me-2 text-secondary' />Profile</p></Link>
                                                <Link to={`../agent/saved-plans`} className="dropdown-item"><p className='dom-link'><FaNoteSticky className='me-2 text-secondary' />Saved Trips</p></Link>
                                                <li className="dropdown-item" onClick={logout}><p className='dom-link'><FaPowerOff className='me-2 text-secondary' />Logout</p></li>

                                            </ul>
                                        )
                                            : (
                                                <ul ref={myRef} onClick={handleClickInside} className={`profile-dropdown ${showdropdown ? 'show' : ''}`}>
                                                    <Link to={`../user/profile`} className="dropdown-item"><p className='dom-link'><FaUserCircle className='me-2 text-secondary' />Profile</p></Link>
                                                    <li className="dropdown-item" onClick={logout}><p className='dom-link'><FaPowerOff className='me-2 text-secondary' />Logout</p></li>
                                                </ul>
                                            )
                                    }



                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                isLoggedIn &&  (
                    <Link to='../create-with-ai' className="create-with-ai">
                        <img src={AILogo} alt="" />
                    </Link>
                )
            }

        </nav>
    )
}
