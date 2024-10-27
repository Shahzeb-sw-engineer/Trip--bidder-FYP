import React, { useEffect, useState } from 'react'
import CustomAlert from '../../Components/Common/CustomAlert'
import Loader from '../../Components/Common/Loader'
import Navbar from '../../Components/Common/Navbar'
import aiLogo from '../../assets/ai-animation.json'
import loader from '../../assets/images/loader.json'
import Footer from '../../Components/Common/Footer'
import Lottie from 'lottie-react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


export default function CreateWithAI() {
    const [showLoader, setShowLoader] = useState(false)
    const [showResultOverlay, setShowResultOverlay] = useState(false)
    const [showTripResultLoader, setShowTripResultLoader] = useState(true)
    // const [tripData, setTripData] = useState(`##  Your 4-Day Adventure Awaits: Get ready for an unforgettable trip, packed with sights, tastes, and experiences that will leave you breathless! This itinerary is crafted for adventure, focusing on unique experiences and maximizing your time. **Day 1: Arrival & Urban Exploration** * **12:00 PM:** Arrive at your destination. After settling into your accommodation, grab a quick lunch at a local eatery. * **1:00 PM:**  Dive into the vibrant city center.  Start with a walking tour to uncover hidden gems and soak in the city's atmosphere. * **3:00 PM:** Immerse yourself in the local culture by visiting a renowned museum or art gallery. * **5:00 PM:**  Enjoy a relaxing stroll through a picturesque park, savoring the tranquility before venturing into the evening. * **7:00 PM:** Indulge in a delightful dinner at a highly-rated restaurant known for its regional specialties. **Day 2:  Nature's Embrace & Local Delights** * **9:00 AM:** Begin your day with a scenic drive to a breathtaking natural wonder.  Let the beauty of the landscape wash over you. * **11:00 AM:**  Engage in an adventurous activity that complements the natural surroundings - perhaps hiking, kayaking, or a thrilling zip-line adventure. * **1:00 PM:** Enjoy a picnic lunch amidst the beauty of nature. * **2:30 PM:**  Return to the city center and dive into the heart of the local market. Experience the buzz, sample local treats, and find unique souvenirs. * **4:00 PM:** Embark on a culinary adventure! Take a food tour, where you'll savor the diverse flavors of street food, sample local delicacies, and learn the art of traditional cooking. * **7:00 PM:**  Savor a delightful dinner at a charming bistro, where you can enjoy the ambiance of a bustling city. **Day 3:  Urban Adventures & Evening Entertainment** * **10:00 AM:**  Start your day with a visit to a historical landmark, tracing the city's rich past and absorbing fascinating stories. * **12:00 PM:**  Head to a local brewery or distillery for a taste of the local craft scene.  Enjoy a light lunch while learning about the brewing process. * **2:00 PM:**  Venture into a unique neighborhood known for its vibrant street art and bohemian vibes.  Get lost in the artistic expressions and discover hidden treasures. * **4:00 PM:**   Engage in a fun activity - perhaps an escape room challenge, a lively game of laser tag, or a thrilling bowling experience. * **6:00 PM:**  Relax and recharge before heading out for a spectacular evening. * **8:00 PM:**  Experience the city's nightlife by attending a live music event or enjoying a captivating theatrical performance. **Day 4: Departure & Fond Memories** * **9:00 AM:**  Enjoy a leisurely breakfast at a cozy café, savoring the last moments of your trip. * **10:00 AM:**  Do some last-minute souvenir shopping, picking up special mementos of your adventure. * **12:00 PM:**  Bid farewell to the city and embark on your journey home, carrying the memories of this incredible experience. **Reservations & Estimated Costs:** * **Restaurant Reservations:** $20-50 per person per meal (adjust based on your dining choices) * **Food Tour:** $50-75 per person * **Museum Entry:** $10-20 per person * **Adventure Activity:** $30-50 per person * **Brewery/Distillery Tour:** $20-30 per person * **Live Music Event/Theatrical Performance:** $20-40 per person **Total Budget for Activities:** Approximately $400-700 (depending on your choices) Remember, this is just a sample itinerary, feel free to customize it based on your interests and preferences! Adjust the activities, timings, and locations to make it your own. Most importantly, embrace the journey, immerse yourself in the local culture, and create memories that will last a lifetime!`)
    const [tripData, setTripData] = useState('')

    const [tripLocation, setTripLocation] = useState('')
    const [totalDays, setTotalDays] = useState('')
    const [totalPeople, setTotalPeople] = useState('')
    const [travellingWith, setTravellingWith] = useState('')
    const [budget, setBudget] = useState('')
    const [occation, setOccation] = useState('')

    // const formattedItinerary = tripData
    //     .replace(/\n/g, '<br />')
    //     .replace(/\*\*(.*?)\*\*/g, '<p class="fw-bold">$1</p>')
    //     .replace(/\* /g, '<br />')
    //     .replace(/\## /g, '')

    const generateAITrip = (e) => {
        e.preventDefault()

        if (!tripLocation || !totalDays || !totalPeople || !travellingWith) {
            toast.error("One or more fields are empty.");
            return
        }
        setShowResultOverlay(true)


        const tripData = {
            tripLocation,
            totalDays,
            totalPeople,
            travellingWith,
            budget,
            occation
        }


        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/gemini/createAITrip`, tripData)
            .then(response => {
                console.log(response)
                response = response.data
                if (response.status) {
                    setShowTripResultLoader(false)
                    // const formattedItinerary = response.data
                    //     .replace(/\n/g, '<br />')
                    //     .replace(/\*\*(.*?)\*\*/g, '<p class="fw-bold">$1</p>')
                    //     .replace(/\* /g, '<br />')
                    //     .replace(/\## /g, '')


                    const formattedItinerary = response.data
                        .replace(/\n/g, '<br />')
                        .replace(/\*\*(.*?)\*\*/g, '<p class="fw-bold">$1</p>')
                        .replace(/\*(.*?)\*/g, '<p class="fw-bold">$1</p>')
                        .replace(/\## /g, '')
                    setTripData(formattedItinerary)
                }
                else {
                    setShowResultOverlay(true)
                    setShowTripResultLoader(false)
                    toast.error(response.message)
                }
            })
            .catch(error => {
                setShowLoader(false)
                // showAlert('error', error.response.data.message)
                console.log(error)
            })
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tripData)
        toast.success("Response copied successfully")
    }

    function printElem() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write(tripData);

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    }
    const handleBack = () => {
        setShowResultOverlay(false)
        setShowTripResultLoader(true)

        setTripLocation('');
        setTotalDays('');
        setTotalPeople('');
        setTravellingWith('');
        setBudget('');
        setOccation('');
    }

    return (
        <>
            <Toaster />
            <Loader show={showLoader} />
            <CustomAlert />
            <Navbar />

            <section className="ai-trip-section">
                <div className="container">
                    {
                        showResultOverlay ? (
                            <div className="trip-result">
                                {
                                    showTripResultLoader ? (
                                        <div className="loader">
                                            <Lottie
                                                animationData={loader}
                                                height={150}
                                                width={150}
                                            />
                                            <p>Generating your trip, please wait!</p>
                                        </div>
                                    )
                                        :
                                        (
                                            <div className="content ">
                                                <h5 className='text-decoration-underline color-primary mb-4' style={{ cursor: "pointer" }} onClick={handleBack}>&#60;Back</h5>
                                                <h2 className='mb-3 heading-font main-heading color-primary'>Here is the trip information created by AI</h2>

                                                {/* <ReactMarkdown>{tripData && tripData}</ReactMarkdown> */}
                                                <div dangerouslySetInnerHTML={{ __html: tripData }} />
                                                {/* <div>
                                                    {
                                                        tripData && tripData
                                                    }
                                                </div> */}

                                                <div className="d-flex mt-4 gap-3">
                                                    <div className="btn-nav" onClick={copyToClipboard}>Copy to Clipboard</div>
                                                    <div className="btn-outline" onClick={printElem}>Print as Document</div>
                                                </div>

                                            </div>
                                        )
                                }


                            </div>
                        )
                            : (
                                <>
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: aiLogo,
                                        }}
                                        height={150}
                                        width={150}
                                    />
                                    <h1 className='text-center text-uppercase main-heading heading-font color-primary'>Plan Your Next Adventure From Trip-bidder AI</h1>
                                    <p className="paragraph text-center">Provide some of the basic information to ai to plan your trip</p>

                                    <form action="" className="ai-form" onSubmit={generateAITrip}>
                                        <div className="form-group mb-5">
                                            <label htmlFor="">Where do you want to go?*</label>
                                            <input type="text" className="myinput-vii" placeholder='Enter city Name' onChange={e => setTripLocation(e.target.value)} value={tripLocation} />
                                        </div>
                                        <div className="row mb-5 justify-content-between">
                                            <div className="col-6 form-group">
                                                <label htmlFor="">Number of Days*</label>
                                                <input type="number" name="" id="" className="myinput-vii" onChange={e => setTotalDays(e.target.value)} value={totalDays} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label htmlFor="">Select Number of Persons Traveling?*</label>
                                                <input type="number" name="" id="" className="myinput-vii" onChange={e => setTotalPeople(e.target.value)} value={totalPeople} />
                                            </div>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label htmlFor="">Select who are going with you?*</label>
                                            <select name="" className='myinput-vii' id="" onChange={e => setTravellingWith(e.target.value)} value={travellingWith}>
                                                <option value="">Choose any option</option>
                                                <option value="family">Family</option>
                                                <option value="friends">Friends</option>
                                                <option value="alone">Alone</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label htmlFor="">How much do you want spend on this trip? <span className='text-secondary'>(Optional)</span></label>
                                            <input type="text" className="myinput-vii" placeholder='$100' onChange={e => setBudget(e.target.value)} value={budget} />
                                            <small className='text-secondary float-end'>Consider Stay + Activities + Food. Do not include flights.</small>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label htmlFor="">Are you traveling for a special occasion? <span className='text-secondary'>(Optional)</span></label>
                                            <select name="" className='myinput-vii' id="" onChange={e => setOccation(e.target.value)} value={occation}>
                                                <option value="">Choose any option</option>
                                                <option value="event">Event</option>
                                                <option value="party">Party</option>
                                                <option value="shopping">Shopping</option>
                                                <option value="sightseeing">Sight-Seeing</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn-nav mx-auto d-block" type='submit'>Create Now!</button>
                                        </div>
                                    </form>
                                </>
                            )
                    }




                </div>
            </section>
            <Footer />
        </>
    )
}
