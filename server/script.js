document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const todoForm = document.getElementById('todoForm');
  const todoList = document.getElementById('todoList');

  async function loadTodos() {
    const res = await fetch('http://localhost:5001/api/todos', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const todos = await res.json();
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;
      li.style.textDecoration = todo.completed ? 'line-through' : 'none';
      li.onclick = async () => {
        await fetch('http://localhost:5001/api/todos/' + todo._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({ completed: !todo.completed })
        });
        loadTodos();
      };
      const del = document.createElement('button');
      del.textContent = '❌';
      del.onclick = async (e) => {
        e.stopPropagation();
        await fetch('http://localhost:5001/api/todos/' + todo._id, {
          method: 'DELETE',
          headers: { Authorization: 'Bearer ' + token }
        });
        loadTodos();
      };
      li.appendChild(del);
      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = document.getElementById('task').value;
    await fetch('http://localhost:5001/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ task })
    });
    document.getElementById('task').value = '';
    loadTodos();
  });

  loadTodos();
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
