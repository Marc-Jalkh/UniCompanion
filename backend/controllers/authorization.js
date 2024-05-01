require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(401).json({ error: 'Token not provided' });

    const TOKEN_KEY = process.env.TOKEN_KEY || 'key'

    // req.permissions = "user"
    // req.user_id = 2
    // next();
    
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        
        req.permissions = decoded.permissions;
        req.user_id = decoded.id;
        if (decoded.permissions === 'user') {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
}

module.exports = verifyToken