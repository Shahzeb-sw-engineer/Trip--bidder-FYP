import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import defaultProfile from '../../assets/images/profile.jpg'

import { FaStar } from 'react-icons/fa6'
import Loader from '../../Components/Common/Loader'
import CustomAlert from '../../Components/Common/CustomAlert'
import { uploadImage } from '../../utils/uploadImage'
import { getUserDataByIDandRole } from '../../APIs/user'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Profile() {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [userFound, setUserFound] = useState(false)
    const [profileData, setProfileData] = useState({
        fullName: "",
        email: "",
        phone: "",
        bio: "",
        businessName: "",
        businessEmail: "",
        businessBio: "",
        profileImage: "",
        accomodation: false
    })
    const [completedTrips, setCompletedTrips] = useState(0)
    const [category, setCategory] = useState('')
    const [earning, setEarning] = useState(0)

    const getUserData = async (id, role) => {
        setIsLoading(true)

        try {
            let response = await getUserDataByIDandRole(id, role)
            setIsLoading(false)
            if (response.status) {
                setUserFound(true)
                setProfileData({
                    fullName: response.data.fullName || "",
                    profileImage: response.data.profileImage || "",
                    phone: response.data.phone || "",
                    bio: response.data.bio || "",
                    businessName: response.data.businessName || "",
                    businessEmail: response.data.businessEmail || "",
                    businessBio: response.data.businessBio || "",
                    accomodation: response.data.accomodation || false
                });
            }
            else {
                setUserFound(false)
                console.log(response.message)
            }
        }
        catch (err) {
            console.log(err)
        }


    }

    const getUserStats = async () => {
        setIsLoading(true)
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getAgentStats/${user._id}`)
                .then(res => {
                    res = res.data
                    setIsLoading(false)
                    if (res.status) {
                        setCompletedTrips(res.data.completedBids.length)
                        console.log(res.data)
                        let amount = 0
                        res.data.completedBids.forEach((bid) => {
                            amount += bid.budget
                        })
                        setEarning(amount)


                        if (completedTrips <= 5) {
                            setCategory('Silver')
                        }
                        else if (completedTrips <= 10 && completedTrips > 5) {
                            setCategory('Gold')
                        }
                        else {
                            setCategory('Platinum')
                        }

                        console.log(category)
                    }
                    else {
                        setCompletedTrips(0)

                    }
                })
                .catch(er => {
                    setIsLoading(false)
                    console.log(er)
                })

        }
        catch (err) {

        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setIsLoading(true)
            uploadImage(file)
                .then(res => {
                    setIsLoading(false)
                    if (res.status) {
                        setProfileData({ ...profileData, profileImage: res.url })
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

    const handleUpdate = (e) => {
        e.preventDefault()
        if (profileData.fullName.length === 0) {
            toast.error('Fill out empty fields')
            return
        }
        setIsLoading(true)
        let data = {
            fullName: profileData.fullName,
            profileImage: profileData.profileImage,
            role: user.role,
            phone: profileData.phone,
            userID: user._id,
            bio: profileData.bio,
            businessName: profileData.businessName,
            businessEmail: profileData.businessEmail,
            businessBio: profileData.businessBio,
            accomodation: profileData.accomodation
        }

        if (userFound) {

            axios.put(`${import.meta.env.VITE_SERVER_URL}/api/updateUserInfo/${user._id}`, data)
                .then(res => {
                    setIsLoading(false)
                    res = res.data
                    if (res.status) {
                        toast.success('Profile updated successfully')
                    }
                    else {
                        toast.error('Something went wrong while updating profile')
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    toast.error('Something went wrong while updating profile')
                    console.log(err)
                })
        }
        else {
            axios.post(`${import.meta.env.VITE_SERVER_URL}/api/adduser`, data)
                .then(res => {
                    setIsLoading(false)
                    if (res.data.status) {
                        toast.success("Profile updated successfully")
                        setUserFound(true)
                        getUserData(user._id, user.role)
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

    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
            getUserData(user._id, user.role)
            getUserStats()
        }
    }, [])


    return (
        <>
            <Toaster />
            <Loader show={isLoading} />
            <CustomAlert />
            <Navbar />
            <section className="profile main-layout">
                <div className="custom-container">
                    <div className="flex-layout">
                        <form className='side side-xl profile-details' onSubmit={handleUpdate}>
                            <div className="paragraph-sm">Personal Information</div>
                            <div className="row mt-2 justify-content-between">
                                <div className="col-5 form-group d-flex justify-content-center">
                                    <div className="profile-details-image">
                                        <img src={profileData.profileImage ? profileData.profileImage : defaultProfile} alt="" />
                                        <input type="file" name="" id="" className="myInput-vii mt-1" accept='image/*' onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="form-group">
                                        <label htmlFor="">Username</label>
                                        <input type="text" className="myInput-vii" onChange={(e) => { setProfileData({ ...profileData, fullName: e.target.value }) }} value={profileData.fullName} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Email Address</label>
                                        <input type="text" className="myInput-vii" value={user.email} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Phone Number</label>
                                        <input type="text" className="myInput-vii" onChange={e => setProfileData({ ...profileData, phone: e.target.value })} value={profileData.phone} />
                                    </div>
                                </div>

                            </div>

                            <div className="form-group">
                                <label htmlFor="">Bio</label>
                                <textarea className="myInput-vii" id="" cols="30" rows="4" style={{ maxHeight: "200px" }} onChange={(e) => { setProfileData({ ...profileData, bio: e.target.value }) }} defaultValue={profileData.bio}></textarea>
                            </div>

                            <hr className="separator" />

                            <p className="paragraph-sm">BUSINESS INFORMATION</p>

                            <div className="form-group mb-2">
                                <label htmlFor="">Business Name</label>
                                <input type="text" className="myInput-vii" onChange={(e) => { setProfileData({ ...profileData, businessName: e.target.value }) }} value={profileData.businessName} />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="">Business Email</label>
                                <input type="text" className="myInput-vii" onChange={(e) => { setProfileData({ ...profileData, businessEmail: e.target.value }) }} value={profileData.businessEmail} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Business Description</label>
                                <textarea
                                    className="myInput-vii"
                                    cols="30"
                                    rows="4"
                                    style={{ maxHeight: "200px" }}
                                    onChange={(e) => setProfileData({ ...profileData, businessBio: e.target.value })}
                                    value={profileData.businessBio}
                                />
                            </div>

                            <hr className="separator" />

                            <p className="paragraph-sm">OTHER INFORMATION</p>
                            <div className="form-group mt-3 text-center">
                                <label htmlFor="">Accomodation Service</label>
                                <div className="radios justify-content-center mt-2">
                                    <div className={`radio ${profileData.accomodation ? 'active' : ''}`} onClick={() => { setProfileData({ ...profileData, accomodation: true }) }}>Yes</div>
                                    <div className={`radio ${!profileData.accomodation ? 'active' : ''}`} onClick={() => { setProfileData({ ...profileData, accomodation: false }) }}>No</div>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn-nav mx-auto d-block mt-3">Update All</button>
                            </div>
                        </form>
                        <div className="side side-sm">
                            <p className="paragraph-sm">PROJECTS & EARNINGS</p>
                            <div className='d-flex align-items-center mt-3 '>
                                <p className="me-2">Successfull Projects:</p>
                                <p className="">{completedTrips && completedTrips}</p>
                            </div>
                            <div className='d-flex align-items-center mb-2'>
                                <p className="me-2">Total Earnings:</p>
                                {
                                    completedTrips === 0 ?
                                        (
                                            <p className="">Rs. 0/-</p>
                                        ) : (
                                            <p className="">Rs. {earning}/-</p>
                                        )
                                }
                            </div>

                            <hr className="separator" />
                            <p className="paragraph-sm mt-2">PROJECTS & EARNINGS</p>
                            <div className='d-flex align-items-center mb-2'>
                                <p className="me-2">Category:</p>
                                <p className="">{category && category}</p>
                            </div>
                            {/* <div className='d-flex align-items-center mb-2'>
                                <p className="me-2">Ratings:</p>
                                <FaStar style={{ color: "gold" }} />
                                <p>(4 out of 5 in 3 reviews)</p>
                            </div> */}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
