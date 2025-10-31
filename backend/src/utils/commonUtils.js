const normalizeString = (value) => {
    return String(value || '').trim();
};

const validateRequired = (value, fieldName) => {
    const normalized = normalizeString(value);
    if (!normalized) {
        throw new Error(`${fieldName} is required.`);
    }
    return normalized;
};

const generateId = () => {
    return Date.now().toString();
};

const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

export {
    normalizeString,
    validateRequired,
    generateId,
    getCurrentTimestamp
};