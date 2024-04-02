require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, 'secret_key_123', {
        expiresIn: 86400 // expires in 24 hours
    });
}