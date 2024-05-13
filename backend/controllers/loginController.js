require('dotenv').config();
const db = require('../config/dbconfig.js');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { id, password } = req.body;

    try {

        const user = await db('users')
            .join('users_roles', 'users.user_id', 'users_roles.user_id')
            .join('roles', 'users_roles.role_id', 'roles.role_id')
            .select('users.password', 'roles.name as role')
            .where('users.user_id', id)
            .first();

        if (!user) {
            // User does not exist
            res.status(401).send("Invalid id or password");
            return;
        }

        const HASH_KEY = process.env.HASH_KEY || 'key'

        // Hash the provided password
        const hashedPassword = CryptoJS.HmacSHA256(password, HASH_KEY).toString(CryptoJS.enc.Hex);

        // Compare the hashed passwords
        if (user.password !== hashedPassword) {
            // Passwords do not match
            res.status(401).send("Invalid id or password");
            return;
        }

        const TOKEN_KEY = process.env.TOKEN_KEY || 'key'

        let role = user.role
        const tokenPayload = { id, role };
        const token = jwt.sign(tokenPayload, TOKEN_KEY, { expiresIn: '48h' });
        res.json({ token });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).send("Successfully logged out");
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).send("Internal server error during logout");
    }
};

const loginAdmin = async (req, res) => {
    const { id, password } = req.body;

    try {
        const user = await db('users')
            .select('users.password')
            .join('users_roles', 'users.user_id', 'users_roles.user_id')
            .join('roles', 'users_roles.role_id', 'roles.role_id')
            .where({ 'users.user_id': id, 'roles.name': 'admin' })
            .first();


        if (!user) {
            // User does not exist
            res.status(401).send("Invalid id or password");
            return;
        }

        const HASH_KEY = process.env.HASH_KEY || 'key'

        // Hash the provided password
        const hashedPassword = CryptoJS.HmacSHA256(password, HASH_KEY).toString(CryptoJS.enc.Hex);

        // Compare the hashed passwords
        if (user.password !== hashedPassword) {
            // Passwords do not match
            res.status(401).send("Invalid id or password");
            return;
        }

        const TOKEN_KEY = process.env.TOKEN_KEY || 'key'

        let role = user.role
        const tokenPayload = { id, role };
        const token = jwt.sign(tokenPayload, TOKEN_KEY, { expiresIn: '48h' });
        res.json({ token });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
}


module.exports = {
    login,
    logout,
    loginAdmin
}