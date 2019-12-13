const userModel = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');
const generateToken = require('../utils/generateToken');

const loginService = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
        const { id, name, password: hash } = await userModel.findOne({ email });
  
        bcrypt.compare(password, hash, (err, result) => {
            if (!result) return handleError('Unauthorized', 'unauthorized', next);

            if (result) {
                const accessToken = generateToken({ id, name });
            
                return res.json({ 
                    user: {
                        id,
                        name
                    },
                    access_token: accessToken
                 })
                }
            });
        }
    catch(er) {
        handleError('Unauthorized', 'unauthorized', next);
    }
};

module.exports = loginService;