const { check } = require('express-validator');

const registerValidation = [
    check('name').not().isEmpty(),
    check('email').isEmail().not().isEmpty(),
    check('password').not().isEmpty()
];

module.exports = registerValidation;