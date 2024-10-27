import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import AllProposals from '../../Components/Common/AllProposals'
import Proposal from '../../Components/Common/Proposal'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'


export default function AppliedProposals() {
    const [activeTab, setActiveTab] = useState('active')


    const [isLoading, setIsLoading] = useState(false)
    const [proposals, setProposals] = useState([])
    const [tripDetails, setTripDetails] = useState(null)

    let params = useParams()

    const fetchData = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getBidsOnTrip/${params.tripID}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    setProposals(response.data)
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

    const fetchTripData = () => {
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getTripById/${params.tripID}`)
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
    useEffect(() => {
        fetchTripData()
        fetchData()
    }, [params.id])
    return (
        <>
            <Navbar />
            <Loader show={isLoading} />
            <section className="myProposals main-layout">
                <div className="custom-container">
                    <div className="side mt-2">
                        <div className="row">
                            <div className="col-7">
                                <small className='text-secondary fw-bold'>PROPOSALS ON</small>
                                <h4 className='mb-1 fw-bold'>{tripDetails && tripDetails.title}</h4>
                                <p className='mb-3 color-primary'>{proposals && proposals.length} Proposals Found</p>
                            </div>
                            <div className="col-4 ">
                            </div>
                        </div>

                        {
                            proposals && proposals.length > 0 &&
                            proposals.map((proposal, i) => {
                                return (
                                    <Proposal key={i} bidInfo={proposal} data={proposal.tripData} tripPoster={proposal.userData} bidAt={proposal.createdAt} />

                                )
                            })
                        }
                        {
                            proposals.length === 0 && (
                                <p>No propsols found</p>
                            )
                        }

                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}
