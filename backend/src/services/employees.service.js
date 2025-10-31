import { generateId, normalizeString } from "../utils/commonUtils.js";

export let employees = [];

const getAllEmployees = async () => {
    return employees;
}

const createEmployee = async ({
    name,
    department,
    leaveBalance
}) => {
    if (leaveBalance < 0) {
        throw new Error('Leave balance cannot be negative.');
    }

    const newEmployee = {
        id: generateId(),
        name: normalizeString(name),
        department: normalizeString(department),
        leaveBalance: Number(leaveBalance)
    };

    employees.push(newEmployee);

    return newEmployee;
}

const getEmployeeById = async (id) => {
    const normalizedId = normalizeString(id);
    const employee = employees.find(emp => emp.id === normalizedId);
    if (!employee) {
        throw new Error('Employee not found');
    }
    return employee;
}

const deleteEmployee = async (id) => {
    const normalizedId = normalizeString(id);
    const index = employees.findIndex(emp => emp.id === normalizedId);
    if (index === -1) {
        throw new Error('Employee not found');
    }
    employees.splice(index, 1);
    return { message: 'Employee deleted successfully' };
}

const employeesService = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    deleteEmployee
}

export default employeesService;