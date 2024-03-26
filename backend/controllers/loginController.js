require('dotenv').config(); 
const db = require('../config/config.js');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { id, password } = req.body;

    try {
        const user = await db('users').select('password').where({ user_id: id }).first();

        console.log(user)

        if (!user) {
            // User does not exist
            res.status(401).send("Invalid id or password");
            return;
        }

        // Hash the provided password
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        // Compare the hashed passwords
        if (user.password !== hashedPassword) {
            // Passwords do not match
            res.status(401).send("Invalid id or password");
            return;
        }

        const TOKEN_KEY = process.env.TOKEN_KEY || 'key'

        permissions = 'user'
        const tokenPayload = { id, permissions };
        const token = jwt.sign(tokenPayload, TOKEN_KEY, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
}
  

  
module.exports = { 
    login, 
}