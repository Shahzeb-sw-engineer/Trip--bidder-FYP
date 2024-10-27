const mongoose = require('mongoose');

const BookmarksSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        ref: 'users'
    },
    tripID: {
        type: String,
        required: true,
        ref: 'trips'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const BookmarksModal = mongoose.model('bookmarks', BookmarksSchema);
module.exports = BookmarksModal;
