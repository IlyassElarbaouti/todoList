const addbtn = document.querySelector(".form__btn");
const input = document.querySelector(".form__input");
const form = document.querySelector(".form");
const todos = document.querySelector(".todos");
const checkIcon = document.querySelector(".drop");
let todoList = [];
let nextId = 1;

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
const toggleCheckbox = (event) => {
  const todo = getTodoById(getElementId(event.target));
  todo.checked = !todo.checked;
  renderTodos();
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

  const label = document.createElement("h2");
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

//draw todos in DOM
const renderTodos = () => {
  todos.innerHTML = "";
  todoList.forEach((todo) => {
    todos.appendChild(createTodoElement(todo));
  });
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

//toggle checkboxs all
const toggleCheckboxesAll = () => {
  if (!isChecked(todoList)) {
    toggleAllCheckboxes(todoList,true)
    renderTodos();
  } else if (isChecked(todoList)) {
    toggleAllCheckboxes(todoList,false)
    renderTodos();
  }
};
//check/uncheck all checkboxes
const toggleAllCheckboxes = (todoList,value)=>{
  todoList.forEach((todo) => {
    todo.checked = value;
  });
}
//check if all are checked
const isChecked = (todoList)=>todoList.every(todo=>todo.checked)

checkIcon.addEventListener("click", toggleCheckboxesAll);
addbtn.addEventListener("click", submitTodo);
