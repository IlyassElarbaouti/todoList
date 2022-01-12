// DOM elements
const addbtn = document.querySelector(".form__btn");
const input = document.querySelector(".form__input");
const form = document.querySelector(".form");
const todos = document.querySelector(".todos");
const checkIcon = document.querySelector(".drop");
const activeBtn = document.querySelector(".active");
const allBtn = document.querySelector(".all");
const completedBtn = document.querySelector(".completed");
const count = document.querySelector(".count");
const filtersElement = document.querySelector(".controls__container");
const filterDoneBtn = document.querySelector(".delete-complete");
const borderedElements = document.querySelectorAll(".border");
allBtn.classList.add("border");

// variables
let todoList = [];
let nextId = 1;
const stats = { all: "all", completed: "completed", active: "active" };
const { all, completed, active } = stats;
let currentStatus = all;

//todos count
const setCounter = (todoList) => {
  todoList.length === 1
    ? (count.textContent = `${todoList.length} item left`)
    : (count.textContent = `${todoList.length} items left`);
};

//get active todos
const getActive = () => {
  return todoList.filter((todo) => !todo.checked);
};

// get completed todos
const getCompleted = () => {
  return todoList.filter((todo) => todo.checked);
};

// show/hide filters
const toggleFilters = () => {
  if (todoList.length === 0) {
    filtersElement.classList.add("hidden");
  } else {
    filtersElement.classList.remove("hidden");
  }
};

toggleFilters();

//draw todos in DOM
const renderTodos = (todoList) => {
  todos.innerHTML = "";
  todoList.forEach((todo) => {
    todos.appendChild(createTodoElement(todo));
  });
  setCounter(getActive(todoList));
  toggleFilters(todoList);
};

// render control
const controlRender = () => {
  toggleBorder();
  toggleClearBtn();
  if (currentStatus === all) {
    renderTodos(todoList);
    console.log(currentStatus);
  } else if (currentStatus === completed) {
    renderTodos(getCompleted());
    console.log(currentStatus);
  } else if (currentStatus == active) {
    renderTodos(getActive());
    console.log(currentStatus);
  }
};

//filter handler
const filterHandler = (status) => {
  currentStatus = status;
  controlRender();
};

//filter done todos
const filterDone = () => {
  todoList = todoList.filter((todo) => !todo.checked);
  controlRender();
};

//get clicked element index
const getElementId = (element) => {
  return +element.closest(".todo").id;
};

const getTodoById = (id) => todoList.find((todo) => todo.id === id);

//delete todos
const deleteTodo = (event) => {
  todoList = todoList.filter(
    (todo) => todo.id !== +event.target.parentElement.id
  );
  controlRender();
};

//toggle checkbox
const toggleCheckbox = (event) => {
  const todo = getTodoById(getElementId(event.target));
  todo.checked = !todo.checked;
  controlRender();
};

//add todo structure
const createTodoElement = (todo) => {
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  newTodo.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", toggleCheckbox);
  todo.checked ? checkbox.setAttribute("checked", true) : null;
  checkbox.classList.add("checkbox");

  const label = document.createElement("h2");
  label.classList.add("label");
  label.textContent = todo.label;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("closeBtn");
  closeBtn.innerText = "x";
  closeBtn.addEventListener("click", deleteTodo);

  newTodo.appendChild(checkbox);
  newTodo.appendChild(label);
  newTodo.appendChild(closeBtn);
  return newTodo;
};

//create todo
const createTodo = (label) => {
  if (label.trim() === "") {
    return;
  }

  todoList.push({
    label: label.trim(),
    id: nextId++,
    checked: false,
  });
};

//submit todo
const submitTodo = (event) => {
  event.preventDefault();
  createTodo(input.value);
  input.value = "";
  controlRender();
};

// check if all are checked
const isChecked = (todoList) => todoList.every((todo) => todo.checked);

// toggle checkboxs all
const toggleCheckboxesAll = () => {
  if (!isChecked(todoList)) {
    toggleAllCheckboxes(todoList, true);
    controlRender();
  } else if (isChecked(todoList)) {
    toggleAllCheckboxes(todoList, false);
    controlRender();
  }
};
// check/uncheck all checkboxes
const toggleAllCheckboxes = (todoList, value) => {
  todoList.forEach((todo) => {
    todo.checked = value;
  });
};

// change border depending on current status
const toggleBorder = () => {
  if (currentStatus === all) {
    allBtn.classList.add("border");
    completedBtn.classList.remove("border");
    activeBtn.classList.remove("border");
  } else if (currentStatus === completed) {
    completedBtn.classList.add("border");
    activeBtn.classList.remove("border");
    allBtn.classList.remove("border");
  } else {
    activeBtn.classList.add("border");
    allBtn.classList.remove("border");
    completedBtn.classList.remove("border");
  }
};

// show/hide clear completed
const toggleClearBtn = () => {
  if (getCompleted().length === 0) {
    filterDoneBtn.classList.add("unvisible");
  } else {
    filterDoneBtn.classList.remove("unvisible");
  }
};

// event listeners
checkIcon.addEventListener("click", toggleCheckboxesAll);

addbtn.addEventListener("click", submitTodo);

activeBtn.addEventListener("click", () => filterHandler(active));
completedBtn.addEventListener("click", () => filterHandler(completed));
allBtn.addEventListener("click", () => filterHandler(all));

filterDoneBtn.addEventListener("click", () => filterDone(todoList));
