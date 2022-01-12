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
let todoList = [{ label: "test", id: 1, checked: true }];
let nextId = todoList.length + 1;
const STATUS = { all: "all", completed: "completed", active: "active" };
let currentStatus = STATUS.all;
let todosToRender = todoList;

//todos count
const setCounter = () => {
  if (todoList.length === 1) {
    count.textContent = `${getActive().length} item left`;
  } else {
    count.textContent = `${getActive().length} items left`;
  }
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

// edit todos to render

const editTodosToRender = () => {
  if (currentStatus === STATUS.all) {
    todosToRender = todoList;
  } else if (currentStatus === STATUS.completed) {
    todosToRender = getCompleted();
  } else if (currentStatus === STATUS.active) {
    todosToRender = getActive();
  }
};

//render todos in DOM
const renderTodos = () => {
  todos.innerHTML = "";
  editTodosToRender();
  todosToRender.forEach((todo) => {
    todos.appendChild(createTodoElement(todo));
  });
  updateBorder();
  toggleClearBtn();
  setCounter(getActive());
  toggleFilters();
  styleChevron();
  console.log(todosToRender);
};

//filter handler
const filterTodos = (status) => {
  currentStatus = status;
  renderTodos();
};

//delete all done todos
const deleteDone = () => {
  todoList = todoList.filter((todo) => !todo.checked);
  renderTodos();
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
  renderTodos();
};

//toggle checkbox
const toggleChecked = (event) => {
  const todo = getTodoById(getElementId(event.target));
  todo.checked = !todo.checked;
  renderTodos();
};
status;

//add todo structure
const createTodoElement = (todo) => {
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  newTodo.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", toggleChecked);
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
  renderTodos();
};

// check if all are checked
const isChecked = () => todoList.every((todo) => todo.checked);

// toggle checkboxs all
const toggleCheckboxesAll = () => {
  if (!isChecked()) {
    todoList.forEach((todo) => {
      todo.checked = true;
    });
  } else if (isChecked()) {
    todoList.forEach((todo) => {
      todo.checked = false;
    })
  };
  renderTodos();
}

// style chevron
const styleChevron = () => {
  if (todosToRender.every((todo) => todo.checked)) {
    checkIcon.classList.add("dark");
  } else {
    checkIcon.classList.remove("dark");
  }
};


// change border depending on current status
const updateBorder = () => {
  if (currentStatus === STATUS.all) {
    allBtn.classList.add("border");
    completedBtn.classList.remove("border");
    activeBtn.classList.remove("border");
  } else if (currentStatus === STATUS.completed) {
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

renderTodos();

// event listeners
checkIcon.addEventListener("click", toggleCheckboxesAll);

addbtn.addEventListener("click", submitTodo);

activeBtn.addEventListener("click", () => filterTodos(STATUS.active));
completedBtn.addEventListener("click", () => filterTodos(STATUS.completed));
allBtn.addEventListener("click", () => filterTodos(STATUS.all));
filterDoneBtn.addEventListener("click", () => deleteDone(todoList));
