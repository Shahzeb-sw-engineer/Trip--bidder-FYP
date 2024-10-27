import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'
import { FaBuilding, FaCar, FaMoneyBill } from 'react-icons/fa6'

export default function ViewPlan() {
    const [isLoading, setIsLoading] = useState(false)
    const [tripDetails, setTripDetails] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [isAppliedAlready, setIsAppliedAlready] = useState(false)
    const [proposalID, setProposalID] = useState('')
    const [proposalStatus, setProposalStatus] = useState('')
    const [countryState, setCountryState] = useState({
        country: "",
        state: ""
    })
    let params = useParams()

    const fetchData = () => {
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getTripById/${params.id}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    setTripDetails(response.data)
                }
                else {
                    toast.error('Something went wrong!')
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error('Something went wrong!')
                console.log(err)
            })
    }

    const checkIfApplied = () => {
        setIsLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/isAppliedOnTrip/${params.id}/${user._id}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    setIsAppliedAlready(true)
                    setProposalID(response.data._id)
                    setProposalStatus(response.data.status)
                }
                else {
                    // toast.error('Something went wrong!')
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error('Something went wrong!')
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
        checkIfApplied()
        const user = JSON.parse(localStorage.getItem('user'))
        setUserDetails(user)
    }, [params.id])

    return (
        <>
            <Loader show={isLoading} />
            <Navbar />
            <Toaster />
            <section className="allPlans main-layout view-plan">
                <div className="custom-container">
                    <div className="flex-layout">
                        {/* <PlanDetails data={tripDetails && tripDetails} /> */}
                        {/* {tripDetails ? (  // Conditional rendering
                            <PlanDetails data={tripDetails} />
                        ) : (
                            <p>Loading trip details...</p>
                        )} */}




                        {/* <div className={`${fullViewfullView ? 'planDetails side' : 'side side-xl planDetails'}`}> */}
                        {
                            tripDetails && (
                                <div className={`side side-xl planDetails`}>
                                    <div className="row">
                                        <div className="col-10">
                                            <h4 className='fw-bold'>{tripDetails && tripDetails.title}</h4>
                                            <p className="paragraph-sm mt-2">Posted On: {new Date(tripDetails.createdAt).toDateString()}</p>
                                        </div>
                                        <div className="col-2">
                                            {/* <h4 className="fw-bold">2 Bids</h4> */}
                                            {
                                                (() => {
                                                    if (proposalStatus === "pending") {
                                                        return <span className="badge text-bg-primary">Pending</span>;
                                                    }
                                                    else if (proposalStatus === "accepted") {
                                                        return <span className="badge text-bg-success">Accepted</span>;
                                                    }
                                                    else if (proposalStatus === "rejected") {
                                                        return <span className="badge text-bg-danger">Rejected</span>;
                                                    }
                                                })()
                                            }
                                        </div>
                                    </div>
                                    <hr className="seperator" />

                                    <h5 className="mt-1">Description</h5>
                                    <p className="mt-2" style={{ wordWrap: "break-word" }}>
                                        {tripDetails.description}
                                    </p>

                                    <hr className="seperator" />

                                    <div className="features-layout">
                                        <div className="flx-item">
                                            <h5 className='mb-3'>Sites to Cover</h5>
                                            <p>{tripDetails.country} - {
                                                tripDetails && tripDetails.state
                                            }</p>

                                            <div className="cities mt-1">
                                                {
                                                    tripDetails.cities.length > 0 ?
                                                        tripDetails.cities.map((city, i) => {
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
                                                <p className="ms-2">{tripDetails.transportType} Service</p>
                                            </div>
                                            {
                                                tripDetails.isAccomodation && (
                                                    <div className='d-flex align-items-center mt-1'>
                                                        <FaBuilding className='color-primary' />
                                                        <p className="ms-2">{tripDetails.accomodationName} Service</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="flx-item">
                                            <h5 className='mb-3'>Budget</h5>
                                            <div className='d-flex align-items-center justify-content-between mt-1'>
                                                <FaMoneyBill className='color-primary' />
                                                <h5 className="ms-2 fw-bold">Rs. {tripDetails.budget}</h5>
                                            </div>
                                            <div className="schedule mt-1">
                                                <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                                                    <p className="fw-bold">FROM:</p>
                                                    <p className="fw-bold">{tripDetails.startDate}</p>
                                                </div>
                                                <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                                                    <p className="fw-bold">To:</p>
                                                    <p className="fw-bold">{tripDetails.endDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }





                        <div className={`side side-xsm applySection`}>
                            {
                                userDetails.role === 'agent' ? (
                                    <>
                                        <p className="paragraph-sm">Trip Poster Information</p>
                                        <div className='d-flex align-items-center mb-2 mt-2'>
                                            <p className="me-2">Username:</p>
                                            <p>{tripDetails && tripDetails.userDetails.username}</p>
                                        </div>
                                        <div className='d-flex align-items-center mb-2 mt-2'>
                                            <p className="me-2">Total Trips Posted:</p>
                                            <p>{tripDetails && tripDetails.userDetails.totalTrips}</p>
                                        </div>
                                        <hr />
                                        <p className="paragraph-sm">Action</p>

                                        {
                                            isAppliedAlready ? (
                                                <Link className='dom-link text-white' to={`../agent/view-proposal/${proposalID}`}>
                                                    <button className="btn-nav mt-3 d-block mx-auto w-100">View Proposal</button>
                                                </Link>
                                            ) : (
                                                <Link className='dom-link text-white' to={`../agent/bid/${tripDetails && tripDetails._id}`}>
                                                    <button className="btn-nav mt-3 d-block mx-auto w-100">Apply Now</button>
                                                </Link>
                                            )
                                        }

                                        {/* <button className="btn-outline mt-3 d-block mx-auto w-100" >Save Plan</button> */}
                                    </>
                                ) : (
                                    <>
                                        <Link className='dom-link text-white' to={`../user/update-trip/${tripDetails && tripDetails._id}`}>
                                            <button className="btn-nav mt-3 d-block mx-auto ">Edit Trip</button>
                                        </Link>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

