import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import AllPlans from '../../Components/Traveler/AllPlans'
import Filters from '../../Components/Common/Filters'
import axios from 'axios'
import { SERVER_URL } from '../../assets/data/secret'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'
import { Link } from 'react-router-dom'
import Plan from '../../Components/Common/Plan'
export default function MyPlans() {

    const [isLoading, setIsLoading] = useState(false)
    const [trips, setTrips] = useState([])

    const fetchData = () => {
        setIsLoading(true)
        const userID = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getUserTrips/${userID}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    // console.log(response)
                    setTrips(response.data)
                }
                else {
                    // toast.error('No trips found')
                    setTrips([])
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error('Something went wrong')
                console.log(err)
            })
    }



    useEffect(() => {
        let isExec = false
        const callFetch = () => {
            if (!isExec) {
                isExec = true
                fetchData()
            }
        }
        callFetch()
    }, [])

    const handleDelete = async id => {
        try {
            let sure = confirm("Are you sure to delete this trip?")
            if (!sure) {
                return
            }
            setIsLoading(true)
            let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/deleteTrip/${id}`)
            // response = response.data
            setIsLoading(false)

            if (response.status) {
                // toast.success('Trip deleted successfully')
                fetchData()
            }
            else {
                toast.error('Error deleting trip')
            }
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }
    return (
        <>
            <Loader show={isLoading} />
            <Navbar />
            <Toaster />
            <section className="allPlans main-layout">
                <div className="custom-container">
                    {/* <AllPlans data={trips && trips} /> */}

                    <div className='side allPlans'>
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className='fw-bolder text-uppercase'>Your Trips</h4>
                            <Link to='../user/create-new-trip'>
                                <button className="custom-btn btn-nav btn-outline">Create New +</button>
                            </Link>
                        </div>
                        <div className="plans">
                            {
                                trips.length === 0 && (
                                    <h5>No Trips Published Yet</h5>
                                )
                            }
                            {
                                trips.map((trip, i) => {
                                    return (
                                        <Plan key={i} isUser={true} tripData={trip} handleDeleteTrip={handleDelete} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
