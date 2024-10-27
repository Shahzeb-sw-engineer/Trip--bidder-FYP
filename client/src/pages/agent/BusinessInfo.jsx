import React, { useState } from 'react'
import businessImage from '../../assets/images/business.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function BusinessInfo() {
    const navigate = useNavigate()
    const location = useLocation()

    const [data, setData] = useState(
        {
            businessEmail: '',
            businessName: '',
            businessDesc: ''
        })


    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/tripinfo', { state: { personalinfo: location.state.personalinfo, businessinfo: data } })
    }

    const handleSkip = () => {
        navigate('/tripinfo', { state: { personalinfo: location.state.personalinfo } })
    }

    return (
        <>
            <div className="topbar py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
                        <h5 className="logo-text color-primary fw-bold ms-2">TRIP-BIDDER</h5>
                    </div>
                </div>
            </div>

            <section className='register accountInfo'>
                <div className="info-container">


                    <div className="content">
                        <p className="paragraph mt-1">Step 2 of 3</p>
                        <h3 className='color-primary fw-bolder'>Business Information</h3>
                    </div>

                    <form action="" className="info-form" onSubmit={handleSubmit}>
                        <div className="side">

                            <div className="form-group">
                                <label htmlFor="">Business Name</label>
                                <div className="myinput">
                                    <input type="text" value={data.businessName} maxLength={50} onChange={(e) => { setData({ ...data, businessName: e.target.value }) }} />
                                </div>
                            </div><div className="form-group">
                                <label htmlFor="">Business Email</label>
                                <div className="myinput">
                                    <input type="email" value={data.businessEmail} maxLength={50} onChange={(e) => { setData({ ...data, businessEmail: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Description</label>
                                <div className="myinput">
                                    <textarea cols="30" rows="4" value={data.businessDesc} maxLength={200} onChange={(e) => { setData({ ...data, businessDesc: e.target.value }) }}></textarea>
                                </div>
                            </div>
                            <div className="d-flex float-end align-items-center">
                                <p className="btn-custom bg-white text-secondary mb-3 text-decoration-underline" onClick={handleSkip}>Skip</p>
                                <button className="btn-custom  mb-3" >Next</button>
                            </div>

                        </div>
                        <div className="side">

                            <img src={businessImage} alt="" style={{ width: "100%" }} />

                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
