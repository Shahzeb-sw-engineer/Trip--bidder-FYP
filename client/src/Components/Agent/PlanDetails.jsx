import React from 'react'
import { FaBuilding, FaCar, FaDollarSign, FaMoneyBill } from 'react-icons/fa6'

export default function PlanDetails({ fullView, data }) {
    return (

        <div className={`${fullView ? 'planDetails side' : 'side side-xl planDetails'}`}>
            <div className="row">
                <div className="col-10">
                    <h4>{data.title}</h4>
                    <p className="paragraph-sm mt-2">Posted On: {new Date(data.createdAt).toDateString()}</p>
                </div>
                <div className="col-2">
                    <h4 className="fw-bold">2 Bids</h4>
                </div>
            </div>
            <hr className="seperator" />

            <h5 className="mt-1">Description</h5>
            <p className="mt-2" style={{ wordWrap: "break-word" }}>
                {data.description}
            </p>

            <hr className="seperator" />

            <div className="features-layout">
                <div className="flx-item">
                    <h5 className='mb-3'>Sites to Cover</h5>
                    <p>{data.country} - KPK</p>

                    <div className="cities mt-1">
                        {
                            data.cities.length > 0 ?
                                data.cities.map((city, i) => {
                                    return (
                                        <div key={i} className="feature">{city}</div>
                                    )
                                })
                                : (
                                    <div className="feature me-1">No Cities</div>
                                )
                        }
                    </div>
                </div>
                <div className="flx-item">
                    <h5 className='mb-3'>Plan Features</h5>
                    <div className='d-flex align-items-center mt-1'>
                        <FaCar className='color-primary' />
                        <p className="ms-2">{data.transportType} Service</p>
                    </div>
                    {
                        data.isAccomodation && (
                            <div className='d-flex align-items-center mt-1'>
                                <FaBuilding className='color-primary' />
                                <p className="ms-2">Accomodation Service</p>
                            </div>
                        )
                    }
                </div>
                <div className="flx-item">
                    <h5 className='mb-3'>Budget</h5>
                    <div className='d-flex align-items-center mt-1'>
                        <FaMoneyBill className='color-primary' />
                        <p className="ms-2 fw-bold">Rs. {data.budget}/-</p>
                    </div>
                    <div className="schedule mt-1">
                        <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                            <p className="fw-bold">FROM:</p>
                            <p className="fw-bold">{data.startDate}</p>
                        </div>
                        <div className='d-flex align-items-center mt-1 w-100 justify-content-between'>
                            <p className="fw-bold">To:</p>
                            <p className="fw-bold">{data.endDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
