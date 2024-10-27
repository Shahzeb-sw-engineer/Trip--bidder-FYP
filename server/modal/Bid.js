const mongoose = require('mongoose')

const BidSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: 'users',
        required: true
    },
    tripID: {
        type: String,
        ref: 'trips',
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    attachments: {
        type: [String]
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        value: Date.now()
    }
}, { timestamps: true })


exports.BidModal = mongoose.model('bids', BidSchema)