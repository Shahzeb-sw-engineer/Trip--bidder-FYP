import { useState } from 'react'
import './assets/css/default.css'
import './assets/css/style.css'
import './assets/css/main.css'
import './assets/css/registration.css'
import './assets/css/profile.css'
import './assets/css/media.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Index from './pages/Common/Index'
import Footer from './Components/Common/Footer'
import Login from './pages/Common/Login'
import AccountType from './pages/Common/AccountType'
import Register from './pages/Common/Register'
import AccountInfo from './pages/Agent/AccountInfo'
import BusinessInfo from './pages/Agent/BusinessInfo'
import Tripinfo from './pages/Agent/Tripinfo'
import UserAccountInfo from './pages/Traveler/UserAccountInfo'
import Home from './pages/Agent/Home'
import ViewPlan from './pages/Agent/ViewPlan'
import SavedPlans from './pages/Agent/SavedPlans'
import ApplyBid from './pages/Agent/ApplyBid'
import Profile from './pages/Agent/Profile'
import MyProposals from './pages/Agent/MyProposals'
import ViewProposal from './pages/Agent/ViewProposal'
import Chats from './pages/Agent/Chats'
import CreateCustomPlan from './pages/Agent/CreateCustomPlan'
import CreatePlan from './pages/Traveler/CreatePlan'
import AppliedProposals from './pages/Traveler/AppliedProposals'
import CreateWithAI from './pages/Traveler/CreateWithAI'
import MyPlans from './pages/Traveler/MyPlans'
import UserProfile from './pages/Traveler/Profile'
import Private from './routes/Private'
import ForgotPassword from './pages/Common/ForgotPassword'

function App() {

  return (
    <BrowserRouter >
      <Routes>
        {/* ------ Agent Routes ------------  */}
        <Route exact path="/" index element={<Index />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/role" element={<AccountType />} />
        <Route exact path="/personalinfo" element={<AccountInfo />} />
        <Route exact path="/businessinfo" element={<BusinessInfo />} />
        <Route exact path="/tripinfo" element={<Tripinfo />} />




        {/* ------ USERS ROUTES --------  */}

        <Route exact path="/user/personalinfo" element={<UserAccountInfo />} />
        <Route element={<Private />}>

          {/* ------ USERS PROTECTED ROUTES --------  */}
          <Route exact path="/user/create-new-trip" element={<CreatePlan />} />
          <Route exact path="/user/update-trip/:id" element={<CreatePlan />} />
          <Route exact path="/user/proposals/:tripID" element={<AppliedProposals />} />
          <Route exact path="/user/view-proposal/:id" element={<ViewProposal />} />
          <Route exact path="/user/plans" element={<MyPlans />} />
          <Route exact path="/user/view-plan/:id" element={<ViewPlan />} />
          <Route exact path="/user/profile" element={<UserProfile />} />
          <Route exact path="/user/chats" element={<Chats />} />


          {/* ------ Agent Protected Routes ------------  */}
          <Route exact path="/agent" element={<Home />} />
          <Route exact path="/agent/profile/:id" element={<Profile />} />
          <Route exact path="/agent/view-plan/:id" element={<ViewPlan />} />
          <Route exact path="/agent/bid/:id" element={<ApplyBid />} />
          <Route exact path="/agent/update-bid/:id/:bidID" element={<ApplyBid />} />
          <Route exact path="/agent/saved-plans" element={<SavedPlans />} />
          <Route exact path="/agent/my-proposals" element={<MyProposals />} />
          <Route exact path="/agent/view-proposal/:id" element={<ViewProposal />} />
          <Route exact path="/agent/chats" element={<Chats />} />
          <Route exact path="/agent/create-your-plan" element={<CreateCustomPlan />} />


          <Route exact path="/create-with-ai" element={<CreateWithAI />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
