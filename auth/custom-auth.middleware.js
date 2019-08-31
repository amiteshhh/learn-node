
/**
 * Custom middleware to validate jwt Bearer token and protect routes
 */
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'some-sensitive-key';///TODO to be taken from process.env

export default (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({
            "code": 401,
            "message": 'Auth token is not supplied or malformed. Authorization header should starts with Bearer'
        });
    }
    token = token.slice(7, token.length);// Remove Bearer from string
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({
                "code": 401,
                "message": 'Token is invalid or expired.'
            });
        } else {
            next();
        }
    });
}