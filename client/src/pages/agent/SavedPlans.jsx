import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import MyPlans from '../../Components/Agent/MyPlans'
import Filters from '../../Components/Common/Filters'
import axios from 'axios'
import { SERVER_URL } from '../../assets/data/secret'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'

export default function SavedPlans() {
    const [showFilters, setShowFilters] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [trips, setTrips] = useState([])

    const fetchData = () => {
        setIsLoading(true)
        const userID = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getBookmarks/${userID}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                // console.log(response)
                if (response.status) {
                    setTrips(response.data)
                }
                else {
                    setTrips([])
                    // toast.error('Something went wrong')
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error('Something went wrong')
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Loader show={isLoading}/>
            <Toaster />
            <Navbar />
            <section className="allPlans main-layout">
                <div className="custom-container">
                    <div className="flex-layout">
                        {/* <MyPlans setShowFilters={setShowFilters} /> */}
                        <MyPlans
                            data={trips && trips}
                            setShowFilters={setShowFilters}
                        />
                        {/* <Filters showFilters={showFilters} setShowFilters={setShowFilters} /> */}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
