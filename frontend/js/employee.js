async function getEmployees() {
    return await apiRequest(API_ENDPOINTS.employees);
}

async function addEmployee(employeeData) {
    return await apiRequest(API_ENDPOINTS.employees, {
        method: 'POST',
        body: JSON.stringify(employeeData)
    });
}

async function getEmployeeById(id) {
    return await apiRequest(`${API_ENDPOINTS.employees}/${id}`);
}

async function deleteEmployee(id) {
    return await apiRequest(`${API_ENDPOINTS.employees}/${id}`, {
        method: 'DELETE'
    });
}

function displayEmployees(employees) {
    const tableContainer = document.getElementById('employeesTable');

    if (!employees || employees.length === 0) {
        tableContainer.innerHTML = '<p>No employees found.</p>';
        return;
    }

    const tableHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Leave Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${employees.map(employee => `
                        <tr>
                            <td title="ID: ${employee.id}">#${employee.id || 'N/A'}</td>
                            <td>${employee.name || 'N/A'}</td>
                            <td>${employee.department || 'N/A'}</td>
                            <td><span class="leave-balance">${employee.leaveBalance || 0} days</span></td>
                            <td class="action-buttons">
                                <button class="btn btn-sm btn-create" 
                                    data-employee-id="${employee.id}" 
                                    data-employee-name="${employee.name}" 
                                    onclick="openLeaveRequestModal(this.dataset.employeeId, this.dataset.employeeName)">
                                    Leave Request
                                </button>
                                <button class="btn btn-sm btn-view" onclick="viewEmployeeDetails(${employee.id})">
                                    View
                                </button>
                                <button class="btn btn-sm btn-delete" 
                                    data-employee-id="${employee.id}" 
                                    data-employee-name="${employee.name}" 
                                    onclick="handleDeleteEmployee(this.dataset.employeeId, this.dataset.employeeName)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    tableContainer.innerHTML = tableHTML;
}

async function handleViewEmployees() {
    try {
        const employees = await getEmployees();

        if (employees && Array.isArray(employees)) {
            displayEmployees(employees);
        } else {
            showMessage('employeesTable', 'Invalid employee data received', true);
        }
    } catch (error) {
        showMessage('employeesTable', error.message, true);
    }
}

async function handleAddEmployee(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const employeeData = {
        name: formData.get('name'),
        department: formData.get('department'),
        leaveBalance: parseInt(formData.get('leaveBalance'))
    };

    if (!validateEmployeeData(employeeData)) {
        showMessage('addEmployeeMessage', 'Please fill in all fields correctly', true);
        return;
    }

    try {
        const newEmployee = await addEmployee(employeeData);

        const employeeName = newEmployee?.name || employeeData.name;
        showMessage('addEmployeeMessage', `Employee "${employeeName}" added successfully!`);
        event.target.reset();

        await refreshEmployeeTableIfVisible();

    } catch (error) {
        showMessage('addEmployeeMessage', error.message, true);
    }
}

async function refreshEmployeeTableIfVisible() {
    const tableContainer = document.getElementById('employeesTable');

    if (tableContainer && (tableContainer.querySelector('table') || tableContainer.innerHTML.includes('No employees found'))) {
        await handleViewEmployees();
    }
}

function openLeaveRequestModal(employeeId, employeeName) {
    if (!document.getElementById('leaveRequestModal')) {
        createLeaveRequestModal();
    }

    document.getElementById('modalEmployeeId').value = employeeId;
    document.getElementById('modalEmployeeName').textContent = employeeName;
    document.getElementById('modalLeaveRequestForm').reset();
    document.getElementById('modalEmployeeId').value = employeeId;
    document.getElementById('leaveRequestModal').style.display = 'flex';
}

function createLeaveRequestModal() {
    const modalHTML = `
        <div id="leaveRequestModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create Leave Request</h3>
                    <span class="close" onclick="closeLeaveRequestModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <p><strong>Employee:</strong> <span id="modalEmployeeName"></span></p>
                    <form id="modalLeaveRequestForm">
                        <input type="hidden" id="modalEmployeeId" name="employeeId">
                         
                        <div class="form-row">
                            <div class="form-group">
                                <label for="modalStartDate">Start Date</label>
                                <input type="date" id="modalStartDate" name="startDate" required>
                            </div>
                            <div class="form-group">
                                <label for="modalEndDate">End Date</label>
                                <input type="date" id="modalEndDate" name="endDate" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="modalReason">Reason</label>
                            <textarea id="modalReason" name="reason" rows="3" required></textarea>
                        </div>
                        
                        <div class="modal-buttons">
                            <button type="submit" class="btn">Create Leave Request</button>
                            <button type="button" class="btn btn-secondary" onclick="closeLeaveRequestModal()">Cancel</button>
                        </div>
                    </form>
                    <div id="modalLeaveRequestMessage"></div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('modalLeaveRequestForm').addEventListener('submit', handleModalLeaveRequestSubmit);

    setupModalDateInputs();
}

function closeLeaveRequestModal() {
    document.getElementById('leaveRequestModal').style.display = 'none';
    document.getElementById('modalLeaveRequestMessage').innerHTML = '';
}

function setupModalDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('modalStartDate');
    const endDateInput = document.getElementById('modalEndDate');

    if (startDateInput && endDateInput) {
        startDateInput.setAttribute('min', today);
        endDateInput.setAttribute('min', today);

        startDateInput.addEventListener('change', function () {
            const startDate = this.value;
            endDateInput.setAttribute('min', startDate);
        });
    }
}

async function handleModalLeaveRequestSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const leaveData = {
        employeeId: parseInt(formData.get('employeeId')),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        reason: formData.get('reason')
    };

    if (!validateLeaveRequestData(leaveData)) {
        showMessage('modalLeaveRequestMessage', 'Please fill in all fields correctly and ensure dates are valid', true);
        return;
    }

    try {
        await createLeaveRequest(leaveData);

        showMessage('modalLeaveRequestMessage', 'Leave request created successfully!');

        if (typeof refreshLeaveRequestsTableIfVisible === 'function') {
            await refreshLeaveRequestsTableIfVisible();
        }

        setTimeout(() => {
            closeLeaveRequestModal();
        }, 2000);

    } catch (error) {
        showMessage('modalLeaveRequestMessage', error.message, true);
    }
}

