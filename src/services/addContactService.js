const userModel = require('../models/user');
const handleError = require('../utils/handleError');

const addContactService = async (req, res, next) => {
    const { id } = req.params;
    const { userID } = req.body;

    if (userID) {
        try {
            const result = await userModel.findById(id);
            let contacts = result.contacts || [];

            if (contacts.includes(userID)) {
                return handleError('Contact already added', 'bad_request', next);
            }

            contacts = [...contacts, userID];
            await userModel.findByIdAndUpdate(id, { contacts }, { new: true });
           
            let { _id, name} = await userModel.findById(userID, '_id, name');
            res.json({ message: 'Successfuly added contact', contact: { id: _id, name } })
        }
        catch (e) {
            handleError('Server error', 'server_error', next);
        }
    }
    else {
        handleError('Bad request', 'bad_request', next);
    }
};

module.exports = addContactService;