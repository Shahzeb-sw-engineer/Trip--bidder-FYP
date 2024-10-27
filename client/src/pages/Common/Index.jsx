import React from 'react'
import Hero from '../../Components/Common/Hero'
import About from '../../Components/Common/About'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import WebFeatures from '../../Components/Common/WebFeatures'
import Services from '../../Components/Common/Services'
import UserFlow from '../../Components/Common/UserFlow'
import AgentFlow from '../../Components/Common/AgentFlow'
import Testimonials from '../../Components/Common/Testimonials'
import { Link } from 'react-router-dom'

export default function index() {
  return (
    <>
    <Navbar />
    <Hero />
    <Services />
    <About />
    <WebFeatures />
    <UserFlow />
    <AgentFlow />
    <Testimonials />
    <Footer />
    </>
  )
}
