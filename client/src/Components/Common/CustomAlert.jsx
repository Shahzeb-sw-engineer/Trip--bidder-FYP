import React from 'react'
import { FaDiagramSuccessor, FaXmark } from 'react-icons/fa6'

export default function CustomAlert(props) {

    const handleClose = () =>{
      document.querySelector('.custom-alert').classList.remove('show')
      document.querySelector('.custom-alert').classList.remove('succes')
      document.querySelector('.custom-alert').classList.remove('danger')
    }
  return (
    <div className={`custom-alert`}>
    {/* <div className={`custom-alert success `}> */}
        <FaXmark className='close-icon' onClick={handleClose} />
        <p className="alert-text my-3 mt-4"></p>
        <button className="btn-custom" onClick={handleClose}>Ok</button>
    </div>
  )
}
