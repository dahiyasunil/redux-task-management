import {
  addTask,
  removeTask,
  toggleTask,
  calculateTotalTasks,
} from "./actions";
import { taskReducer } from "./taskReducer";
import { createStore } from "redux";
let counter = 1;

const store = createStore(taskReducer);

store.subscribe(() => {
  const storeData = store.getState();
  renderTasks(storeData.tasks);
  renderTotalTasks(storeData.totalTasks);
});

const addTaskForm = document.querySelector("#addTask");
const taskTitleEl = document.querySelector("#taskTitle");
const taskDescriptionEl = document.querySelector("#taskDescription");

const removeTaskForm = document.querySelector("#removeTask");
const taskIdEl = document.querySelector("#taskId");
const infoMsgContainerEl = document.querySelector("#infoMsgContainer");

const taskContainerEl = document.querySelector("#taskContainer");
const totalTasksEl = document.querySelector("#totalTasks");

const addTaskListener = () => {
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskData = {
      id: counter++,
      title: taskTitleEl.value,
      description: taskDescriptionEl.value,
      completed: false,
    };
    store.dispatch(addTask(taskData));
    store.dispatch(calculateTotalTasks());
  });
};

const removeTaskListener = () => {
  removeTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (store.getState().tasks.find((task) => task.id == taskIdEl.value)) {
      store.dispatch(removeTask(taskIdEl.value));
      store.dispatch(calculateTotalTasks());
    } else {
      infoMsgContainerEl.innerHTML = `
          <div class="alert alert-danger" fs-5 role="alert">
           Invalid Task Id.
           <br/>
           <small>Task is either not present or already deleted.</small>
          </div>
      `;
      setTimeout(() => {
        infoMsgContainerEl.textContent = "";
      }, 3000);
    }
  });
};

const renderTasks = (tasks) => {
  taskContainerEl.textContent = "";
  tasks.map((task) => {
    const listItem = document.createElement("li");
    listItem.className = `list-group-item bg-light border border-1 ${
      task.completed ? `border-success` : `border-warning`
    } rounded-2 mb-3`;

    const checkBox = document.createElement("input");
    checkBox.className = "me-3";
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.onchange = () => store.dispatch(toggleTask(task.id));
    checkBox.id = task.id;
    listItem.appendChild(checkBox);

    const text = document.createElement("label");
    text.htmlFor = task.id;
    text.innerHTML = `${task.id}. <em>${task.title}</em> - <small>${task.description}</small>`;
    listItem.appendChild(text);

    taskContainerEl.appendChild(listItem);
  });
};

const renderTotalTasks = (noOfTasks) => {
  if (noOfTasks > 0) {
    totalTasksEl.innerHTML = `
  <p><strong class="fw-5">Total Tasks: </strong>${noOfTasks}</p>`;
  } else {
    totalTasksEl.textContent = "";
  }
};

addTaskListener();
removeTaskListener();
