import React from 'react'
import { FaAngleLeft, FaAngleRight, FaSearchengin } from 'react-icons/fa6'

import Searchbar from '../Common/Searchbar';
import Plan from '../Common/Plan';

export default function AllPlans({ setShowFilters, data, handleLimit, searchInput, setSearchInput, handleSearchTrips }) {
    return (
        <div className='side side-lg allPlans'>
            <Searchbar setShowFilters={setShowFilters} searchInput={searchInput} setSearchInput={setSearchInput} handleSearchTrips={handleSearchTrips} />
            <div className="plans">
                {
                    data.length === 0 && (
                        <h5>No Trips Published Yet</h5>
                    )
                }
                {
                    data.map((trip, i) => {
                        return (
                            <Plan key={i} isUser={false} tripData={trip} />
                        )
                    })
                }
            </div>

            <button className='btn-outline d-block mx-auto' onClick={handleLimit}>Load More</button>
        </div>
    )
}
