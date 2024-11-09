// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Function to update the task status display
    function updateTaskStatus(taskId) {
        const selector = document.getElementById(taskId + '-status-selector');
        const statusDisplay = document.getElementById(taskId + '-status');
        const newStatus = selector.value;
        statusDisplay.textContent = `Status: ${newStatus}`;
    }

    // Function to add a new task dynamically
    function addNewTask(taskName, taskStatus) {
        const taskList = document.getElementById("task-list");

        // Create a new task container
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        // Create a title for the task
        const taskTitle = document.createElement("h2");
        taskTitle.textContent = taskName;
        taskDiv.appendChild(taskTitle);

        // Create the status display (this will be updated when the dropdown changes)
        const taskStatusDisplay = document.createElement("p");
        taskStatusDisplay.classList.add("status");
        taskStatusDisplay.id = `${taskName}-status`;  // Set a unique ID for the status text
        taskStatusDisplay.textContent = `Status: ${taskStatus}`;
        taskDiv.appendChild(taskStatusDisplay);

        // Create a status selector (dropdown)
        const taskSelector = document.createElement("select");
        taskSelector.classList.add("status-selector");
        taskSelector.id = `${taskName}-status-selector`;  // Unique ID for the selector
        taskSelector.innerHTML = `
            <option value="Pending" ${taskStatus === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${taskStatus === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${taskStatus === "Completed" ? "selected" : ""}>Completed</option>
        `;
        taskDiv.appendChild(taskSelector);

        // Add an event listener to update the task status when the dropdown is changed
        taskSelector.addEventListener("change", () => updateTaskStatus(taskName));

        // Append the new task to the task list
        taskList.appendChild(taskDiv);
    }

    // Event listener for the "Add Task" button
    document.getElementById("add-task-btn").addEventListener("click", () => {
        const taskNameInput = document.getElementById("new-task-name");
        const taskStatusInput = document.getElementById("new-task-status");

        const taskName = taskNameInput.value.trim();
        const taskStatus = taskStatusInput.value;

        if (taskName) {
            // Add the new task to the list with the selected status
            addNewTask(taskName, taskStatus);

            // Clear the input fields
            taskNameInput.value = "";
            taskStatusInput.value = "Pending";
        } else {
            alert("Please enter a task name.");
        }
    });
});
