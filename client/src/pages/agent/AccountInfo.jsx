import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import showAlert from '../../utils/showAlert'
import CustomAlert from '../../Components/Common/CustomAlert'
import Select from 'react-select'


export default function AccountInfo() {
    const navigate = useNavigate()
    const [data, setData] = useState(
        {
            fullname: '',
            phone: '',
            slogan: '',
            bio: '',
            country: '',
            state: '',
            city: '',
            address: ''
        })

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])


    useEffect(() => {
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
                .catch(error => console.log('error, ', error));
        }
        fetchCountries()
    }, [])

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

    const fetchCities = (state) => {
        var myHeaders = new Headers();
        myHeaders.append("X-CSCAPI-KEY", "SzVCdVpRWlFNUGpoQ1d5VnhvRTc4bGJtTHZ6WlF2VWZydkRIUVpvbQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/${data.country}/states/${state}/cities`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setCities(result)
            })
            .catch(error => console.log('error', error));
    }

    const location = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.fullname.length === 0 || data.phone.length === 0 || data.country.length === 0 || data.state.length === 0) {
            showAlert('Fill out empty fields', 'danger')
            return
        }
        let user = JSON.parse(localStorage.getItem('user'))
        navigate('/businessinfo', { state: { personalinfo: { ...data, userID: user._id, role: "agent" } } })
    }

    const handleCountryChange = (e) => {
        setData({ ...data, country: e.value })
        fetchStates(e.value)
    }
    const handleStateChange = (e) => {
        setData({ ...data, state: e.value })
        fetchCities(e.value)
    }

    return (
        <>
            <CustomAlert />
            <div className="topbar py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className='nav-logo' viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" /></svg>
                        <h5 className="logo-text color-primary fw-bold ms-2">TRIP-BIDDER</h5>
                    </div>
                </div>
            </div>

            <section className='register accountInfo'>
                <div className="info-container">


                    <div className="content">
                        <p className="paragraph mt-1">Step 1</p>
                        <h3 className='color-primary fw-bolder'>Personal Information</h3>
                    </div>

                    <form action="" className="info-form" onSubmit={handleSubmit}>
                        <div className="side">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="">Full Name</label>
                                        <div className="myinput">
                                            <input type="text" maxLength="30" value={data.fullname} onChange={(e) => { setData({ ...data, fullname: e.target.value }) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="">Phone Number</label>
                                        <div className="myinput">
                                            <input type="text" maxLength="11" value={data.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Slogan</label>
                                <div className="myinput">
                                    <input type="text" maxLength="30" value={data.slogan} onChange={(e) => { setData({ ...data, slogan: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Bio</label>
                                <div className="myinput">
                                    <textarea maxLength="100" cols="30" rows="6" value={data.bio} onChange={(e) => { setData({ ...data, bio: e.target.value }) }}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="side">

                            <div className="form-group">
                                <label htmlFor="">Choose Country</label>
                                <div className="myinput">
                                    {/* <input type="text" value={data.country} onChange={(e) => { setData({ ...data, country: e.target.value }) }} /> */}
                                    <Select
                                        className="select"
                                        options={countries.map(country => ({ value: country.iso2, label: country.name }))}
                                        placeholder="Select Country"
                                        onChange={handleCountryChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Choose State/Province</label>
                                <div className="myinput">
                                    {/* <input type="text" value={data.state} onChange={(e) => { setData({ ...data, state: e.target.value }) }} /> */}
                                    <Select
                                        className="select"
                                        options={states.map(state => ({ value: state.iso2, label: state.name }))}
                                        placeholder="Select State"
                                        onChange={handleStateChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Choose City</label>
                                <div className="myinput">
                                    {/* <input type="text" value={data.city} onChange={(e) => { setData({ ...data, city: e.target.value }) }} /> */}
                                    <Select
                                        className="select"
                                        options={cities.map(city => ({ value: city.name, label: city.name }))}
                                        placeholder="Select City"
                                        onChange={(e) => { setData({ ...data, city: e.value }) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Local Address</label>
                                <div className="myinput">
                                    <input type="text" maxLength="100" value={data.address} onChange={(e) => { setData({ ...data, address: e.target.value }) }} />
                                </div>
                            </div>

                            <button className="btn-custom float-end mb-3" >Next</button>

                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
