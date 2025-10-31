const createResponse = (code, message, data = null) => {
    const response = {
        code,
        message
    };
    
    if (data !== null) {
        response.data = data;
    }
    
    return response;
};

const handleControllerError = (error, res) => {
    if (error.message.includes('not found')) {
        return res.status(404).json(createResponse(404, error.message));
    }
    
    res.status(400).json(createResponse(400, error.message));
};

export {
    createResponse,
    handleControllerError
};