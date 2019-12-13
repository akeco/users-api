const userModel = require('../models/user');
const { uniqBy } = require('lodash');
const handleError = require('../utils/handleError');

const getContactsService = async (req, res, next) => {
    const { name } = req.query;
    const { userID } = req.params;

    if (userID) getContactsById(req, res, next, userID);
    else if (name) findByName(req, res, next, name);
    else findAll(req, res, next);
};

const findAll = async (req, res, next) => {
    try {
        let contacts = await userModel.find({ _id: { $ne: req.params.id } }, '_id, name');
        
        contacts = contacts.map(({ _id, name }) => ({ id: _id, name }))
        return res.json({ contacts })
    }
    catch (e) {
        handleError('Server error', 'server_error', next);
    }
}

const getContactsById = async (req, res, next, userID) => {
    try {
        const result = await Promise.all([
            userModel.findById(userID, { contacts: 1, _id: 0 }).populate({ path: 'contacts', select: '_id, name' }),
            userModel.find({ contacts: { $in: [userID] } }, '_id, name')
        ]);

        let contacts = uniqBy([...result[0].contacts, ...result[1]], '_id');
        contacts = contacts.map(({ _id, name }) => ({ id: _id, name }));

        return res.json({ contacts });
    }
    catch (e) {
        handleError('Server error', 'server_error', next);
    }
}

const findByName = async (req, res, next, name) => {
    try {
        const regexp = new RegExp("^"+ name, 'i');
        let contacts = await userModel.find({ _id: { $ne: req.params.id }, name: regexp }, '_id, name');
        
        contacts = contacts.map(({ _id, name }) => ({ id: _id, name }));
        return res.json({ contacts });
    }
    catch (e) {
        handleError('Server error', 'server_error', next)
    }
};

module.exports = getContactsService;