function openCreateEmployeeModal() {
    if (!document.getElementById('createEmployeeModal')) {
        createEmployeeModal();
    }

    document.getElementById('modalEmployeeForm').reset();

    document.getElementById('createEmployeeModal').style.display = 'flex';
}

function createEmployeeModal() {
    const modalHTML = `
        <div id="createEmployeeModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Employee</h3>
                    <span class="close" onclick="closeCreateEmployeeModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="modalEmployeeForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="modalEmployeeName">Employee Name</label>
                                <input type="text" id="modalEmployeeName" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="modalEmployeeDepartment">Department</label>
                                <input type="text" id="modalEmployeeDepartment" name="department" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="modalEmployeeLeaveBalance">Leave Balance</label>
                            <input type="number" id="modalEmployeeLeaveBalance" name="leaveBalance" min="0" required>
                        </div>
                        
                        <div class="modal-buttons">
                            <button type="submit" class="btn">Create Employee</button>
                            <button type="button" class="btn btn-secondary" onclick="closeCreateEmployeeModal()">Cancel</button>
                        </div>
                    </form>
                    <div id="modalEmployeeMessage"></div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('modalEmployeeForm').addEventListener('submit', handleModalEmployeeSubmit);
}

function closeCreateEmployeeModal() {
    document.getElementById('createEmployeeModal').style.display = 'none';
    document.getElementById('modalEmployeeMessage').innerHTML = '';
}

async function handleModalEmployeeSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const employeeData = {
        name: formData.get('name'),
        department: formData.get('department'),
        leaveBalance: parseInt(formData.get('leaveBalance'))
    };

    if (!validateEmployeeData(employeeData)) {
        showMessage('modalEmployeeMessage', 'Please fill in all fields correctly', true);
        return;
    }

    try {
        const newEmployee = await addEmployee(employeeData);

        const employeeName = newEmployee?.name || employeeData.name;
        showMessage('modalEmployeeMessage', `Employee "${employeeName}" created successfully!`);

        await handleViewEmployees();

        setTimeout(() => {
            closeCreateEmployeeModal();
        }, 2000);

    } catch (error) {
        showMessage('modalEmployeeMessage', error.message, true);
    }
}

async function viewEmployeeDetails(employeeId) {
    try {
        const employee = await getEmployeeById(employeeId);

        if (!document.getElementById('viewEmployeeModal')) {
            createViewEmployeeModal();
        }

        document.getElementById('viewEmployeeId').textContent = employee.id;
        document.getElementById('viewEmployeeName').textContent = employee.name;
        document.getElementById('viewEmployeeDepartment').textContent = employee.department;
        document.getElementById('viewEmployeeLeaveBalance').textContent = employee.leaveBalance + ' days';
        document.getElementById('viewEmployeeModal').style.display = 'flex';
    } catch (error) {
        alert('Error fetching employee details: ' + error.message);
    }
}

function createViewEmployeeModal() {
    const modalHTML = `
        <div id="viewEmployeeModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Employee Details</h3>
                    <span class="close" onclick="closeViewEmployeeModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div style="line-height: 1.8; font-size: 14px;">
                        <p><strong>ID:</strong> <span id="viewEmployeeId"></span></p>
                        <p><strong>Name:</strong> <span id="viewEmployeeName"></span></p>
                        <p><strong>Department:</strong> <span id="viewEmployeeDepartment"></span></p>
                        <p><strong>Leave Balance:</strong> <span id="viewEmployeeLeaveBalance"></span></p>
                    </div>
                    <div class="modal-buttons" style="margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" onclick="closeViewEmployeeModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeViewEmployeeModal() {
    document.getElementById('viewEmployeeModal').style.display = 'none';
}

