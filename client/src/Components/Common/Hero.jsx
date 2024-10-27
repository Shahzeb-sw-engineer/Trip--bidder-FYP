import React, { useEffect, useState } from 'react'
import heroImage from '../../assets/images/traveller 1.png'
import { Link } from 'react-router-dom'

export default function Hero() {
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUserDetails(JSON.parse(user))
        }
    }, [])
    return (
        <section className='hero'>
            <div className="container">
                <div className="split">
                    <div className="content">
                        <p className="text-secondary">Best Destinations around the world</p>
                        {/* <h1 className="main-heading heading-font">Discover the World on Your Terms</h1> */}
                        <h1 className="main-heading heading-font">Travel, enjoy
                            and live a new
                            and full life</h1>
                        <p className="paragraph slogan">Your Journey, Your Price – Bid and Fly</p>
                        {
                            localStorage.getItem('user') &&
                                userDetails ? (
                                userDetails.role === 'agent' ? (
                                    <>
                                        <Link className='text-decoration-none text-white' to="/agent/">
                                            <button className="btn-custom mt-4">
                                                Get Started
                                            </button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link className='text-decoration-none text-white' to="/user/plans">
                                            <button className="btn-custom mt-4">
                                                Get Started
                                            </button>
                                        </Link>
                                    </>
                                )
                            ) : (
                                <Link className='text-decoration-none text-white' to="/role">
                                    <button className="btn-custom mt-4">
                                        Get Started
                                    </button>
                                </Link>
                            )

                        }


                        {/* <button className="btn-custom mt-4">Get Started</button> */}
                    </div>
                    <div className="image">
                        <img src={heroImage} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}
