import employeesService from "../services/employees.service.js";
import { createResponse, handleControllerError } from "../utils/responseUtils.js";

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeesService.getAllEmployees();
        res.status(200).json(createResponse(200, 'Employees retrieved successfully', employees));
    } catch (error) {
        handleControllerError(error, res);
    }
}

const createEmployee = async (req, res) => {
    try {
        const { name, department, leaveBalance } = req.body;

        if (!name || !department || leaveBalance == null) {
            return res.status(400).json(createResponse(400, 'Missing required fields: name, department, leaveBalance'));
        }

        if (isNaN(leaveBalance)) {
            return res.status(400).json(createResponse(400, 'Leave balance must be a number'));
        }

        const result = await employeesService.createEmployee({
            name,
            department,
            leaveBalance: Number(leaveBalance)
        });

        res.status(201).json(createResponse(201, 'Employee created successfully', result));
    } catch (error) {
        handleControllerError(error, res);
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeesService.getEmployeeById(id);

        res.status(200).json(createResponse(200, 'Employee retrieved successfully', employee));
    }
    catch (error) {
        handleControllerError(error, res);
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await employeesService.deleteEmployee(id);

        res.status(200).json(createResponse(200, 'Employee deleted successfully'));
    }
    catch (error) {
        handleControllerError(error, res);
    }
}

const employeesController = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    deleteEmployee
}

export default employeesController;