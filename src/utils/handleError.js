const handleError = (message, name, next) => {
    const error = new Error(message);
        
    error.name = name;
    next(error);
}

module.exports = handleError;