import React, { useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { FaUserTie, FaPlaneUp } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export default function AccountType() {
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  const handleRole = (role) => {
    setRole(role)
    // console.log(role)
    navigate('/register', {state: {role: role}})
  }
  return (
    <>
      <div className="topbar py-3">
        <div className="container">
          <div className="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
          <h5 className="logo-text color-primary fw-bold ms-2">TRIP-BIDDER</h5>
        </div>
        </div>
      </div>

      <section className='register accountType'>
        <div className="container">
          <h1 className='text-center'>Choose Your Role</h1>
          <p className="paragraph text-center">Choose your role</p>
          <div className="split">
            <div className="column" onClick={() => { handleRole('agent') }}>
              <FaUserTie className='role-icon' />
              <p className="paragraph fw-bold">JOIN AS</p>
              <h2 className='role-heading'>Agent</h2>
            </div>
            <div className="column" onClick={() => { handleRole('traveller') }}>
              <FaPlaneUp className='role-icon' />
              <p className="paragraph fw-bold">JOIN AS</p>
              <h2 className='role-heading'>Traveller</h2>
            </div>
          </div>


        </div>
      </section>
    </>
  )
}
