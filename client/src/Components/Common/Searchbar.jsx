import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaFilter } from 'react-icons/fa6';

export default function Searchbar(props) {

    const handleSearch = e => {
        e.preventDefault()
        props.handleSearchTrips()
    }
    return (
        <form className="searchbar">
            <input type="text" className='myinput-vii' placeholder='Search City' onChange={e => props.setSearchInput(e.target.value)} value={props.searchInput}/>
            <div className="search-icon">
                <FaSearch className='icon-tag' onClick={handleSearch}/>
                <FaFilter className='filter-icon' onClick={() => {props.setShowFilters(true)}}/>
            </div>
        </form>
    )
}
