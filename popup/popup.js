let tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storeage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    task,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  // When user add value in a input field it will update the tasks[]
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  //Adding the newly created taskRow into the document
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  //Update the local save

  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks(taskNum);
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
