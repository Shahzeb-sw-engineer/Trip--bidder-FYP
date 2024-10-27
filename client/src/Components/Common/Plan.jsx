import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaBookmark, FaRegBookmark } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../../assets/data/secret'
import { checkInBookmarks, handleBookmark } from '../../utils/bookmarks'

export default function Plan({ isUser, tripData, handleDeleteTrip = () => { } }) {
    const [isSaved, setIsSaved] = useState(false)

    const actionDropdown = useRef()
    const [showDropdown, setShowDropdown] = useState(false)
    const handleClickOutside = (e) => {
        if (actionDropdown.current && !actionDropdown.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const handleBookmarkTrip = (tripID) => {
        handleBookmark(tripID, isSaved, setIsSaved)
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            checkInBookmarks(user._id, tripData?._id)
                .then(res => {
                    if (!res.status) {
                        setIsSaved(false)
                    }
                    else {
                        setIsSaved(true)
                    }
                }).catch(err => {
                    console.log(err)
                    setIsSaved(false)
                })

        }
    }, [])


    return (
        <div className='plan mb-2'>
            <div className="main-split">
                <div className="title-side">
                    <Link to={isUser ? `../user/view-plan/${tripData && tripData?._id}` : `../agent/view-plan/${tripData && tripData?._id}`} className='dom-link'>
                        <h5 className='plan-title fw-bold'>
                            {
                                tripData && tripData?.title.length > 90 ? tripData?.title.slice(0, 90) + '...' : tripData?.title
                            }
                        </h5>
                    </Link>
                    <div className="d-flex mt-1">
                        <p className="paragraph-sm">Posted On: {new Date(tripData?.createdAt).toDateString()}</p>
                        <p className="paragraph-sm ms-2">Start Date: {tripData?.startDate}</p>
                        <p className="paragraph-sm ms-2">End Date: {tripData?.endDate}</p>
                    </div>
                </div>
                <div className="budget-side">
                    <h5 className='fw-bold'>Rs. {tripData && tripData.budget}/-</h5>
                </div>
            </div>
            <p className="mt-2 text-dark">
                {
                    tripData?.description.length > 180 ? tripData.description.slice(0, 180) + '...' : tripData?.description
                }
            </p>

            <div className="main-split">
                <div className="features-side mt-2">
                    <div className="d-flex allfeatures">
                        <div className="plan-features d-flex">
                            <div className="feature me-1">{tripData?.passengers} People</div>
                            <div className="feature me-1">{tripData?.transportType} Service</div>
                            {
                                tripData?.isAccomodation && (
                                    <div className="feature me-1">Accomodation</div>
                                )
                            }
                        </div>
                        <div className="divider"></div>
                        <div className="plan-locations d-flex ms-1">
                            {
                                tripData?.cities.length > 0 ?
                                    tripData?.cities.map((city, i) => {
                                        return (
                                            <div key={i} className="feature me-1">{city}</div>
                                        )
                                    })
                                    : (
                                        <div className="feature me-1">No Cities</div>
                                    )
                            }
                        </div>

                    </div>
                </div>
                <div className="save-side">
                    {
                        isUser ? (
                            <div className='d-flex'>
                                <Link to={`../user/proposals/${tripData?._id}`}>
                                    <button className='btn-nav me-2'>View Proposals</button>
                                </Link>
                                <div style={{ position: "relative" }}>
                                    <button className='btn-nav' onClick={() => setShowDropdown(!showDropdown)}>Actions {
                                        showDropdown ? (
                                            <FaAngleUp onClick={() => setShowDropdown(false)} />
                                        ) : (
                                            <FaAngleDown />
                                        )
                                    }
                                    </button>
                                    <div className={`custom-dropdown ${showDropdown ? 'show' : ''}`} ref={actionDropdown}>
                                        <Link to={`../user/update-trip/${tripData?._id}`} className='dom-link'>
                                            <div className="custom-dropdown-item">Edit</div>
                                        </Link>
                                        <div className="custom-dropdown-item text-danger" onClick={() => handleDeleteTrip(tripData?._id)}>Delete</div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <>
                                {
                                    isSaved ? (
                                        <FaBookmark className={`saveIcon saved`} onClick={() => handleBookmarkTrip(tripData._id)} />
                                    ) : (
                                        <FaRegBookmark className='saveIcon' onClick={() => handleBookmarkTrip(tripData._id)} />
                                    )
                                }
                            </>
                        )
                    }

                </div>
            </div>

        </div>
    )
}
