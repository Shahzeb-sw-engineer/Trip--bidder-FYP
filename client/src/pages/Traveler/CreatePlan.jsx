import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../Components/Common/Loader'
import CustomAlert from '../../Components/Common/CustomAlert'
import Navbar from '../../Components/Common/Navbar'
import showAlert from '../../utils/showAlert'
import Select from 'react-select'
import { FaCircleQuestion } from 'react-icons/fa6'
import Footer from '../../Components/Common/Footer'
import axios from 'axios'
import { SERVER_URL } from '../../assets/data/secret'
import Tripinfo from '../Agent/Tripinfo'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function CreatePlan() {
    const [tripInfo, setTripInfo] = useState({
        title: '',
        fatherName: '',
        type: '',
        description: '',
        startDate: '',
        endDate: '',
        country: '',
        state: '',
        cities: [],
        passengers: '',
        budget: '',
        departureAddress: '',
        transportType: '',
        isAccomodation: false,
        accomodationName: '',
        userID: ''
    })
    const [radio, setRadio] = useState(false)
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    // check if the page is for updating 
    const [isUpdatePage, setIsUpdatePage] = useState(false)
    const location = useLocation()

    const calenderRef = useRef()
    useEffect(() => {
        var today = new Date().toISOString().split('T')[0];
        calenderRef.current.setAttribute('min', today);
    }, [])


    let params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const { pathname } = location;
        if (pathname.includes('/user/update-trip')) {
            setIsLoading(true)
            setIsUpdatePage(true)

            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getTripById/${params.id}`)
                .then(response => {
                    response = response.data
                    setIsLoading(false)
                    if (response.status) {
                        setTripInfo({
                            title: response.data.title,
                            type: response.data.type,
                            description: response.data.description,
                            startDate: response.data.startDate,
                            endDate: response.data.endDate,
                            country: response.data.country,
                            state: response.data.state,
                            cities: response.data.cities,
                            passengers: response.data.passengers,
                            budget: response.data.budget,
                            departureAddress: response.data.departureAddress,
                            transportType: response.data.transportType,
                            isAccomodation: response.data.isAccomodation,
                            accomodationName: response.data.accomodationName,
                            userID: response.data.userID
                        })

                        fetchStates(response.data.country)
                        fetchCities(response.data.country, response.data.state)


                    }
                    else {
                        toast.error('Something went wrong!')
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    toast.error('Something went wrong!')
                    console.log(err)
                })
        }
    }, [])



    const fetchCountries = () => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "SzVCdVpRWlFNUGpoQ1d5VnhvRTc4bGJtTHZ6WlF2VWZydkRIUVpvbQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCountries(result)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        fetchCountries()
    }, [])


    const handleSubmit = e => {
        e.preventDefault()
        if (tripInfo.type === "" || tripInfo.title === "" || tripInfo.description === "" || tripInfo.startDate === "" || tripInfo.endDate === "" || tripInfo.country === "" ||
            tripInfo.state === "" || tripInfo.cities.length === 0 || tripInfo.passengers === "" || tripInfo.budget === "" || tripInfo.departureAddress === "" || tripInfo.transportType === "") {
            toast.error('Fill out Required Fields')
        }


        setIsLoading(true)
        let user = JSON.parse(localStorage.getItem('user'))


        let data = {
            title: tripInfo.title,
            type: tripInfo.type,
            description: tripInfo.description,
            startDate: tripInfo.startDate,
            endDate: tripInfo.endDate,
            country: tripInfo.country,
            state: tripInfo.state,
            cities: tripInfo.cities,
            passengers: parseInt(tripInfo.passengers),
            budget: parseInt(tripInfo.budget),
            departureAddress: tripInfo.departureAddress,
            transportType: tripInfo.transportType,
            userID: user._id,
            isAccomodation: tripInfo.isAccomodation,
            accomodationName: tripInfo.accomodationName,
            status: true
        }

        if (isUpdatePage) {
            axios.put(`${import.meta.env.VITE_SERVER_URL}/api/updateTrip/${params.id}`, data)
                .then(res => {
                    setIsLoading(false)
                    res = res.data
                    if (res.status) {
                        toast.success('Trip updated successfully')
                        setTimeout(() => {
                            navigate('../user/plans')
                        }, 1000);
                    }
                    else {
                        toast.error('Something went wrong while updating Trip')
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    toast.error('Something went wrong while updating profile')
                    console.log(err)
                })
        }
        else {
            axios.post(`${import.meta.env.VITE_SERVER_URL}/api/createTrip`, data)
                .then(response => {
                    response = response.data
                    setIsLoading(false)
                    if (response.status) {
                        toast.success('Trip Created Successfully')
                        setTimeout(() => {
                            navigate('../user/plans')
                        }, 1000);
                        resetFields()
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err)
                })
        }



    }

    const fetchStates = (country) => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "SzVCdVpRWlFNUGpoQ1d5VnhvRTc4bGJtTHZ6WlF2VWZydkRIUVpvbQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setStates(result)
            })
            .catch(error => console.log('error', error));
    }

    const fetchCities = (country, state) => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "SzVCdVpRWlFNUGpoQ1d5VnhvRTc4bGJtTHZ6WlF2VWZydkRIUVpvbQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setCities(result)
            })
            .catch(error => console.log('error', error));
    }

    const handleCountryChange = (e) => {
        setTripInfo({ ...tripInfo, country: e.value })
        fetchStates(e.value)
    }
    const handleStateChange = (e) => {
        setTripInfo({ ...tripInfo, state: e.value })
        fetchCities(tripInfo.country, e.value)
    }



    const handleSelectCities = (value) => {
        const selectedValues = value.map(city => city.value);

        setTripInfo(prevState => ({
            ...prevState,
            cities: selectedValues
        }));
    };

    const resetFieldsBtn = (e) => {
        e.preventDefault()
        setTripInfo({
            title: '',
            type: '',
            description: '',
            startDate: '',
            endDate: '',
            country: '',
            state: '',
            cities: [],
            passengers: '',
            budget: '',
            departureAddress: '',
            transportType: '',
            isAccomodation: false,
            accomodationName: '',
            userID: ''
        })
        // setCities([])
        // setCountries([])
        // setStates('')

    }

    const resetFields = () => {
        setTripInfo({
            title: '',
            type: '',
            description: '',
            startDate: '',
            endDate: '',
            country: '',
            state: '',
            cities: [],
            passengers: '',
            budget: '',
            departureAddress: '',
            transportType: '',
            isAccomodation: false,
            accomodationName: '',
            userID: ''
        })

    }

    return (
        <>
            <Loader show={isLoading} />
            <Toaster />
            <CustomAlert />
            <Navbar />
            <section className="createPlan main-layout">
                <div className="custom-container">
                    <h4 className='my-4 text-uppercase fw-bold'>Create Your Trip Plan</h4>
                    <div className="flex-layout">
                        <div className="side side-xl createPlan">
                            <form action="" onSubmit={handleSubmit} >

                                <small className='color-primary'>TRIP INFORMATION</small>
                                <hr className='my-0 mb-4' />

                                <div className="row mb-2">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>Trip Title<span className='text-danger'>*</span></label>
                                            <input type="text" maxLength="80" value={tripInfo.title} onChange={(e) => setTripInfo({ ...tripInfo, title: e.target.value })} />

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>Trip Type<span className='text-danger'>*</span></label>
                                            <select className='myinput-vii' value={tripInfo.type} onChange={(e) => setTripInfo({ ...tripInfo, type: e.target.value })} >
                                                <option value="">Choose Trip Type</option>
                                                <option value="Solo">Solo</option>
                                                <option value="Family">Family</option>
                                                <option value="Business">Business</option>
                                                <option value="Friends">Friends</option>
                                                <option value="Hiking">Hiking</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="SightSeeing">SightSeeing</option>
                                                <option value="Event">Event</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className='mb-1'>Trip Description<span className='text-danger'>*</span></label>
                                    <textarea cols="30" rows="3" maxLength="2000" style={{ maxHeight: "190px" }} value={tripInfo.description} onChange={e => setTripInfo({ ...tripInfo, description: e.target.value })}></textarea>
                                    <small>Maximum of 500 characters allowed</small>
                                </div>

                                <small className='color-primary'>TRIP DURATION</small>
                                <hr className='my-0 mb-3' />

                                <div className="row mb-2">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>Start Date<span className='text-danger'>*</span></label>
                                            <input type="date" value={tripInfo.startDate} ref={calenderRef} onChange={(e) => setTripInfo({ ...tripInfo, startDate: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>End Date<span className='text-danger'>*</span></label>
                                            <input type="date" value={tripInfo.endDate} onChange={(e) => setTripInfo({ ...tripInfo, endDate: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <small className='color-primary'>TRIP BUDGET</small>
                                <hr className='my-0 mb-3 text-secondary' />

                                <div className="row mb-2">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>Total Passengers<span className='text-danger'>*</span></label>
                                            <input type="number" max="100" value={tripInfo.passengers} onChange={(e) => setTripInfo({ ...tripInfo, passengers: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group">
                                            <label>Proposed Budget<span className='text-danger'>*</span></label>
                                            <input type="number" max="99999" value={tripInfo.budget} onChange={(e) => setTripInfo({ ...tripInfo, budget: e.target.value })} />
                                            <small className='paragraph-sm mb-0'>Rupees currency will be used</small>
                                        </div>
                                    </div>
                                </div>

                                <small className='color-primary'>TRIP LOCATION</small>
                                <hr className='my-0 mb-3 text-secondary' />

                                <div className="row mb-2">
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose Country<span className='text-danger'>*</span></label>
                                        <Select
                                            className="select"
                                            options={countries.map(country => ({ value: country.iso2, label: country.name }))}
                                            placeholder="Select Country"
                                            onChange={handleCountryChange}
                                            required

                                        />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose State/Province<span className='text-danger'>*</span></label>
                                        <Select
                                            className="select"
                                            options={states.map(state => ({ value: state.iso2, label: state.name }))}
                                            placeholder="Select State"
                                            onChange={handleStateChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <label className='mb-1'>Choose Cities<span className='text-danger'>*</span></label>
                                        <Select
                                            className="select"
                                            options={cities.map(city => ({ value: city.name, label: city.name }))}

                                            placeholder="Select City"
                                            onChange={handleSelectCities}
                                            required
                                            isMulti
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Departure Address<span className='text-danger'>*</span></label>
                                    <input type="text" maxLength="200" value={tripInfo.departureAddress} onChange={(e) => setTripInfo({ ...tripInfo, departureAddress: e.target.value })} />
                                </div>

                                <small className='color-primary'>OTHER INFORMATION</small>
                                <hr className='my-0 mb-3 text-secondary' />

                                <div className="row mb-2">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        <div className="form-group mt-3 d-flex justify-content-between align-items-center pt-2">
                                            <label htmlFor="">Accomodation Service<span className='text-danger'>*</span></label>
                                            <div className="radios">
                                                <div className={`radio ${radio ? 'active' : ''}`} onClick={() => { setRadio(true); setTripInfo({ ...tripInfo, isAccomodation: true }) }}>Yes</div>
                                                <div className={`radio ${radio ? '' : 'active'}`} onClick={() => { setRadio(false); setTripInfo({ ...tripInfo, isAccomodation: false }) }}>No</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                                        {
                                            radio && (
                                                <div className="form-group">
                                                    <label>Accomodation Name<span className='text-danger'>*</span></label>
                                                    <input type="text" maxLength="100" value={tripInfo.accomodationName} onChange={(e) => setTripInfo({ ...tripInfo, accomodationName: e.target.value })} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="form-group mb-3 col-6">
                                    <label>Transport Type<span className='text-danger'>*</span></label>
                                    <input type="text" maxLength="100" value={tripInfo.transportType} onChange={(e) => setTripInfo({ ...tripInfo, transportType: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    {
                                        isUpdatePage ? (
                                            <button className="btn-custom mt-3 float-end ms-2" type='submit'>Update</button>
                                        ) : (
                                            <button className="btn-custom mt-3 float-end ms-2" type='submit'>Submit</button>
                                        )
                                    }
                                    <button className="btn-outline mt-3 float-end" onClick={resetFieldsBtn}>Reset</button>
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
                            <div className="instruction-item mb-2">
                                <p className='color-primary fs-6'>Trip initial Address</p>
                                <p className="paragraph-sm text-secondary">Add your initial address from where you and agent
                                    will start trip.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
