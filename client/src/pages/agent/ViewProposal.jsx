import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import PlanDetails from '../../Components/Agent/PlanDetails'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProposalDetails from '../../Components/Common/ProposalDetails'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../../Components/Common/Loader'

export default function ViewProposal() {
  const [isLoading, setIsLoading] = useState(false)
  const [proposalData, setPropsalData] = useState(null)
  const [proposalAccepted, setProposalAccepted] = useState(false)


  let params = useParams()
  const navigate = useNavigate()
  const fetchData = () => {
    setIsLoading(true)
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getBidById/${params.id}`)
      .then(response => {
        response = response.data
        setIsLoading(false)
        console.log(response)
        if (response.status) {
          setPropsalData(response.data)
        }
        else {
          // toast.error('Something went wrong!')
        }
      })
      .catch(err => {
        setIsLoading(false)
        toast.error('Something went wrong!')
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  const acceptProposal = isAccepted => {
    // API call to update proposal status
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/updateBidStatus/${proposalData._id}/${isAccepted}`)
      .then(response => {
        response = response.data
        setIsLoading(false)

        if (response.status) {
          if (isAccepted) {
            toast.success('You have accepted this proposal')
            setProposalAccepted(true)
          }
          else {
            toast.success('You have rejected this proposal')
          }

          fetchData()
        }
        else {
          setIsLoading(false)
          toast.error('Something went wrong with the proposal reaction');
          console.log(response)
        }
      })
      .catch(err => {
        setIsLoading(false)
        toast.error('Something went wrong with the proposal reaction');
        console.log(err)
      })
  }


  const handleInitiateChat = () => {
    setIsLoading(true)
    let loggedUser = JSON.parse(localStorage.getItem('user'))
    let agentID = proposalData && proposalData.userID;

    const messageData = {
      senderID: loggedUser._id,
      receiverID: agentID,
      message: `${loggedUser.username} has initiated chat with ${proposalData.userData.username}. Keep yourself active to continue chatting.`,
      timestamp: Date.now(),
    };

    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chats/sendMessage`, messageData)
      .then(res => {
        let response = res.data
        if (response.status) {
          setIsLoading(false)
          navigate(`../user/chats?recepientID=${agentID}`)
        }
        else {
          setIsLoading(false)
          console.log("error sending")
          toast.error("Error initializing chat")
        }
      })
      .catch(err => {
        console.log(err)
        toast.error("Error initializing chat")

      })

  }
  return (
    <>
      <Navbar />
      <Loader show={isLoading} />
      <section className="allPlans main-layout">
        <div className="custom-container">
          <div className="flex-layout">
            {
              proposalData && (
                <ProposalDetails data={proposalData} acceptProposal={acceptProposal} handleInitiateChat={handleInitiateChat} isAccepted={proposalAccepted}/>
              )
            }
          </div>


        </div>
      </section>
      <Footer />
    </>
  )
}
