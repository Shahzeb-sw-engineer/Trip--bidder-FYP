import React from 'react'
import Lottie from "lottie-react"
import loader from '../../assets/images/loader.json'
// import loader from '../../assets/ai-animation.json'

export default function Loader(props) {
  return (
    <div className={`loader-container ${props.show ? 'show': ''}`}>
        <Lottie className='loader' animationData={loader} loop={true} />
    </div>
  )
}
