const { check } = require('express-validator');

const loginValidation = [
    check('email').isEmail().not().isEmpty(),
    check('password').not().isEmpty()
];

module.exports = loginValidation;