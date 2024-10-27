import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import AllPlans from '../../Components/Agent/AllPlans'
import Filters from '../../Components/Common/Filters'
import Loader from '../../Components/Common/Loader'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'



export default function Home() {
    const [showFilters, setShowFilters] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [trips, setTrips] = useState([])
    const [paginationData, setPaginationData] = useState({})
    const [searchInput, setSearchInput] = useState('')

    const [limit, setLimit] = useState(10)  // records to be fetched at one api call

    const [sortBy, setSortBy] = useState('asc')
    const [selectedBudget, setSelectedBudget] = useState('')
    const [minBudget, setMinBudget] = useState('')
    const [maxBudget, setMaxBudget] = useState('')

    const fetchData = () => {
        setIsLoading(true)

        const minBudgetQuery = minBudget || '';
        const maxBudgetQuery = maxBudget || '';

        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getAllTrips?limit=${limit}&sortby=${sortBy}&minBudget=${minBudgetQuery}&maxBudget=${maxBudgetQuery}&city=${searchInput}`)
            .then(response => {
                response = response.data
                setIsLoading(false)
                if (response.status) {
                    setTrips(response.data.documents)
                    setPaginationData({
                        currentPage: response.data.currentPage,
                        totalPages: response.data.totalPages,
                        hasNextPage: response.data.hasNextPage,
                        hasPrevPage: response.data.hasPrevPage,
                        totalItems: response.data.totalTrips,
                    })

                }
                else {
                    setTrips([])
                    toast.error('Something went wrong')
                }
            })
            .catch(err => {
                setIsLoading(false)
                toast.error('Something went wrong')
                console.log(err)
            })
    }


    useEffect(() => {
        fetchData()
    }, [limit])


    const handleLimit = () => {
        let newLimit = limit * 2;
        if (newLimit <= paginationData.totalItems) {
            setLimit(newLimit)
        }
        else {
            toast.error("No more trips found")
        }
    }

    const handleSearchTrips = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [minBudget, maxBudget])

    const handleApplyFilters = () => {
        const budgetArray = selectedBudget.split('-').map(Number);
        let minBudget = budgetArray[0]
        let maxBudget = budgetArray[1]

        setMinBudget(minBudget)
        setMaxBudget(maxBudget)

        fetchData()
    }

    const handleClearFilter = () => {
        setMinBudget('')
        setMaxBudget('')
        setSelectedBudget('')
        setSortBy('')
        setSearchInput('')

        fetchData()
    }
    return (
        <>
            <Toaster />
            <Loader show={isLoading} />
            <Navbar />
            <section className="allPlans main-layout">
                <div className="custom-container">
                    <div className="flex-layout">
                        <AllPlans
                            data={trips && trips}
                            setShowFilters={setShowFilters}
                            handleLimit={handleLimit}
                            setSearchInput={setSearchInput}
                            searchInput={searchInput}
                            handleSearchTrips={handleSearchTrips}
                        />
                        <Filters showFilters={showFilters} setShowFilters={setShowFilters} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} sortBy={sortBy} setSortBy={setSortBy} handleApplyFilters={handleApplyFilters} handleClearFilter={handleClearFilter} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
