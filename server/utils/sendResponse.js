const sendResponse = (req, res, status, message, data) => {
    res.json({
        status: status,
        message: message,
        data: data
    })
}

module.exports = sendResponse