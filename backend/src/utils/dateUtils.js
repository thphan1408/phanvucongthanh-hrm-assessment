const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
};

const validateDate = (dateValue, fieldName) => {
    if (!dateValue || String(dateValue).trim() === '') {
        throw new Error(`${fieldName} is required.`);
    }

    const parsed = new Date(dateValue);
    if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid ${fieldName.toLowerCase()}.`);
    }

    return parsed;
};

const isDateInPast = (date) => {
    const normalized = normalizeDate(date);
    const today = normalizeDate(new Date());
    return normalized < today;
};

const isEndDateBeforeStartDate = (startDate, endDate) => {
    const normalizedStart = normalizeDate(startDate);
    const normalizedEnd = normalizeDate(endDate);
    return normalizedEnd < normalizedStart;
};

export {
    normalizeDate,
    validateDate,
    isDateInPast,
    isEndDateBeforeStartDate
};