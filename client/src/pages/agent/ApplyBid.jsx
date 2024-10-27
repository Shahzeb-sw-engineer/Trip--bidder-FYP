import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import PlanDetails from '../../Components/Agent/PlanDetails'
import { FaBuilding, FaCar, FaCloudArrowUp, FaMoneyBill } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'
import axios from 'axios'
import { uploadImage } from '../../utils/uploadImage'

export default function ApplyBid() {
    const [isLoading, setIsLoading] = useState(false)
    const [tripDetails, setTripDetails] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [isUpdatePage, setIsUpdatePage] = useState(false)

    const [proposalData, setProposalData] = useState({
        attachments: [],
        coverLetter: '',
        budget: ''
    })
    const navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        const { pathname } = location;
        if (pathname.includes('/agent/update-bid')) {
            setIsLoading(true)
            setIsUpdatePage(true)

            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getBidById/${params.bidID}`)
                .then(response => {
                    response = response.data
                    setIsLoading(false)
                    if (response.status) {
                        setProposalData({
                            ...proposalData,
                            coverLetter: response.data.coverLetter,
                            budget: response.data.budget,
                            attachments: response.data.attachments
                        })
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
    }, [])

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

    useEffect(() => {
        fetchData()
        const user = JSON.parse(localStorage.getItem('user'))
        setUserDetails(user)

    }, [params.id])

    const handleImage = () => {
        document.querySelector(".attachmentsInput").click()
    }
    const handleImageChange = (e) => {
        const files = e.target.files;

        let attachmentsURLs = [];

        setIsLoading(true);

        const uploadPromises = Array.from(files).map(file =>
            uploadImage(file)
                .then(res => {
                    if (res.status) {
                        attachmentsURLs.push(res.url);

                    } else {
                        // Handle failure if needed
                    }
                })
                .catch(err => {
                    toast.error('Something went wrong while uploading image');
                    console.log(err);
                })
        );

        Promise.all(uploadPromises)
            .then(() => {
                setIsLoading(false);
                // console.log(attachmentsURLs);
                setProposalData({
                    ...proposalData,
                    attachments: attachmentsURLs
                })
            })
            .catch(err => {
                setIsLoading(false);
                toast.error('Something went wrong with the uploads');
                console.log(err);
            });
    }

    const handleCover = (e) => {
        setProposalData({ ...proposalData, coverLetter: e.target.value })
    }
    const handleBudget = (e) => {
        setProposalData({ ...proposalData, budget: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (proposalData.budget === 0 || proposalData.coverLetter === 0) {
            toast.error("Fill out required fields to continue")
            return
        }

        setIsLoading(true)
        let finalData = {
            userID: userDetails._id,
            tripID: tripDetails._id,
            coverLetter: proposalData.coverLetter,
            budget: parseInt(proposalData.budget),
            attachments: proposalData.attachments,
            status: "pending"
        }

        if (isUpdatePage) {
            axios.put(`${import.meta.env.VITE_SERVER_URL}/api/updateBid/${params.bidID}`, finalData)

                .then(response => {
                    response = response.data
                    setIsLoading(false)

                    if (response.status) {
                        toast.success('Your proposal has been updated successfully!')
                        setTimeout(() => {
                            navigate("../agent/my-proposals")
                        }, 1000);
                    }
                    else {
                        setIsLoading(false)
                        toast.error('Something went wrong with the proposal submission');
                        console.log(response)
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    toast.error('Something went wrong with the proposal submission');
                    console.log(err)
                })
        }
        else {

            axios.post(`${import.meta.env.VITE_SERVER_URL}/api/createBid`, finalData)
                .then(response => {
                    response = response.data
                    setIsLoading(false)

                    if (response.status) {
                        toast.success('Your proposal has been sent successfully!')
                        navigate("../agent/my-proposals")
                    }
                    else {
                        setIsLoading(false)
                        toast.error('Something went wrong with the proposal submission');
                        console.log(response)
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    toast.error('Something went wrong with the proposal submission');
                    console.log(err)
                })
        }

    }

    return (
        <>
            <Toaster />
            <Loader show={isLoading} />

            <Navbar />
            <section className="main-layout">
                <div className="custom-container">
                    <h4 className='mb-3 fw-bold'>SUBMIT A PROPOSAL</h4>
                    {/* <PlanDetails fullView={true} /> */}


                    {
                        tripDetails && (
                            <div className={`side planDetails`}>
                                <div className="row">
                                    <div className="col-10">
                                        <h4 className='fw-bold'>{tripDetails && tripDetails.title}</h4>
                                        <p className="paragraph-sm mt-2">Posted On: {new Date(tripDetails.createdAt).toDateString()}</p>
                                    </div>
                                    <div className="col-2">
                                        {/* <h4 className="fw-bold">2 Bids</h4> */}
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
                                        <p>{tripDetails.country} - KPK</p>

                                        <div className="cities mt-1">
                                            {
                                                tripDetails.cities && tripDetails.cities.length > 0 ?
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
                                        <div className='d-flex align-items-center mt-1'>
                                            <FaMoneyBill className='color-primary' />
                                            <p className="ms-2 fw-bold">Rs. {tripDetails.budget}/-</p>
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


                    <div className="side mt-2">
                        <p className="paragraph-sm fw-bold">PROPOSAL DETAILS</p>

                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label htmlFor="">Budget*</label>
                                <input type="number" min={0} className="myinput-vii" onChange={handleBudget} value={proposalData && proposalData.budget} />
                                <small className='text-secondary'>Use PKR as a currency</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Cover Letter*</label>
                                <textarea type="text" className="myinput-vii" rows="7" onChange={handleCover} style={{ minHeight: "40px", maxHeight: "250px" }} value={proposalData.coverLetter}></textarea>
                            </div>
                            <div className="form-group">
                                <div className="chooseimage px-3" onClick={handleImage}>
                                    <input type="file" multiple onChange={handleImageChange} className='attachmentsInput d-none' />
                                    <FaCloudArrowUp className='upload-icon' />
                                    <p>Upload Attachments</p>
                                    {/* <small className='text-center'>{data.profileImage && data.profileImage.name}</small> */}
                                </div>
                                <div className="d-flex gap-2 mt-3">
                                    {
                                        proposalData.attachments.length > 0 &&
                                        proposalData.attachments.map((url, i) => {
                                            return (
                                                <img style={{ border: "1px solid gray" }} key={i} src={url} alt="" width={45} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type='submit' className="btn-nav me-2" >{isUpdatePage ? 'Update' : 'Submit'}</button>
                                {/* <button className="btn-outline " >Cancel</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}
