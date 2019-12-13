const jwt = require('jsonwebtoken');

const decodeToken = (token) => jwt.decode(token);

module.exports = decodeToken;