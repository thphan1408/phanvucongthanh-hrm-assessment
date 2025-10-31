import { employees } from "./employees.service.js";
import { validateDate, isDateInPast, isEndDateBeforeStartDate } from "../utils/dateUtils.js";
import { generateId, normalizeString, getCurrentTimestamp } from "../utils/commonUtils.js";

let leaveRequests = [];

const findEmployeeById = (employeeId) => {
    const normalizedId = normalizeString(employeeId);
    return employees.find(emp => emp.id === normalizedId);
};

const createLeaveRequest = async ({
    employeeId,
    startDate,
    endDate,
    reason
}) => {
    const employee = findEmployeeById(employeeId);

    if (!employee) {
        throw new Error('Employee not found for the given employeeId.');
    }

    const parsedStartDate = validateDate(startDate, 'Start date');
    const parsedEndDate = validateDate(endDate, 'End date');

    if (isDateInPast(parsedStartDate)) {
        throw new Error('Start date cannot be in the past.');
    }

    if (isEndDateBeforeStartDate(parsedStartDate, parsedEndDate)) {
        throw new Error('End date must be after or equal to start date.');
    }

    if (employee.leaveBalance <= 0) {
        throw new Error('Employee has insufficient leave balance.');
    }

    const newLeaveRequest = {
        id: generateId(),
        employeeId: normalizeString(employeeId),
        startDate: normalizeString(startDate),
        endDate: normalizeString(endDate),
        reason: normalizeString(reason),
        status: 'Pending',
        createdAt: getCurrentTimestamp()
    };

    employee.leaveBalance -= 1;
    leaveRequests.push(newLeaveRequest);

    return newLeaveRequest;
};

const getAllLeaveRequests = async () => {
    return leaveRequests;
};

const approveLeaveRequest = async (id) => {
    const normalizedId = normalizeString(id);
    const leaveRequest = leaveRequests.find(lr => lr.id === normalizedId);

    if (!leaveRequest) {
        throw new Error('Leave request not found.');
    }

    if (leaveRequest.status === 'Approved') {
        throw new Error('Leave request is already approved.');
    }

    leaveRequest.status = 'Approved';
    leaveRequest.approvedAt = getCurrentTimestamp();

    return leaveRequest;
};

const leaveRequestsService = {
    createLeaveRequest,
    getAllLeaveRequests,
    approveLeaveRequest
};

export default leaveRequestsService;