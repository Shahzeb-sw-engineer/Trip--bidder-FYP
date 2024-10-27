import React from 'react'
import { FaSearchengin } from 'react-icons/fa6'

import Searchbar from '../Common/Searchbar';
import Plan from '../Common/Plan';

export default function MyPlans({ setShowFilters, data }) {
    return (
        <div className='side side-full allPlans'>
            <h4 className='mb-3 fw-bold'>My Saved Trips</h4>
            {/* <Searchbar setShowFilters={setShowFilters} /> */}
            <div className="plans">
                {
                    data && data.length === 0 && (
                        <h5>No Trips Found</h5>
                    )
                }
                {
                    data && data.map((tripData, i) => {
                        return (
                            <Plan key={i} isUser={false} tripData={tripData.trip} />
                        )
                    })
                }
            </div>
        </div>
    )
}
