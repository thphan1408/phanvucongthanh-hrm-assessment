function showMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);

    let messageContainer = element.querySelector('.message-container');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        element.insertBefore(messageContainer, element.firstChild);
    }

    messageContainer.innerHTML = `<div class="${isError ? 'error' : 'success'}">${message}</div>`;

    setTimeout(() => {
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }
    }, 5000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatDateTime(dateTimeString) {
    return new Date(dateTimeString).toLocaleString();
}

function validateEmployeeData(data) {
    if (!data.name || !data.department || data.leaveBalance < 0) {
        return false;
    }
    return true;
}

function validateLeaveRequestData(data) {
    if (!data.employeeId || !data.startDate || !data.endDate || !data.reason) {
        return false;
    }

    if (new Date(data.endDate) < new Date(data.startDate)) {
        return false;
    }

    return true;
}