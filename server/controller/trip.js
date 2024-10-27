const { default: mongoose } = require('mongoose')
const { TripModal } = require('../modal/Trip')
const sendResponse = require('../utils/sendResponse')

const createTrip = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Trip Data not found", null)
        }

        let trip = new TripModal(req.body)
        let result = await trip.save()
        if (result) {
            sendResponse(req, res, true, "Trip created successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating trip, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error creating trip, try again", null)
        console.log(err)
    }
}

const getAllTrips = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortby = req.query.sortby || 'desc';
    const minBudget = req.query.minBudget || null;
    const maxBudget = req.query.maxBudget || null;
    const city = req.query.city || null;

    const skipIndex = (page - 1) * limit;
    
    try {
        const totalTrips = await TripModal.countDocuments();
        const totalPages = Math.ceil(totalTrips / limit);

        const filters = {
            status: true
        };

        if (minBudget) {
            filters.budget = { $gte: parseInt(minBudget) };
        }
        if (maxBudget) {
            filters.budget = { ...filters.budget, $lte: parseInt(maxBudget) };
        }
        if (city) {
            filters.cities = { $in: [city.toString().charAt(0).toUpperCase() + city.slice(1)] };
        }

        // console.log('Filters:', filters);
        // console.log('Sort Order:', sortby);

        const mongooseSortOrder = sortby === 'desc' ? 1 : -1;

        let response = await TripModal
            .find(filters)
            .skip(skipIndex)
            .limit(limit)
            .sort({ updatedAt: mongooseSortOrder })
            .populate('userID');

        if (response) {
            response = response.map((trip) => {
                const tripObj = trip.toObject();
                return {
                    ...tripObj,
                    userID: tripObj.userID._id,
                    userDetails: tripObj.userID
                };
            });

            let data = {
                documents: response,
                currentPage: page,
                totalPages: totalPages,
                totalTrips: totalTrips,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            };
            sendResponse(req, res, true, "Trips fetched successfully", data);
        } else {
            sendResponse(req, res, false, "No Trips found", null);
        }
    } catch (err) {
        console.error('Error:', err);
        sendResponse(req, res, false, "Error fetching trips, try again", null);
    }
};



const getTripById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Invalid trip ID", null);
        }

        let trip = await TripModal.findOne({ _id: id }).populate('userID');


        if (!trip) {
            return sendResponse(req, res, false, "Trip not found", null);
        }

        let tripObj = trip.toObject()
        trip = {
            ...tripObj,
            userID: tripObj.userID._id,
            userDetails: tripObj.userID
        }

        let totalTrips = await TripModal.find({ userID: trip.userID }).countDocuments();
        // console.log(totalTrips)
        trip.userDetails = {
            ...trip.userDetails,
            totalTrips: totalTrips
        };

        sendResponse(req, res, true, 'Trip found successfully', trip);
    }
    catch (err) {
        sendResponse(req, res, false, "Error fetching trip. Please try again.");
        console.log(err)
    }
}

const getUserTrips = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Invalid ID or not found", null);
        }

        const trip = await TripModal.find({ userID: id });

        if (!trip) {
            return sendResponse(req, res, false, "Trip not found", null);
        }
        if (trip.length == 0) {
            return sendResponse(req, res, false, "No trips found for this user", null);
        }

        sendResponse(req, res, true, 'Trip found successfully', trip);
    }
    catch (err) {
        sendResponse(req, res, false, "Error fetching trip. Please try again.");
    }
}

const deleteTrip = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Trip id not found", null);
        }

        const response = await TripModal.findOneAndDelete({ _id: id });

        if (!response) {
            return sendResponse(req, res, false, "Error deleting trip", null);
        }

        sendResponse(req, res, true, 'Trip deleted successfully', null);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            // Handle CastError - Invalid ObjectId format
            return sendResponse(req, res, false, "Invalid trip id format", null);
        }

        // For other types of errors
        sendResponse(req, res, false, "Error deleting trip. Please try again.");
        console.log(error);
    }
}

const updateTrip = async (req, res) => {

    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Trip id not found", null);
        }

        let response = await TripModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Trip updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating trip ", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error updating trip, try again", null)
    }
}

const updateTripStatus = async (req, res) => {

    try {
        const id = req.params.id;
        const status = req.params.status;
        if (!id) {
            return sendResponse(req, res, false, "Trip id not found", null);
        }

        let response = await TripModal.findOneAndUpdate({ _id: id }, { status: status })
        if (response) {
            sendResponse(req, res, true, "Trip status updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating trip status", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error updating trip status, try again", null)
    }
}

module.exports = { createTrip, getAllTrips, getTripById, deleteTrip, updateTrip, updateTripStatus, getUserTrips }
