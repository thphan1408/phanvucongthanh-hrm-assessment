import leaveRequestsService from "../services/leave-requests.service.js";
import { createResponse, handleControllerError } from "../utils/responseUtils.js";

const createLeaveRequest = async (req, res) => {
    try {
        const { employeeId, startDate, endDate, reason } = req.body;

        if (!employeeId || !startDate || !endDate || !reason) {
            return res.status(400).json(createResponse(400, 'Missing required fields: employeeId, startDate, endDate, reason'));
        }

        const result = await leaveRequestsService.createLeaveRequest({
            employeeId,
            startDate,
            endDate,
            reason
        });

        res.status(201).json(createResponse(201, 'Leave request created successfully', result));
    } catch (error) {
        handleControllerError(error, res);
    }
}

const getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await leaveRequestsService.getAllLeaveRequests();
        res.status(200).json(createResponse(200, 'Leave requests retrieved successfully', leaveRequests));
    } catch (error) {
        handleControllerError(error, res);
    }
}

const approveLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await leaveRequestsService.approveLeaveRequest(id);
        res.status(200).json(createResponse(200, 'Leave request approved successfully', result));
    }
    catch (error) {
        handleControllerError(error, res);
    }
}

const leaveRequestsController = {
    createLeaveRequest,
    getAllLeaveRequests,
    approveLeaveRequest
};

export default leaveRequestsController;