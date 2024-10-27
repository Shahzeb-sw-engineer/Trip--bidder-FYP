import React, { useState } from 'react'
import Loader from '../../Components/Common/Loader'
import CustomAlert from '../../Components/Common/CustomAlert'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import { FaCircleQuestion, FaQuestion } from 'react-icons/fa6'

export default function CreateCustomPlan() {
    const [showLoader, setShowLoader] = useState(false)
    const [planData, setPlanData] = useState({
        title: "",
        type: "",
        description: "",
        month: "",
        totalPassengers: "",
        totalDays: "",
        budget: "",
        depFrom: "",
        depTime: "",
        returnTo: "",
        returnTime: "",
        transport: "",
        accomodation: "",
        images: [],
    })

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImage = Array.from(files);

        setPlanData({
            ...planData,
            images: [...planData.images, ...newImage],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(planData)
    }
    return (
        <>
            <Loader show={showLoader} />
            <CustomAlert />
            <Navbar />
            <section className="chats main-layout">
                <div className="custom-container">
                    <h4 className='my-4 text-uppercase fw-bold'>Create Custom Plan</h4>
                    <div className="flex-layout">
                        <div className="side side-xl createPlan">
                            <form action="" onSubmit={handleSubmit} >
                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Trip Title</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, title: e.target.value }) }} value={planData.title} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Trip Type</label>
                                        {/* <input type="text" className="myinput-vii" onChange={(e) => {setPlanData({...planData, type: e.target.value})}}/> */}
                                        <select className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, type: e.target.value }) }} value={planData.type}>
                                            <option value="">Choose Trip Type</option>
                                            <option value="SightSeeing">SightSeeing</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Family Trip">Family Trip</option>
                                            <option value="School/College">School/College</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className='mb-1'>Trip Description</label>
                                    <textarea className="myinput-vii" rows="3" spellCheck style={{ maxHeight: "150px" }} onChange={(e) => { setPlanData({ ...planData, description: e.target.value }) }} value={planData.description}></textarea>
                                </div>
                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Expected Plan Month</label>
                                        <input type="date" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, month: e.target.value }) }} value={planData.month} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Total Days</label>
                                        <input type="number" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, totalDays: e.target.value }) }} value={planData.totalDays} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose Country</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, data: e.target.value }) }} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose State/Province</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, data: e.target.value }) }} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose Cities</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, data: e.target.value }) }} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Total Passengers</label>
                                        <input type="number" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, totalPassengers: e.target.value }) }} value={planData.totalPassengers} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Total Budget/Person</label>
                                        <input type="number" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, budget: e.target.value }) }} value={planData.budget} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Departure From</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, depFrom: e.target.value }) }} value={planData.depFrom} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Departure Time</label>
                                        <input type="time" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, depTime: e.target.value }) }} value={planData.depTime} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Return To</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, returnTo: e.target.value }) }} value={planData.returnTo} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Return Time</label>
                                        <input type="time" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, returnTime: e.target.value }) }} value={planData.returnTime} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Transort Name</label>
                                        <input type="text" className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, transport: e.target.value }) }} value={planData.transport} />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label className='mb-1'>Accomodation Type</label>
                                        {/* <input type="time" className="myinput-vii" /> */}
                                        <select className="myinput-vii" onChange={(e) => { setPlanData({ ...planData, accomodation: e.target.value }) }} value={planData.accomodation}>
                                            <option value="">Choose Accomodation</option>
                                            <option value="Hotel">Hotel</option>
                                            <option value="Resturent">Resturent</option>
                                            <option value="Hostel">Hostel</option>
                                            <option value="Self">Self</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className='mb-1'>Upload Some Images</label>
                                    <input type="file" multiple accept='image/*' className="myinput-vii" onChange={handleImageChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn-nav mt-3">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="side side-sm instructions">
                            <p className="paragraph-sm mb-3">Help & Support <FaCircleQuestion className='color-primary' /></p>
                            <p className='mb-3'>Following are the instruction, which should be
                                followed when creating a trip plan</p>

                            <div className="instruction-item mb-2">
                                <p className='color-primary fs-6'>Trip Title</p>
                                <p className="paragraph-sm text-secondary">Should be unique and understandable
                                    eg A family trip with car service.</p>
                            </div>
                            <div className="instruction-item mb-2">
                                <p className='color-primary fs-6'>Trip Type</p>
                                <p className="paragraph-sm text-secondary">Select the best suited trip type</p>
                            </div>
                            <div className="instruction-item mb-2">
                                <p className='color-primary fs-6'>Trip Description</p>
                                <p className="paragraph-sm text-secondary">Explain your trip here, so that agent can understand
                                    your requirements </p>
                            </div>
                            <div className="instruction-item mb-2">
                                <p className='color-primary fs-6'>Destination</p>
                                <p className="paragraph-sm text-secondary">For destination, select country, state and then
                                    city. Multiple cities  can be selected.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </>
    )
}
