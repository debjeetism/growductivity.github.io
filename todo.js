const form = document.querySelector('.form');
const taskInput = document.querySelector('.task-input');
const todoList = document.querySelector('.todo-list');

let state = {
  tasks: [],
};

// Dynamic HTML template for new tasks
const template = task => `<div
  class="todo-list-task ${task.complete && 'todo-list-task__done'}"
    id="${task.id}" 
    onclick="markComplete(${task.id})">
    <p>${task.task}</p>
    ${removeButton(task)}
  </div>`;


// Render the template to the DOM
const render = (htmlString, el) => {
  el.innerHTML += htmlString;
};

// Create + add remove button
const removeButton = task => {
  if (task.complete) {
    return `
      <div>
        <button
          type="button"
          class="remove-button" 
          onclick="removeTask(${task.id})">
          X
        </button>
    </div>`;
  }
  return '';
};


// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const task = {
    id: Date.now(),
    task: taskInput.value,
    complete: false,
  };
  state.tasks = [...state.tasks, task];
  render(template(state.tasks[state.tasks.length - 1]), todoList);
  taskInput.value = '';
});


// Mark task as complete
const markComplete = (id) => {
  const i = state.tasks.findIndex((item) => item.id === id);
  if (i !== -1) {
    state.tasks[i].complete = true;
    todoList.innerHTML = '';
    state.tasks.map(el => render(template(el), todoList));
  }
};

// Remove task
const removeTask = (id) => {
  const index = state.tasks.findIndex((item) => item.id === id);
  state.tasks.splice(index, 1);
  todoList.innerHTML = '';
  state.tasks.map(el => render(template(el), todoList));
};
