const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
let currentFilter = '';

async function loadTasks() {
  const suffix = currentFilter ? `?status=${currentFilter}` : '';
  const response = await fetch(`/api/tasks/${suffix}`);
  const tasks = await response.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  if (!tasks.length) {
    taskList.innerHTML = '<p>No tasks yet.</p>';
    return;
  }

  for (const task of tasks) {
    const item = document.createElement('article');
    item.className = 'task';
    item.innerHTML = `
      <div class="task-head">
        <div>
          <h3>${escapeHtml(task.title)}</h3>
          <p>${escapeHtml(task.description || '')}</p>
        </div>
        <span>${task.priority}</span>
      </div>
      <div class="meta">Status: ${task.status}${task.deadline ? ` · Deadline: ${task.deadline}` : ''}</div>
      <div class="actions">
        <button onclick="setStatus(${task.id}, 'todo')">To do</button>
        <button onclick="setStatus(${task.id}, 'in_progress')">In progress</button>
        <button onclick="setStatus(${task.id}, 'done')">Done</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>`;
    taskList.appendChild(item);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    priority: document.getElementById('priority').value,
    deadline: document.getElementById('deadline').value || null,
    status: 'todo'
  };

  await fetch('/api/tasks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  form.reset();
  await loadTasks();
});

async function setStatus(id, status) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  await loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  await loadTasks();
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', async () => {
    currentFilter = button.dataset.filter;
    await loadTasks();
  });
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

loadTasks();
