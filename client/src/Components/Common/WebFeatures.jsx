import React from 'react'
import CardImage from '../../assets/images/cardimage.png'
import { FaClock, FaDisplay, FaHandshake, FaNoteSticky } from 'react-icons/fa6'

export default function WebFeatures() {
  return (
    <section className='features'>
      <div className="container">
        <h2 className='heading fw-bold text-white heading-font'>Why Trip Bidder?</h2>

        <div className="features-grid">
            <div className="grid-item">
                <div className="icon">
                    <FaDisplay className='feature-icon' />
                </div>
                <div className="content">
                    <h5 className='fw-bold mb-1'>Personalized Travel Experience</h5>
                    <p className="">Users benefit from personalized travel plans crafted by experienced agents based on their preferences, interests, and requirements.</p>
                </div>
            </div>
            <div className="grid-item">
                <div className="icon">
                    <FaHandshake className='feature-icon' />
                </div>
                <div className="content">
                    <h5 className='fw-bold mb-1'>Flexible Booking Options</h5>
                    <p className="">Users have the flexibility to choose from a variety of pre-designed plans, accommodating different budgets, durations, and travel preferences.</p>
                </div>
            </div>
            <div className="grid-item">
                <div className="icon">
                    <FaClock className='feature-icon' />
                </div>
                <div className="content">
                    <h5 className='fw-bold mb-1'>Time Savings</h5>
                    <p className="">You save time and effort in planning their trips, as agents handle the details and logistics, allowing users to focus on enjoying their travel experience</p>
                </div>
            </div>
            <div className="grid-item">
                <div className="icon">
                    <FaNoteSticky className='feature-icon' />
                </div>
                <div className="content">
                    <h5 className='fw-bold mb-1'>Feedback and Reviews</h5>
                    <p className="">The feature allows users to provide feedback and reviews on the custom plans, creating a community-driven platform where users can share their experiences and insights.</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  )
}
