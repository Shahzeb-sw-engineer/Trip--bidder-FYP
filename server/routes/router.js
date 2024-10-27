const express = require('express')
const sendResponse = require('../utils/sendResponse')
const { register, login, addNewUser, verfiyAccount, getUserById, getUserByIdAndRole, getAllUsers, updateUserInfo, updateUserStaus, updateUsername, getAgentStats } = require('../controller/user')
const verifyToken = require('../middlewares/verifyToken')
const { createTrip, getAllTrips, getTripById, deleteTrip, updateTrip, updateTripStatus, getUserTrips } = require('../controller/trip')
const { createBid, getBidById, updateBid, getBidsOnTrip, getAgentsBids, updateBidStaus, isAppliedOnTrip } = require('../controller/bid')
const { addBookmark, removeBookmark, getBookmarks, checkInBookmarks } = require('../controller/bookmarks')
const { sendMessage, fetchMessages, fetchContactList } = require('../controller/chat')
const { createAITrip } = require('../controller/geminiAPI')


const router = express.Router()

router.get('/', (req, res) => {
    sendResponse(req, res, 200, "Success", null)
})


// route to register api 
router.post('/api/register', register)
router.get('/api/verify', verfiyAccount)
router.post('/api/login', login)
router.post('/api/adduser', addNewUser)
router.get('/api/getUserById/:id', getUserById)
router.get('/api/getUserDetails/:id/:role', getUserByIdAndRole) // this api will be used to get detaild user data
router.get('/api/getAllUsers', getAllUsers)
router.put('/api/updateUserInfo/:id', updateUserInfo)
router.put('/api/updateUserStatus/:id/:status', updateUserStaus)
router.get('/api/updateUsername/:id/:username', updateUsername)
router.get('/api/getAgentStats/:id', getAgentStats)

// routes for trip 
router.post('/api/createTrip', createTrip)
router.put('/api/updateTrip/:id', updateTrip)
router.put('/api/updateTripStatus/:id/:status', updateTripStatus)
router.get('/api/getAllTrips', getAllTrips)
router.get('/api/getUserTrips/:id', getUserTrips)
router.get('/api/getTripById/:id', getTripById)
router.get('/api/deleteTrip/:id', deleteTrip)

// routes for biding on trip 
router.post('/api/createBid', createBid)
router.get('/api/getBidById/:id', getBidById)
router.put('/api/updateBid/:id', updateBid)
router.get('/api/updateBidStatus/:id/:status', updateBidStaus)
router.get('/api/getBidsOnTrip/:id', getBidsOnTrip) // travellers perspective
router.get('/api/getAgentsBids/:id', getAgentsBids) // agents perspective
router.get('/api/isAppliedOnTrip/:tripID/:userID', isAppliedOnTrip )

//routes for bookmarks
router.post('/api/addBookmark', addBookmark)
router.post('/api/removeBookmark', removeBookmark)
router.post('/api/checkInBookmarks', checkInBookmarks)
router.get('/api/getBookmarks/:id', getBookmarks)


// Routes for chats 
router.post('/api/chats/sendMessage', sendMessage)
router.get('/api/chats/getMessages/:senderID/:receiverID', fetchMessages)
router.get('/api/chats/getContactList/:id', fetchContactList) // my user userID


// GEMINI API ROUTES 
router.post('/api/gemini/createAITrip', createAITrip)


module.exports = router