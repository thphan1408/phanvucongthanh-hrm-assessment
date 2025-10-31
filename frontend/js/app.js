document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    loadInitialData();
});

async function loadInitialData() {
    try {
        await handleViewEmployees();
        await handleViewLeaveRequests();
    } catch (error) {
        showMessage('Error loading initial data', 'error');
    }
}

function setupEventListeners() {
    const createEmployeeBtn = document.getElementById('createEmployeeBtn');
    if (createEmployeeBtn) {
        createEmployeeBtn.addEventListener('click', openCreateEmployeeModal);
    }

    const viewEmployeesBtn = document.getElementById('viewEmployeesBtn');
    if (viewEmployeesBtn) {
        viewEmployeesBtn.addEventListener('click', handleViewEmployees);
    }

    const refreshEmployeesBtn = document.getElementById('refreshEmployeesBtn');
    if (refreshEmployeesBtn) {
        refreshEmployeesBtn.addEventListener('click', handleViewEmployees);
    }

    const viewLeaveRequestsBtn = document.getElementById('viewLeaveRequestsBtn');
    if (viewLeaveRequestsBtn) {
        viewLeaveRequestsBtn.addEventListener('click', handleViewLeaveRequests);
    }

    const refreshLeaveRequestsBtn = document.getElementById('refreshLeaveRequestsBtn');
    if (refreshLeaveRequestsBtn) {
        refreshLeaveRequestsBtn.addEventListener('click', handleViewLeaveRequests);
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }

        if (event.target.classList.contains('close')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}