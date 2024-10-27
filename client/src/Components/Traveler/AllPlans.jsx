import React from 'react'
import { FaSearchengin } from 'react-icons/fa6'

import Searchbar from '../Common/Searchbar';
import Plan from '../Common/Plan';
import { Link } from 'react-router-dom';

export default function AllPlans({ data }) {
    return (
        <div className='side allPlans'>
            <div className="d-flex align-items-center justify-content-between">
                <h4 className='fw-bolder text-uppercase'>Your Plans</h4>
                <Link to='../user/create-new-trip'>
                    <button className="custom-btn btn-nav btn-outline">Create New +</button>
                </Link>
            </div>
            <div className="plans">
                {
                    data.length === 0 && (
                        <h5>No Trips Published Yet</h5>
                    )
                }
                {
                    data.map((trip, i) => {
                        return (
                            <Plan key={i} isUser={true} tripData={trip} />
                        )
                    })
                }
            </div>
        </div>
    )
}
