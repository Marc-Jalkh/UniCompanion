require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../config/dbconfig.js');

const verifyToken = async (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(401).json({ error: 'Token not provided' });

    const TOKEN_KEY = process.env.TOKEN_KEY || 'key'

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        req.role = decoded.role;
        req.user_id = decoded.id;
        next();
    });
}

const logs = async (req, res, next) => {
    const { method, path } = req;
    const userId = req.user_id; // Assuming user_id is directly available
    try {
        await db('logs').insert({
            user_id: userId,
            date_time: new Date(), // captures the current timestamp
            request: `${method} ${path}`
        })
    }
    finally
    {
        next();
    }
    
}


module.exports = {
    verifyToken,
    logs
}