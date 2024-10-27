const jwt = require('jsonwebtoken');
const sendResponse = require("../utils/sendResponse")

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Extract JWT token from session
    const token = req.session.jwt;

    if (!token) {
        return sendResponse(req, res, false, "Unauthorized - No token provided", null);

    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, 'secret-value');

        // Add the decoded user information to the request object (optional)
        req.user = decoded;

        // Token is valid, proceed to the next middleware or API handler
        next();
    } catch (error) {
        // Token verification failed
        return sendResponse(req, res, false, "Unauthorized - Invalid token", null);

    }
};

module.exports = verifyToken;
