async function getLeaveRequests() {
    return await apiRequest(API_ENDPOINTS.leave);
}

async function createLeaveRequest(leaveData) {
    return await apiRequest(API_ENDPOINTS.leave, {
        method: 'POST',
        body: JSON.stringify(leaveData)
    });
}

async function approveLeave(id) {
    return await apiRequest(`${API_ENDPOINTS.leave}/${id}/approve`, {
        method: 'PATCH'
    });
}

function displayLeaveRequests(leaveRequests) {
    const tableContainer = document.getElementById('leaveRequestsTable');

    if (leaveRequests.length === 0) {
        tableContainer.innerHTML = '<p>No leave requests found.</p>';
        return;
    }

    const tableHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Approved At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaveRequests.map(request => {
        const status = request.status || 'Pending';
        const statusClass = status === 'Approved' ? 'status-approved' : 'status-pending';

        const actionButton = status === 'Pending'
            ? `<button class="btn btn-sm btn-approve" onclick="handleApproveLeave(${request.id})">Approve</button>`
            : '<span class="approved-text">✓ Approved</span>';

        return `
                            <tr>
                                <td title="ID: ${request.id}">#${request.id}</td>
                                <td title="Employee ID: ${request.employeeId}">EMP-${request.employeeId}</td>
                                <td>${formatDate(request.startDate)}</td>
                                <td>${formatDate(request.endDate)}</td>
                                <td title="${request.reason}">${request.reason}</td>
                                <td><span class="${statusClass}">${status}</span></td>
                                <td title="${request.createdAt ? formatDateTime(request.createdAt) : '-'}">${request.createdAt ? formatDate(request.createdAt) : '-'}</td>
                                <td title="${request.approvedAt ? formatDateTime(request.approvedAt) : '-'}">${request.approvedAt ? formatDate(request.approvedAt) : '-'}</td>
                                <td>${actionButton}</td>
                            </tr>
                        `;
    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    tableContainer.innerHTML = tableHTML;
}

async function handleViewLeaveRequests() {
    try {
        const leaveRequests = await getLeaveRequests();

        if (leaveRequests && Array.isArray(leaveRequests)) {
            displayLeaveRequests(leaveRequests);
        } else {
            showMessage('leaveRequestsTable', 'Invalid leave request data received', true);
        }
    } catch (error) {
        showMessage('leaveRequestsTable', error.message, true);
    }
}



async function refreshLeaveRequestsTableIfVisible() {
    const tableContainer = document.getElementById('leaveRequestsTable');

    if (tableContainer && (tableContainer.querySelector('table') || tableContainer.innerHTML.includes('No leave requests found'))) {
        await handleViewLeaveRequests();
    }
}

async function handleApproveLeave(leaveRequestId) {
    if (!document.getElementById('confirmApproveModal')) {
        createConfirmApproveModal();
    }

    document.getElementById('confirmApproveModal').setAttribute('data-leave-id', leaveRequestId);
    document.getElementById('confirmLeaveRequestId').textContent = leaveRequestId;
    document.getElementById('confirmApproveModal').style.display = 'flex';
}

function createConfirmApproveModal() {
    const modalHTML = `
        <div id="confirmApproveModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirm Approval</h3>
                    <span class="close" onclick="closeConfirmApproveModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <p style="line-height: 1.6; font-size: 14px;">
                        Are you sure you want to approve leave request <strong>#<span id="confirmLeaveRequestId"></span></strong>?
                    </p>
                    <div class="modal-buttons" style="margin-top: 20px;">
                        <button type="button" class="btn btn-approve" onclick="confirmApproveLeave()">Yes, Approve</button>
                        <button type="button" class="btn btn-secondary" onclick="closeConfirmApproveModal()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeConfirmApproveModal() {
    document.getElementById('confirmApproveModal').style.display = 'none';
}

async function confirmApproveLeave() {
    const modal = document.getElementById('confirmApproveModal');
    const leaveRequestId = modal.getAttribute('data-leave-id');

    try {
        await approveLeave(leaveRequestId);

        closeConfirmApproveModal();
        showMessage('leaveRequestsTable', `Leave request #${leaveRequestId} approved successfully!`);

        await refreshLeaveRequestsTableIfVisible();
    } catch (error) {
        closeConfirmApproveModal();
        showMessage('leaveRequestsTable', error.message, true);
    }
}