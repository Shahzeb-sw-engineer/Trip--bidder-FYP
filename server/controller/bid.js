const { default: mongoose } = require('mongoose')
const { bidModal, BidModal } = require('../modal/Bid')
const sendResponse = require('../utils/sendResponse')


const createBid = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Bid Data not found", null)
        }

        // we can add more security by checking if the trip is present or active

        let bid = new BidModal(req.body)
        let result = await bid.save()

        if (result) {
            sendResponse(req, res, true, "Bid created successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Trip, try again", null)
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getBidById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Invalid bid ID", null);
        }

        const bid = await BidModal.findOne({ _id: id }).populate('tripID').populate('userID');

        if (!bid) {
            return sendResponse(req, res, false, "Bid not found", null);
        }

        const bidObject = bid.toObject();
        let response = {
            ...bidObject,
            tripID: bidObject.tripID._id,
            userID: bidObject.userID._id,
            tripData: bidObject.tripID,
            userData: bidObject.userID
        };

        try {
            const userDetails = await fetch(`${process.env.BACKEND_URL}/api/getUserDetails/${response.userData._id}/${response.userData.role}`);
            const userDetailsData = await userDetails.json();
            response.userData.otherDetails = userDetailsData.data;


            const totalBids = await BidModal.find({ userID: response.userID, status: "accepted" });
            if (response.userData.otherDetails !== null) {
                response.userData.otherDetails.completedTrips = totalBids.length;
            }

            sendResponse(req, res, true, 'Bid found successfully', response);
        } catch (err) {
            console.log(err);
            sendResponse(req, res, false, "Error processing request. Please try again.", err);
        }

    } catch (err) {
        sendResponse(req, res, false, "Error processing request. Please try again.", err);
    }
};


const getBidsOnTrip = async (req, res) => {
    try {
        const tripID = req.params.id;
        if (!tripID) {
            return sendResponse(req, res, false, "Invalid bid ID", null);
        }

        let bids = await BidModal.find({ tripID: tripID }).populate('tripID').populate('userID');;
        if (bids.length > 0) {
            bids = bids.map(bid => {
                const bidObject = bid.toObject();
                return {
                    ...bidObject,
                    tripID: bidObject.tripID._id,
                    userID: bidObject.userID._id,
                    tripData: bidObject.tripID,
                    userData: bidObject.userID
                };
            });
            sendResponse(req, res, true, "Proposals found successfully", bids);

        }
        else {
            sendResponse(req, res, false, "No bids found for this account", null);
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error Proceeding request. Please try again.", err);
        console.log(err)
    }
}

const getAgentsBids = async (req, res) => {
    try {
        const userID = req.params.id;
        if (!userID) {
            return sendResponse(req, res, false, "Invalid ID or ID not found", null);
        }

        let bids = await BidModal.find({ userID: userID }).populate('tripID').populate('userID');

        if (bids.length > 0) {
            bids = bids.map(bid => {
                const bidObject = bid.toObject();
                return {
                    ...bidObject,
                    tripID: bidObject.tripID._id,
                    userID: bidObject.userID._id,
                    tripData: bidObject.tripID,
                    userData: bidObject.userID
                };
            });
            sendResponse(req, res, true, "Proposals found successfully", bids);

        }
        else {
            sendResponse(req, res, false, "No bids found for this account", null);
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error Proceeding request. Please try again.", err);
        console.log(err)
    }
}


const isAppliedOnTrip = async (req, res) => {
    try {
        const userID = req.params.userID;
        const tripID = req.params.tripID;
        if (!userID && !tripID) {
            return sendResponse(req, res, false, "Invalid ID or ID not found", null);
        }

        let totalBids = await BidModal.find({ userID: userID, tripID: tripID }).countDocuments();
        let bid = await BidModal.findOne({ userID: userID, tripID: tripID });
        if (totalBids > 0) {
            sendResponse(req, res, true, "Proposals found successfully", bid);
        }
        else {
            sendResponse(req, res, false, "No bids found for this account", null);
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error Proceeding request. Please try again.", err);
        console.log(err)
    }
}

const updateBid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Invalid bid ID or Bid Id not found", null);
        }

        if (!req.body) {
            sendResponse(req, res, false, "Bid Data not found", null)
        }

        // we can add more security by checking if the trip is present or active

        let response = await BidModal.findOneAndUpdate({ _id: id }, req.body)

        if (response) {
            sendResponse(req, res, true, "Bid updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Trip, try again", null)
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
const updateBidStaus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        if (!id) {
            return sendResponse(req, res, false, "Invalid bid ID or staus or Bid Id not found", null);
        }
        // we can add more security by checking if the trip is present or active

        let bidStatus = ""
        if (status === "true") {
            bidStatus = "accepted";
        } else if (status === "false") {
            bidStatus = "rejected";
        } else {
            return sendResponse(req, res, false, "Invalid status value", null);
        }

        let response = await BidModal.findOneAndUpdate({ _id: id }, { status: bidStatus })

        if (response) {
            sendResponse(req, res, true, "Bid status updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Trip status, try again", null)
        }
    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}
module.exports = { createBid, getBidById, updateBid, getBidsOnTrip, getAgentsBids, updateBidStaus, isAppliedOnTrip }