const loginService = require('../services/loginService');
const registerService = require('../services/registerService');
const contactsRoutes = require('../routes/contactsRoutes');

const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

const routes = (app) => {
    app.post('/login', loginValidation, loginService);
    app.post('/register', registerValidation, registerService);
    app.use('/contacts', contactsRoutes);

    app.use((err, req, res, next) => {
        if (err) {
            switch(err.name) {
                case 'server_error':
                    res.status(500);
                    break;
                case 'bad_request':
                    res.status(400);
                    break;
                case 'unauthorized':
                    res.status(401);
                    break;
            }
            res.send({ message: err.message })
        }
    });
}

module.exports = routes;