const BookmarksModal = require('../modal/Bookmark');
const sendResponse = require('../utils/sendResponse');


const addBookmark = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.tripID) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        // Check if the document with the same userID and tripID already exists
        const exisitingBookmark = await BookmarksModal.findOne({
            userID: req.body.userID,
            tripID: req.body.tripID
        });

        if (exisitingBookmark) {
            return sendResponse(req, res, false, "Trip already bookmarked", exisitingBookmark);
        }

        // If not found, add the product to bookmarks
        let bookmark = new BookmarksModal(req.body);
        let result = await bookmark.save();
        if (result) {
            sendResponse(req, res, true, "Product bookmarked successfully", result);
        } else {
            sendResponse(req, res, false, "Error adding to bookmarks, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const removeBookmark = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.tripID) {
            sendResponse(req, res, false, "Invalid data provided", null);
        }

        const existingBookmark = await BookmarksModal.findOneAndDelete({
            userID: req.body.userID,
            tripID: req.body.tripID
        });

        if (existingBookmark) {
            sendResponse(req, res, true, "Product removed from bookmarks", existingBookmark);
        } else {
            sendResponse(req, res, false, "Product not found in bookmarks", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};



const checkInBookmarks = async (req, res) => {
    try {
        if (!req.body || !req.body.userID || !req.body.tripID) {
            sendResponse(req, res, false, "Invalid data provided", null);
            return;
        }

        const existingBookmark = await BookmarksModal.findOne({
            userID: req.body.userID,
            tripID: req.body.tripID
        });

        if (existingBookmark) {
            sendResponse(req, res, true, "Product found in Bookmarks", existingBookmark);
        } else {
            sendResponse(req, res, false, "Product not found in Bookmarks", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error processing your request, try again", null);
    }
};


const getBookmarks = async (req, res) => {
    try {
        const userID = req.params.id;
        if (!userID) {
            return sendResponse(req, res, false, "ID not found", null);
        }
        let results = await BookmarksModal.find({ userID: userID }).populate('tripID');

        if (results.length > 0) {
            results = results.map(data => ({
                ...data.toObject(),
                trip: data.tripID
            }))
            return sendResponse(req, res, true, "Bookmarks found successfully", results);
        } else {
            return sendResponse(req, res, false, "No Bookmarks found", null);
        }
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


module.exports = {
    addBookmark,
    removeBookmark,
    checkInBookmarks,
    getBookmarks
}