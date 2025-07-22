// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  input.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) li.classList.add("done");

    li.addEventListener("click", () => {
      li.classList.toggle("done");
      saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
