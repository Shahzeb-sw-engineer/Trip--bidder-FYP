const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    passengers: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    cities: {
        type: [String],
    },
    departureAddress: {
        type: String,
    },
    isAccomodation: {
        type: Boolean,
    },
    accomodationName: {
        type: String,
    },
    transportType: {
        type: String
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        value: Date.now()
    }
}, { timestamps: true })


exports.TripModal = mongoose.model('trips', TripSchema)