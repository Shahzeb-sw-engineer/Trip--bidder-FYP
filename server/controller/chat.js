const BookmarksModal = require('../modal/Bookmark');
const { ChatModal } = require('../modal/Chat');
const sendResponse = require('../utils/sendResponse');


const sendMessage = async (req, res) => {
    try {
        if (!req.body) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        // If not found, add the product to bookmarks
        let message = new ChatModal(req.body);
        let result = await message.save();
        if (result) {
            sendResponse(req, res, true, "Message sent successfully", result);
        } else {
            sendResponse(req, res, false, "Error sending message, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const fetchMessages = async (req, res) => {
    try {
        const receiverID = req.params.receiverID;
        const senderID = req.params.senderID;
        if (!receiverID || !senderID) {
            return sendResponse(req, res, false, "Invalid IDs Provided", null);
        }

        let sendMessages = await ChatModal.find({ senderID: senderID, receiverID: receiverID }).populate('senderID').populate('receiverID')
        let receivedMessages = await ChatModal.find({ senderID: receiverID, receiverID: senderID }).populate('senderID').populate('receiverID')

        let messages = [...sendMessages, ...receivedMessages]

        if (messages.length > 0) {
            messages.sort((a, b) => a.timestamp - b.timestamp);
            // messages.sort((a, b) => b.createdAt - a.createdAt);

            messages = messages.map(message => {
                const messageObj = message.toObject()
                return {
                    ...messageObj,
                    senderID: messageObj.senderID._id,
                    receiverID: messageObj.receiverID._id,
                    senderDetails: messageObj.senderID,
                    receiverDetails: messageObj.receiverID
                }
            })
            sendResponse(req, res, true, "Messages found successfully", messages);
        }
        else {
            sendResponse(req, res, false, "No messages found", null);
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error proceeding request", null);

    }
}


const fetchContactList = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "Invalid ID provided", null);
        }

        // Find all chats where either the senderID or receiverID is the provided id and populate the fields
        let chats = await ChatModal.find({
            $or: [
                { senderID: id },
                { receiverID: id }
            ]
        }).populate('receiverID').populate('senderID');


        if (chats.length > 0) {
            // Use Sets to store unique sender and receiver IDs
            const uniqueSenderIDs = new Set();
            const uniqueReceiverIDs = new Set();
            const uniqueContacts = [];

            chats.forEach(chat => {
                const chatObj = chat.toObject();
                const senderID = chatObj.senderID._id.toString();
                const receiverID = chatObj.receiverID._id.toString();

                if (!uniqueSenderIDs.has(senderID) && senderID !== id) {
                    uniqueSenderIDs.add(senderID);
                    uniqueContacts.push({
                        receiverID: senderID,
                        receiverDetails: chatObj.senderID,
                    });
                }

                if (!uniqueReceiverIDs.has(receiverID) && receiverID !== id) {
                    uniqueReceiverIDs.add(receiverID);
                    uniqueContacts.push({
                        receiverID: receiverID,
                        receiverDetails: chatObj.receiverID
                    });
                }
            });

            let myUniqueContacts = []
            // to remove duplicate user from list
            uniqueContacts.forEach(contact => {
                if (!myUniqueContacts.some(uniqueContact => uniqueContact.receiverID === contact.receiverID)) {
                    myUniqueContacts.push(contact);
                }
            });

            sendResponse(req, res, true, "List found successfully", myUniqueContacts);
        } else {
            sendResponse(req, res, false, "No list found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding request", err);
    }
}



module.exports = {
    sendMessage,
    fetchMessages,
    fetchContactList
}