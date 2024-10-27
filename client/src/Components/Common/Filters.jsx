import React from 'react'
import { FaArrowRight, FaRightFromBracket } from 'react-icons/fa6'

export default function Filters({ showFilters, setShowFilters, selectedBudget, setSelectedBudget, sortBy, setSortBy, handleApplyFilters, handleClearFilter }) {

  const handleCheckboxChange = (event) => {
    setSelectedBudget(event.target.id);
  };
  return (

    <div className={`side side-sm filters ${showFilters ? 'show' : ''}`}>
      <FaArrowRight className='hideFilterIcon' onClick={() => { setShowFilters(false) }} />
      <h5>Filters</h5>

      <div className="mt-4">Sort By</div>
      <div className="d-flex mt-1 sortby">
        <div className='d-flex'>
          <input type="radio" name="sort" id="newest" className='radioInput' onChange={() => setSortBy('asc')} checked={sortBy === "asc" ? true : false} />
          <label htmlFor="newest" className='ms-2'>Newest</label>
        </div>
        <div className='d-flex ms-4'>
          <input type="radio" name="sort" id="oldest" className='radioInput' onChange={() => setSortBy('desc')} checked={sortBy === "desc" ? true : false} />
          <label htmlFor="oldest" className='ms-2'>Oldest</label>
        </div>
      </div>

      <div className="mt-4">Budget</div>
      <div className="budget-filters mt-1">
        <div className="form-group d-flex">
          <input
            type="checkbox"
            name="budget"
            id="0-5000"
            className='checkboxInput me-3'
            checked={selectedBudget === "0-5000"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="less-5">Less than 5k</label>
        </div>
        <div className="form-group d-flex">
          <input
            type="checkbox"
            name="budget"
            id="5000-10000"
            className='checkboxInput me-3'
            checked={selectedBudget === "5000-10000"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="five">5k to 10k</label>
        </div>
        <div className="form-group d-flex">
          <input
            type="checkbox"
            name="budget"
            id="10000-15000"
            className='checkboxInput me-3'
            checked={selectedBudget === "10000-15000"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="ten">10k to 15k</label>
        </div>
        <div className="form-group d-flex">
          <input
            type="checkbox"
            name="budget"
            id="15000-20000"
            className='checkboxInput me-3'
            checked={selectedBudget === "15000-20000"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="fifteen">15k to 20k</label>
        </div>
        <div className="form-group d-flex">
          <input
            type="checkbox"
            name="budget"
            id="20000-100000"
            className='checkboxInput me-3'
            checked={selectedBudget === "20000-100000"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="twenty">20k +</label>
        </div>
      </div>

      <div className="d-flex gap-1">
        <button className="btn-nav mt-3" onClick={handleApplyFilters}>Apply Filters</button>
        <button className="btn-outline mt-3" onClick={handleClearFilter}>Clear Filters</button>
      </div>


    </div>
  )
}
