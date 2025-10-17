let tasksDb = []; 

/// ---------- Add a new task ----------
function addTask(event) {
  if (event) event.preventDefault();

  const taskInput = document.getElementById('todo-input');
  const taskDate = document.getElementById('todo-date');

  // Validate input
  if (!validateInput(taskInput.value, taskDate.value)) return;

  // Create new task object
  const newTask = {
    task: taskInput.value.trim(),
    date: taskDate.value.trim(),
  };

  // Push into database
  tasksDb.push(newTask);

  // Re-render updated list
  renderTasks();

  // Clear inputs
  taskInput.value = '';
  taskDate.value = '';
}

/// ---------- Render tasks into table ----------
function renderTasks() {
  const tbody = document.getElementById('task-list');
  tbody.innerHTML = ''; // clear all rows

  // If no tasks, show placeholder message
  if (tasksDb.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2" class="text-center text-gray-500 p-2">
          No tasks added yet
        </td>
      </tr>
    `;
    return;
  }

  // Create rows dynamically
  const fragment = document.createDocumentFragment();
  tasksDb.forEach((taskObj, index) => {
    const tr = document.createElement('tr');

    // Task name cell (wraps to 2 lines max)
    const tdTask = document.createElement('td');
    tdTask.className = 'task-name border border-gray-400 p-2 text-center';
    const divTask = document.createElement('div');
    divTask.textContent = taskObj.task;
    tdTask.appendChild(divTask);

    // Due date cell
    const tdDate = document.createElement('td');
    tdDate.className = 'border border-gray-400 p-2 text-center';
    tdDate.textContent = taskObj.date;

    tr.appendChild(tdTask);
    tr.appendChild(tdDate);
    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}

/// ---------- Delete all tasks ----------
function deleteAllTasks() {
  if (tasksDb.length === 0) {
    alert('No tasks to delete!');
    return;
  }

  const confirmDelete = confirm('Are you sure you want to delete all tasks?');
  if (confirmDelete) {
    tasksDb = [];
    renderTasks();
  }
}

/// ---------- Input validation ----------
function validateInput(task, date) {
  if (task.trim() === '' || date.trim() === '') {
    alert('Please enter both task name and due date.');
    return false;
  }
  return true;
}

/// ---------- Initialize with empty table ----------
document.addEventListener('DOMContentLoaded', renderTasks);
