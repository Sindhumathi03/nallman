// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Function to update status based on selection
    function updateTaskStatus(taskId) {
        const selector = document.getElementById(taskId + '-status-selector');
        const statusDisplay = document.getElementById(taskId + '-status');
        const newStatus = selector.value;
        statusDisplay.textContent = newStatus;
    }

    // Add event listeners to all the task selectors
    document.getElementById("task1-status-selector").addEventListener("change", () => updateTaskStatus("task1"));
    document.getElementById("task2-status-selector").addEventListener("change", () => updateTaskStatus("task2"));
    document.getElementById("task3-status-selector").addEventListener("change", () => updateTaskStatus("task3"));
});
