import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import defaultProfile from '../../assets/images/profile.jpg'

import { FaStar } from 'react-icons/fa6'
import Loader from '../../Components/Common/Loader'
import showAlert from '../../utils/showAlert'
import CustomAlert from '../../Components/Common/CustomAlert'
import toast, { Toaster } from 'react-hot-toast'
import { uploadImage } from '../../utils/uploadImage'
import axios from 'axios'
import { SERVER_URL } from '../../assets/data/secret'
import { getUserDataByIDandRole } from '../../APIs/user'

export default function Profile() {
    const [radio, setRadio] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [userFound, setUserFound] = useState(false) // check if the user details exists in db
    const [profileData, setProfileData] = useState({
        fullName: "",
        profileImage: ""
    })

    const getUserData = async (id, role) => {
        setIsLoading(true)

        try {
            let response = await getUserDataByIDandRole(id, role)
            setIsLoading(false)
            if (response.status) {
                setUserFound(true)
                setProfileData({
                    fullName: response.data.fullName,
                    profileImage: response.data.profileImage
                })
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
        setIsLoading(true)
        let data = {
            fullName: profileData.fullName,
            profileImage: profileData.profileImage,
            role: user.role,
            phone: "",
            userID: user._id
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
                    <div className="flex-layout" style={{ justifyContent: 'center' }}>
                        <form className='side side-lg profile-details' onSubmit={handleUpdate}>
                            <div className="paragraph-sm">Personal Information</div>
                            <div className="form-group d-flex justify-content-center mb-5">
                                <div className="profile-details-image">
                                    <img src={profileData.profileImage !== '' ? profileData.profileImage : defaultProfile} alt="" />
                                    <input type="file" name="" id="" className="myInput-vii mt-1" accept='image/*' onChange={handleImageChange} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Full Name</label>
                                <input type="text" className="myInput-vii" onChange={(e) => { setProfileData({ ...profileData, fullName: e.target.value }) }} value={profileData.fullName} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Email Address</label>
                                <input type="text" className="myInput-vii" value={user.email} disabled />
                            </div>

                            <div className="form-group">
                                <button className="btn-nav mx-auto d-block mt-3">Update All</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
