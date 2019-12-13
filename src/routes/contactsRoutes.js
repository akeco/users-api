const router = require('express').Router();
const getContactsService = require('../services/getContactsService');
const addContactService = require('../services/addContactService');
const authService = require('../services/authService');

router.get('/', authService, getContactsService);
router.get('/:userID', authService, getContactsService);

router.post('/', authService, addContactService);

module.exports = router;