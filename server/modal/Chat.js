const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    senderID: {
        type: String,
        ref: 'users',
        required: true
    },
    receiverID: {
        type: String,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        value: Date.now()
    }
}, { timestamps: true })


exports.ChatModal = mongoose.model('chats', ChatSchema)