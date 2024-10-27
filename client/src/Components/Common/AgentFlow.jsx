import React from 'react'
import agentFlow from '../../assets/images/Agent Flow.png'

export default function AgentFlow() {
    return (
        <>

            <section className='agentFlow'>
                <div className="container">
                    <h2 className='heading fw-bold heading-font text-center'>How will Agent use <span className='color-primary'>Trip Bidder</span> ?</h2>
                    <img src={agentFlow} alt="" className='mt-5 d-block mx-auto' style={{maxWidth: "80%"}} />
                </div>
            </section>

        </>
    )
}
