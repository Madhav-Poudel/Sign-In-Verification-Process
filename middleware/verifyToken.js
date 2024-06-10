const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {

        // get the token from the request headers
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid or Expired token provided' });
        }

        // verify the token
        const decodeToken = jwt.verify(token, "secretKey");
        req.userData = decodeToken;
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token has expired' });
        } else {
            console.error('Error during token verification:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


module.exports = verifyToken