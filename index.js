const todoInput = document.getElementById("todoInput");
const todoBtn = document.getElementsByClassName("todo-btn")[0];
const todoList = document.getElementsByClassName("todo-list")[0];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => renderTask(task));

todoBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const input = todoInput.value.trim();
  if (!input) {
    return;
  } else {
    const newTask = {
      id: Date.now(),
      task: input,
      complete: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = null;
  }
});

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const li = document.createElement("li");
  li.innerHTML = `<p>${task.task}<p><button>Delete</button>`;
  if (task.complete) li.classList.add("complete");

  li.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;
    task.complete != task.complete;
    li.classList.toggle("complete");
    saveTask();
  });

  const button = li.querySelector("button");
  button.classList.add("delete-btn");
  todoList.lastElementChild.append(li);

  button.addEventListener("click", (e) => {
    console.log("click btn");
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTask();
    console.log(tasks);
  });
}
