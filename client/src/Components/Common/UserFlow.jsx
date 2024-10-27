import React from 'react'
import userFlow from '../../assets/images/User Flow.png'

export default function UserFlow() {
    return (
        <>

            <section className='userflow'>
                <div className="container">
                    <h2 className='heading fw-bold heading-font text-center'>How will you use <span className='color-primary'>Trip Bidder</span> ?</h2>
                    <img src={userFlow} alt="" className='mt-5 d-block mx-auto' style={{maxWidth: "80%"}} />
                </div>
            </section>

        </>
    )
}
