const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskBoard = document.getElementById('taskBoard');

// Load tasks from the server using fetch (PHP reads file)
function loadTasks() {
  fetch('load_tasks.php')
    .then(res => res.json())
    .then(displayTasks);
}

// Display all tasks on the page dynamically
function displayTasks(tasks) {
  taskBoard.innerHTML = ''; // Clear previous tasks

  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'taskItem' + (task.done ? ' completed' : '');

    // Add task content and buttons
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="taskButtons">
        <button onclick="toggleDone(${idx})" title="Mark done/undone">
          <i class="fa ${task.done ? 'fa-check-circle' : 'fa-circle'}"></i>
        </button>
        <button onclick="removeTask(${idx})" title="Delete task">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;

    taskBoard.appendChild(li); // Add task to list
  });
}

// Save task list back to file via PHP
function saveTasks(tasks) {
  fetch('save_tasks.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks)
  });
}

// Handle adding a new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = taskInput.value.trim();
  if (!newTask) return; // Ignore empty entries

  // Load current tasks, add new one, save and re-render
  fetch('load_tasks.php')
    .then(res => res.json())
    .then(tasks => {
      tasks.push({ text: newTask, done: false });
      displayTasks(tasks);
      saveTasks(tasks);
      taskInput.value = '';
    });
});

// Toggle a task's done/undone state
function toggleDone(index) {
  fetch('load_tasks.php')
    .then(res => res.json())
    .then(tasks => {
      tasks[index].done = !tasks[index].done;
      displayTasks(tasks);
      saveTasks(tasks);
    });
}


// Remove task by index
function removeTask(index) {
  fetch('load_tasks.php')
    .then(res => res.json())
    .then(tasks => {
      tasks.splice(index, 1); // Remove from array
      displayTasks(tasks);
      saveTasks(tasks);
    });
}

// Load tasks when page loads
window.onload = loadTasks;
