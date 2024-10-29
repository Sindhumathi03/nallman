const users = {
    "1": { casual: 10, medical: 10 },
    "2": { casual: 5, medical: 8 },
};

let currentUserId = null;
let currentUserName = '';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('apply-leave-button').addEventListener('click', handleEmployeeSubmit);
    document.getElementById('leave-form').addEventListener('submit', applyLeave);
    document.getElementById('confirm-apply-button').addEventListener('click', showConfirmationPage);
});

function handleEmployeeSubmit() {
    currentUserId = document.getElementById('employee-id').value;
    currentUserName = document.getElementById('employee-name').value;

    if (currentUserId && currentUserName) {
        showLeaveSection();
        updateLeaveBalance();
        showApplyLeaveSection();
    } else {
        alert("Please enter valid employee details.");
    }
}

function showLeaveSection() {
    document.getElementById('employee-section').style.display = 'none';
    document.getElementById('leave-section').style.display = 'block';
}

function showApplyLeaveSection() {
    document.getElementById('leave-section').style.display = 'none';
    document.getElementById('apply-leave-section').style.display = 'block';
}

function updateLeaveBalance() {
    const balance = users[currentUserId] || { casual: 0, medical: 0 };
    document.getElementById('leave-balance').innerHTML = `
        Casual Leave: ${balance.casual} days<br>
        Medical Leave: ${balance.medical} days
    `;
}

function applyLeave(event) {
    event.preventDefault();

    const leaveType = document.getElementById('leave-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const reason = document.getElementById('reason').value;

    const balance = users[currentUserId];

    let message = '';
    if (leaveType === "Casual Leave" && balance.casual > 0) {
        balance.casual--;
        message = `Leave applied successfully! Reason: ${reason}.`;
    } else if (leaveType === "Medical Leave" && balance.medical > 0) {
        balance.medical--;
        message = `Leave applied successfully! Reason: ${reason}.`;
    } else {
        message = `Insufficient leave balance for ${leaveType}.`;
    }

    updateLeaveBalance();
    showLeaveSummary(leaveType, startDate, endDate, reason, message);
}

function showLeaveSummary(leaveType, startDate, endDate, reason, message) {
    document.getElementById('apply-leave-section').style.display = 'none';
    document.getElementById('summary-section').style.display = 'block';

    const summaryDetails = `
        <strong>Employee ID:</strong> ${currentUserId}<br>
        <strong>Employee Name:</strong> ${currentUserName}<br>
        <strong>Leave Type:</strong> ${leaveType}<br>
        <strong>Start Date:</strong> ${startDate}<br>
        <strong>End Date:</strong> ${endDate}<br>
        <strong>Reason:</strong> ${reason}<br>
        <strong>Message:</strong> ${message}<br>
        <strong>Remaining Casual Leave:</strong> ${users[currentUserId].casual} days<br>
        <strong>Remaining Medical Leave:</strong> ${users[currentUserId].medical} days<br>
    `;
    
    document.getElementById('summary-details').innerHTML = summaryDetails;
}

function showConfirmationPage() {
    document.getElementById('main-title').style.display = 'none'; // Hide the main title
    document.getElementById('summary-section').style.display = 'none';
    document.getElementById('confirmation-section').style.display = 'block';

    const confirmationDetails = `
        <strong>Your leave request has been confirmed!</strong><br>
        <strong>Remaining Casual Leave:</strong> ${users[currentUserId].casual} days<br>
        <strong>Remaining Medical Leave:</strong> ${users[currentUserId].medical} days<br>
    `;
    
    document.getElementById('confirmation-details').innerHTML = confirmationDetails;
}
