import React from 'react'
import bidImage from '../../assets/images/bid.png'
import driver from '../../assets/images/driver.png'
import settings from '../../assets/images/settings.png'
import price from '../../assets/images/price.png'

export default function Services() {
    return (
        <section className='services'>
            <div className="container">
                <p className="paragraph text-center">Services</p>
                <h1 className="main-heading heading-font text-center">We Offer Best Services</h1>

                <div className="services-cards">
                    <div className="service-card">
                        <div className="image">
                            <img src={bidImage} alt="" />
                        </div>
                        <p className="service-name my-2 fw-bold">Bidding Platform</p>
                        <p className="paragraph-sm px-4">Travel agencies can use the platform to bid on travel-seekers posts.</p>
                    </div>
                    <div className="service-card">
                        <div className="image">
                            <img src={driver} alt="" />
                        </div>
                        <p className="service-name my-2 fw-bold">Driver Services</p>
                        <p className="paragraph-sm px-4">Independent drivers, can also participate in the bidding system. They can offer their driving services to travel-seekers</p>
                    </div>
                    <div className="service-card">
                        <div className="image">
                            <img src={settings} alt="" />
                        </div>
                        <p className="service-name my-2 fw-bold">Customization</p>
                        <p className="paragraph-sm px-4">Travel-seekers can post their specific requirements, number of passengers, loaded items, and the duration of the trip. </p>
                    </div>
                    <div className="service-card">
                        <div className="image">
                            <img src={price} alt="" />
                        </div>
                        <p className="service-name my-2 fw-bold">Real-time Price Comparison</p>
                        <p className="paragraph-sm px-4">The platform offers a real-time bidding system that allows travel-seekers to compare prices from different agencies </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
