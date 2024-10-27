import React, { useState } from 'react'
import businessImage from '../../assets/images/business.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCloudArrowUp } from 'react-icons/fa6'
import { uploadImage } from '../../utils/uploadImage'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'
import axios from 'axios'
import { SERVER_URL } from '../../assets/data/secret'

export default function Tripinfo() {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState(
        {
            profileImage: '',
            accomodation: false
        })

    const [radio, setRadio] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isImageUploaded, setIsImageUploaded] = useState(false)

    const handleImage = () => {
        document.querySelector(".fileinput").click()
    }


    const handleImageChange = (e) => {
        setIsLoading(true)
        const file = e.target.files[0];
        if (file) {
            uploadImage(file)
                .then(res => {
                    setIsLoading(false)
                    if (res.status) {
                        setData({ ...data, profileImage: res.url })
                        setIsImageUploaded(true)
                    }
                    else {
                        toast.error('Something went wrong while uploading image')
                    }
                })
                .catch(err => {
                    toast.error('Something went wrong while uploading image')
                    console.log(err)
                })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        let currentData = location.state
        console.log(location.state)
        let dataToDB = {
            userID: currentData.personalinfo.userID,
            businessBio: currentData.businessInfo ? currentData.businessInfo.businessDesc : '',
            businessEmail: currentData.businessInfo ? currentData.businessInfo.businessEmail : '',
            businessName: currentData.businessInfo ? currentData.businessInfo.businessName : '',
            localAddress: currentData.personalinfo.address || '',
            bio: currentData.personalinfo.bio || '',
            city: currentData.personalinfo.city || '',
            country: currentData.personalinfo.country || '',
            fullName: currentData.personalinfo.fullname || '',
            phone: currentData.personalinfo.phone || '',
            slogan: currentData.personalinfo.slogan || '',
            state: currentData.personalinfo.state || '',
            role: currentData.personalinfo.role,
            profileImage: data.profileImage,
            accomodation: data.accomodation,
        }
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/adduser`, dataToDB)
            .then(res => {
                setIsLoading(false)
                if (res.data.status) {
                    toast.success(res.data.message)
                    // set to localStorage 
                    setTimeout(() => {
                        navigate('../agent/')
                    }, 2000);
                }
                else {
                    toast.error("Something went wrong")
                    console.log(res.data.message)
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error("Something went wrong")
                console.log(err)
            })
    }



    return (
        <>
            <Toaster />
            <Loader show={isLoading} />
            <div className="topbar py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
                        <h5 className="logo-text color-primary fw-bold ms-2">TRIP-BIDDER</h5>
                    </div>
                </div>
            </div>

            <section className='register tripinfo'>
                <div className="info-container">


                    <div className="content">
                        <p className="paragraph mt-1">Step 3 of 3</p>
                        <h3 className='color-primary fw-bolder'>Trip Information</h3>
                    </div>

                    <form action="" className="trip-info-form" onSubmit={handleSubmit}>
                        <div className="chooseimage px-3 mb-2" onClick={handleImage}>
                            <input type="file" accept='image/*' name="" id="" className='fileinput' onChange={handleImageChange} />
                            <FaCloudArrowUp className='upload-icon' />
                            <p>Upload Profile Image</p>
                            <small className='text-center'>{isImageUploaded && "Image Uploaded, Click here to another image"}</small>
                        </div>
                        {
                            isImageUploaded &&
                            <img src={data.profileImage} width={50} alt="" />
                        }
                        <div className="form-group mt-3 accomodation">
                            <label htmlFor="">Accomodation Service</label>
                            <div className="radios">
                                <div className={`radio ${radio ? 'active' : ''}`} onClick={() => { setRadio(true); setData({ ...data, accomodation: true }) }}>Yes</div>
                                <div className={`radio ${radio ? '' : 'active'}`} onClick={() => { setRadio(false); setData({ ...data, accomodation: false }) }}>No</div>

                            </div>
                        </div>
                        <button className="btn-custom  mb-3 mx-auto d-block mt-3" >Finish</button>
                    </form>
                </div>
            </section>
        </>
    )
}
