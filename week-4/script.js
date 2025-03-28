// Task array to hold all tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fetch and render tasks on page load
window.onload = function () {
    fetchTasks();
    renderTasks();
};


// Add Task with Due Date
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const newTask = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (newTask !== "") {
        tasks.push({
            id: tasks.length + 1,
            task: newTask,
            dueDate: dueDate,
            completed: false
        });
        taskInput.value = "";
        dueDateInput.value = "";
        renderTasks();
    } else {
        alert("Please enter a valid task!");
    }
}

// Render tasks with countdown
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const timeLeft = getTimeLeft(task.dueDate);
        let statusClass = "";

        if (timeLeft.days <= 0 && !task.completed) {
            statusClass = "overdue";
        } else if (timeLeft.days <= 2) {
            statusClass = "due-soon";
        }

        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${statusClass}`;
        li.innerHTML = `
            <div>
                <span onclick="toggleTask(${index})" class="${task.completed ? "completed" : ""}">${task.task}</span>
                <small class="text-muted ml-2">${task.dueDate ? `Due in: ${timeLeft.days}d ${timeLeft.hours}h` : ""}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-info mr-2" onclick="editTask(${index})">✏️</button>
                <button class="btn btn-sm btn-warning mr-2" onclick="toggleTask(${index})">✔️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Calculate time left for the due date
function getTimeLeft(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours };
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Edit Task
function editTask(index) {
    const newTask = prompt("Edit Task:", tasks[index].task);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].task = newTask.trim();
        renderTasks();
    }
}

// Filter tasks based on search input
function filterTasks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchInput));
    renderFilteredTasks(filteredTasks);
}

// Render filtered tasks
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const timeLeft = getTimeLeft(task.dueDate);
        let statusClass = "";

        if (timeLeft.days <= 0 && !task.completed) {
            statusClass = "overdue";
        } else if (timeLeft.days <= 2) {
            statusClass = "due-soon";
        }

        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${statusClass}`;
        li.innerHTML = `
            <div>
                <span onclick="toggleTask(${index})" class="${task.completed ? "completed" : ""}">${task.task}</span>
                <small class="text-muted ml-2">${task.dueDate ? `Due in: ${timeLeft.days}d ${timeLeft.hours}h` : ""}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-info mr-2" onclick="editTask(${index})">✏️</button>
                <button class="btn btn-sm btn-warning mr-2" onclick="toggleTask(${index})">✔️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks from localStorage on page load
function loadTasksFromLocalStorage() {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        renderTasks();
    }
}