async function handleDeleteEmployee(employeeId, employeeName) {
    if (!document.getElementById('confirmDeleteModal')) {
        createConfirmDeleteModal();
    }

    document.getElementById('confirmDeleteModal').setAttribute('data-employee-id', employeeId);
    document.getElementById('confirmDeleteModal').setAttribute('data-employee-name', employeeName);
    document.getElementById('confirmEmployeeName').textContent = employeeName;
    document.getElementById('confirmEmployeeId').textContent = employeeId;
    document.getElementById('confirmDeleteModal').style.display = 'flex';
}

function createConfirmDeleteModal() {
    const modalHTML = `
        <div id="confirmDeleteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirm Delete</h3>
                    <span class="close" onclick="closeConfirmDeleteModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <p style="line-height: 1.6; font-size: 14px;">
                        Are you sure you want to delete employee <strong>"<span id="confirmEmployeeName"></span>"</strong> (ID: <strong><span id="confirmEmployeeId"></span></strong>)?
                    </p>
                    <div class="modal-buttons" style="margin-top: 20px;">
                        <button type="button" class="btn btn-delete" onclick="confirmDeleteEmployee()">Yes, Delete</button>
                        <button type="button" class="btn btn-secondary" onclick="closeConfirmDeleteModal()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeConfirmDeleteModal() {
    document.getElementById('confirmDeleteModal').style.display = 'none';
}

async function confirmDeleteEmployee() {
    const modal = document.getElementById('confirmDeleteModal');
    const employeeId = modal.getAttribute('data-employee-id');
    const employeeName = modal.getAttribute('data-employee-name');

    try {
        await deleteEmployee(employeeId);
        closeConfirmDeleteModal();
        showMessage('employeesTable', `Employee "${employeeName}" deleted successfully!`);
        await handleViewEmployees();
    } catch (error) {
        closeConfirmDeleteModal();
        showMessage('employeesTable', error.message, true);
    }
}