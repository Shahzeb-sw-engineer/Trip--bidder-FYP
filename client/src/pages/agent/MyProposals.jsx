import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import AllProposals from '../../Components/Common/AllProposals'
import Proposal from '../../Components/Common/Proposal'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'


export default function MyProposals() {
    const [activeTab, setActiveTab] = useState('active')

    const [isLoading, setIsLoading] = useState(false)
    const [proposals, setProposals] = useState([])
    const [allProposals, setAllProposals] = useState([])


    let params = useParams()

    const fetchData = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getAgentsBids/${user._id}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    setProposals(response.data)
                    setAllProposals(response.data)
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
    }, [params.id])

    useEffect(() => {
        if (activeTab === 'active') {
            let newProposals = allProposals.filter(p => p.status === "accepted")
            setProposals(newProposals)
        }
        else {
            let newProposals = allProposals.filter(p => p.status !== "accepted")
            setProposals(newProposals)
        }

    }, [activeTab])

    return (
        <>
            <Toaster />
            <Loader show={isLoading} />
            <Navbar />
            <section className="myProposals main-layout">
                <div className="custom-container">
                    <div className="side mt-2">
                        <div className="row">
                            <div className="col-7">
                                <h4 className='mb-3 fw-bold'>My Proposals</h4>
                            </div>
                            <div className="col-4 ">
                                <div className="tab float-end">
                                    <div className={`tab-item ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active</div>
                                    <div className={`tab-item ${activeTab === 'inactive' ? 'active' : ''}`} onClick={() => setActiveTab('inactive')}>Inactive</div>
                                </div>
                            </div>
                        </div>

                        <div className='allProposals'>
                            <div className="proposals my-3">
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

                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}
