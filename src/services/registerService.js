const userModel = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');
const saltRounds = 10;

const register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
    
        if (!user) {
            registerNewUser(res, next, name, email, password);
        }
        else {
            handleError('User with that email already exist', 'bad_request', next);
        }
    }
    catch (e) {
        registerNewUser(res, next, name, email, password);
    }
};

const registerNewUser = (res, next, name, email, password) => {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        try {
            await userModel.create({ name, email, password: hash });
            return res.status(201).json({ message: "Successfuly registered" });
        }
        catch (e) {
            handleError('Server error', 'server_error', next);
        }
    });
}
 

module.exports = register;