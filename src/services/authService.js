const decodeToken = require('../utils/decodeToken');

const authService = (req, res, next) => {
    const { token } = req.headers;
 
    if (token) {
        const decoded = decodeToken(token);
        
        if (decoded) {
            req.params.id = decoded.id;
            return next(null);
        }
    
        return next(getUnauthorizedError());
    }
    else return next(getUnauthorizedError());
};

const getUnauthorizedError = () => {
    const error = new Error("Unauthorized");
    
    error.name = 'unauthorized';
    return error;
}

module.exports = authService;