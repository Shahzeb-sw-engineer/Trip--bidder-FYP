import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaBuilding, FaCar, FaDollarSign, FaMoneyBill, FaXmark } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import defaultProfile from '../../assets/images/profile.jpg'

import Lottie from 'lottie-react'
import completedAnimation from '../../assets/completedAnimation.json'

export default function ProposalDetails({ data, acceptProposal, handleInitiateChat, isAccepted }) {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (isAccepted) {
            setShowModal(true)
        }
    }, [isAccepted])
    return (
        <>
            <Toaster />
            <div className={`planDetails side side-lg`}>
                <p className="paragraph-sm fw-bold">TRIP DETAILS</p>
                <div className="row">
                    <div className="col-10">
                        <h4>{data.tripData.title}</h4>
                        <p className="paragraph-sm mt-2">Posted On: {new Date(data.createdAt).toDateString()}</p>
                    </div>
                    <div className="col-2 text-end">
                        {
                            (() => {
                                if (data.status === "pending") {
                                    return <span className="badge text-bg-primary">Pending</span>;
                                }
                                else if (data.status === "accepted") {
                                    return <span className="badge text-bg-success">Accepted</span>;
                                }
                                else if (data.status === "rejected") {
                                    return <span className="badge text-bg-danger">Rejected</span>;
                                }
                            })()
                        }
                    </div>
                </div>
                <hr className="seperator" />

                <h5 className="mt-1">Description</h5>
                <p className="mt-2" style={{ wordWrap: "break-word" }}>
                    {data.tripData.description}
                </p>

                <hr className="seperator" />

                <div className="features-layout">
                    <div className="flx-item">
                        <h5 className='mb-3'>Sites to Cover</h5>
                        {/* <p>Pakistan - KPK</p> */}
                        <p>{data.tripData.country} - {data.tripData.state}</p>


                        <div className="cities mt-1">
                            {
                                data.tripData.cities.length > 0 ?
                                    data.tripData.cities.map((city, i) => {
                                        return (
                                            <div key={i} className="feature">{city}</div>
                                        )
                                    })
                                    : (
                                        <div className="feature me-1">No Cities</div>
                                    )
                            }
                        </div>
                    </div>
                    <div className="flx-item">
                        <h5 className='mb-3'>Plan Features</h5>
                        <div className='d-flex align-items-center mt-1'>
                            <FaCar className='color-primary' />
                            <p className="ms-2">{data.tripData.transportType} Service</p>
                        </div>
                        {
                            data.tripData.isAccomodation && (
                                <div className='d-flex align-items-center mt-1'>
                                    <FaBuilding className='color-primary' />
                                    <p className="ms-2">{data.tripData.accomodationName} Service</p>
                                </div>
                            )
                        }

                    </div>
                    <div className="flx-item">
                        <h5 className='mb-3'>Budget</h5>
                        {/* <div className='d-flex align-items-center mt-1'>
                        <FaMoneyBill className='color-primary' />
                        <p className="ms-2 fw-bold">Rs. 13000/-</p>
                    </div> */}
                        <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                            <p className="fw-bold me-2">Budget:</p>
                            <p className="fw-bold">Rs. {data.tripData.budget}/-</p>
                        </div>
                        <div className="schedule mt-1">
                            <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                                <p className="fw-bold me-2">FROM:</p>
                                <p className="fw-bold">{data.tripData.startDate}</p>
                            </div>
                            <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                                <p className="fw-bold me-2">To:</p>
                                <p className="fw-bold">{data.tripData.endDate}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="separator" />
                <p className="paragraph-sm">PROPOSAL DETAILS</p>

                <h5>Cover Letter</h5>
                <p className='my-2' style={{ wordWrap: "break-word" }}>{data.coverLetter}</p>
                <h5 className="my-3">Attachments</h5>
                <div className="attachments ">
                    <div className="d-flex gap-2 align-items-start my-2  border rounded p-3">
                        {
                            data.attachments.map((url, i) => {
                                return (
                                    <img src={url} key={i} width={60} style={{ border: "1px solid gray" }} alt="" />
                                )
                            })
                        }
                    </div>
                </div>
                <h5 className="my-3">Budget</h5>
                <p>Total Budget Proposed: Rs.{data.budget}/-</p>

                <div className="action-btns d-flex gap-2 justify-content-end">
                    {
                        JSON.parse(localStorage.getItem("user")).role === "agent" ? (
                            <>
                                <Link to={`../agent/update-bid/${data.tripData._id}/${data._id}`}>
                                    <button className='btn-nav'>Edit</button>
                                </Link>
                            </>
                        ) :
                            (
                                <>
                                    {
                                        data.status === "accepted" ? (
                                            <button className="btn-custom btn-outline" onClick={handleInitiateChat}>Chat with Agent</button>
                                        ) : (
                                            <>
                                                <button className='btn-nav' onClick={() => acceptProposal(true)}>Accept</button>
                                                <button className="btn-nav bg-danger btn-danger" onClick={() => acceptProposal(false)}>Reject</button>
                                            </>
                                        )
                                    }
                                </>
                            )
                    }



                </div>

            </div>

            <div className="side side-sm">
                <p className="paragraph-sm fw-bold mb-3">AGENT PROFILE</p>

                <div className="d-flex gap-2">
                    <div className="image" style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={data.userData.otherDetails ? data.userData.otherDetails.profileImage : defaultProfile} style={{ width: "100%" }} alt="" />
                    </div>
                    <div>
                        <p className="paragraph fw-bold text-dark">{data.userData.username}</p>
                        <p className="paragraph-sm">{data.userData.email} </p>
                    </div>
                </div>
                <hr />
                <p>Biography</p>
                <p className="paragraph-sm mb-2">{data.userData.otherDetails && data.userData.otherDetails.bio}</p>
                {
                    data.userData.otherDetails && data.userData.otherDetails.businessName !== "" && (
                        <>
                            <p>Business Name</p>
                            <p className="paragraph-sm mb-2">{data.userData.otherDetails && data.userData.otherDetails.businessName}</p>
                        </>

                    )
                }
                <hr />
                <p className="paragraph-sm fw-bold mb-1">Statistics</p>
                <p>Successfull Projects: {data.userData.otherDetails && data.userData.otherDetails.completedTrips}</p>
                {/* <p>Category: 12</p> */}

            </div>


            <div className={`accept-proposal-modal ${showModal ? 'show' : ''}`}>
                <FaXmark className='closeModalIcon' onClick={() => setShowModal(false)} />
                <div className="animation">
                    {
                        showModal && (
                            <Lottie className='loader' animationData={completedAnimation} loop={true} />
                        )
                    }
                </div>
                <h5 className='mb-3'>Congratulations 🎉 on accepting <b>{data && data.userData.username}'s</b> proposal</h5>
                <p className="text-secondary mb-4">We're thrilled to confirm that you have successfully accepted the proposal of {data && data.userData.username}'s for your trip, <b>{data && data.tripData.title}</b>. Get ready for an incredible adventure ahead—we'll keep you updated every step of the way!</p>
                <button className="btn-custom btn-outline" onClick={handleInitiateChat}>Chat with {data && data.userData.username}</button>

            </div>
        </>

    )
}
