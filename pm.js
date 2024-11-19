document.addEventListener("DOMContentLoaded", () => {
    function updateTaskStatus(taskId) {
        const selector = document.getElementById(taskId + '-status-selector');
        const statusDisplay = document.getElementById(taskId + '-status');
        const newStatus = selector.value;
        statusDisplay.textContent = `Status: ${newStatus}`;
    }
    function addNewTask(taskName, taskStatus) {
        const taskList = document.getElementById("task-list");
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const taskTitle = document.createElement("h2");
        taskTitle.textContent = taskName;
        taskDiv.appendChild(taskTitle);
        const taskStatusDisplay = document.createElement("p");
        taskStatusDisplay.classList.add("status");
        taskStatusDisplay.id = `${taskName}-status`;  // Set a unique ID for the status text
        taskStatusDisplay.textContent = `Status: ${taskStatus}`;
        taskDiv.appendChild(taskStatusDisplay);
        const taskSelector = document.createElement("select");
        taskSelector.classList.add("status-selector");
        taskSelector.id = `${taskName}-status-selector`;  // Unique ID for the selector
        taskSelector.innerHTML = `
            <option value="Pending" ${taskStatus === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${taskStatus === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${taskStatus === "Completed" ? "selected" : ""}>Completed</option>
        `;
        taskDiv.appendChild(taskSelector);
        taskSelector.addEventListener("change", () => updateTaskStatus(taskName));
        taskList.appendChild(taskDiv);
    }
    document.getElementById("add-task-btn").addEventListener("click", () => {
        const taskNameInput = document.getElementById("new-task-name");
        const taskStatusInput = document.getElementById("new-task-status");
        const taskName = taskNameInput.value.trim();
        const taskStatus = taskStatusInput.value;
        if (taskName) {
            addNewTask(taskName, taskStatus);
            taskNameInput.value = "";
            taskStatusInput.value = "Pending";
        } else {
            alert("Please enter a task name.");
        }
    });
});
