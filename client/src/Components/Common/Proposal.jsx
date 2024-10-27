import React from 'react'
import { Link } from 'react-router-dom'
import defaultProfile from '../../assets/images/profile.jpg'

export default function Proposal({ bidInfo, data, tripPoster, bidAt }) {

    let viewProposalUrl = ''
    if (JSON.parse(localStorage.getItem("user")).role === "agent") {
        viewProposalUrl = `../agent/view-proposal/${bidInfo._id}`
    }
    else {
        viewProposalUrl = `../user/view-proposal/${bidInfo._id}`
    }
    return (

        <Link to={viewProposalUrl} className='dom-link'>
            <div className='proposal mb-2'>
                <div className="main-split">
                    <div className="title-side">
                        <h5 className='plan-title color-primary '>{data.title}</h5>
                        <div className="d-flex mt-1">
                            <p className="paragraph-sm">Posted On: {new Date(data.createdAt).toDateString()}</p>
                            <p className="paragraph-sm ms-2">Start Date: {data.startDate}</p>
                            <p className="paragraph-sm ms-2">End Date: {data.endDate}</p>
                        </div>
                    </div>
                    <div className="budget-side">
                        <h5 className='fw-bold'>Rs. {data.budget}/-</h5>
                        {/* <p className="paragraph-sm">Bids Left: 48 out of 50</p> */}
                    </div>
                </div>
                {/* <p className="paragraph mt-2 text-dark">Embarking on a thrilling adventure, I find myself on an exciting journey to explore new horizons. </p> */}
                <p className="mt-2 text-dark">
                    {
                        data.description.length > 180 ? data.description.slice(0, 180) + '...' : data.description
                    }
                </p>

                <div className="row align-items-center">
                    <div className="col-6">
                        {
                            JSON.parse(localStorage.getItem("user")).role === "traveller" && 
                            (() => {
                                if (bidInfo.status === "pending") {
                                    return <span className="badge text-bg-primary">Pending</span>;
                                }
                                else if (bidInfo.status === "accepted") {
                                    return <span className="badge text-bg-success">Accepted</span>;
                                }
                                else if (bidInfo.status === "rejected") {
                                    return <span className="badge text-bg-danger">Rejected</span>;
                                }
                            })()
                        }
                    </div>
                    <div className="col-6">
                        <div className="agent-info">
                            <div className="split">
                                <div className="image">
                                    <img src={defaultProfile} alt="" />
                                </div>
                                <p className="username ms-2">{tripPoster.username}</p>
                            </div>
                            <div className="bid-time">
                                <p className="paragraph-sm">Bid at: {new Date(bidAt).toDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="main-split">
                    <div className="features-side mt-2">
                        <div className="d-flex allfeatures">
                            <div className="plan-features d-flex">
                                <div className="feature me-1">3 People</div>
                                <div className="feature me-1">Car Service</div>
                                <div className="feature me-1">Accomodation</div>
                            </div>
                            <div className="divider"></div>
                            <div className="plan-locations d-flex ms-1">
                                <div className="feature me-1">Kohat</div>
                                <div className="feature me-1">Peshawar</div>
                                <div className="feature me-1">Mardan</div>
                            </div>

                        </div>
                    </div>
                </div> */}

            </div>
        </Link>
    )
}
