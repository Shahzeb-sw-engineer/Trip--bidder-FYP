const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const TokenModel = mongoose.model('Token', TokenSchema); 
module.exports = TokenModel;
