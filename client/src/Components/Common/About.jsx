import React from 'react'
import CardImage from '../../assets/images/cardimage.png'

export default function About() {
  return (
    <section className='about'>
      <div className="container">
        <p className="paragraph">About Us</p>
        <h2 className='heading'>What is <span className='color-primary heading-font'>Trip-bidder?</span></h2>

        <div className="split">
            <div className="mycard">
                <div className="image">
                    <img src="https://www.shutterstock.com/image-photo/white-modern-comfortable-tourist-bus-600nw-2273138663.jpg" alt="" />
                </div>
                <h5 className='color-primary mt-4 fw-bold'>Create your custom trip plan</h5>
                <p className="paragraph mt-2">You can create your own custom plan and ask the trip provider to bid on your proposal and hence set your plan according to your constraints with the best agent</p>
            </div>
            <div className="mycard">
                <div className="image">
                    <img src="https://i0.wp.com/pediaa.com/wp-content/uploads/2016/06/Difference-Between-Trip-and-Tour-image-1.jpg?resize=551%2C364" alt="" />
                </div>
                <h5 className='color-primary mt-4 fw-bold'>Provide your services on the bid you like the most</h5>
                <p className="paragraph mt-2">You can create your own custom plan and ask the trip provider to bid on your proposal and hence set your plan according to your constraints with the best agent</p>
            </div>
            <div className="mycard">
                <div className="image">
                    <img src="https://st2.depositphotos.com/2931363/5383/i/450/depositphotos_53837931-stock-photo-people-enjoying-road-trip.jpg" alt="" />
                </div>
                <h5 className='color-primary mt-4 fw-bold'>Create your custom trip plan and allow users to book their registration</h5>
                <p className="paragraph mt-2">You can create your own custom plan and ask the trip provider to bid on your proposal and hence set your plan according to your constraints with the best agent</p>
            </div>
        </div>
      </div>
    </section>
  )
}
