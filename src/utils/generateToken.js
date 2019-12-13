const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = ({ id, name }) => jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1m' });

module.exports = generateToken;