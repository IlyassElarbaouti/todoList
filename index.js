const addbtn = document.querySelector(".form__btn");
const input = document.querySelector(".form__input");
const form = document.querySelector(".form");
const todos = document.querySelector(".todos");
const checkIcon = document.querySelector(".drop");
const activeBtn = document.querySelector('.active');
const allBtn = document.querySelector('.all');
const completedBtn = document.querySelector('.completed');
const count = document.querySelector('.count')
let todoList = [];
let nextId = 1;

//get active todos
const getActive = (todoList) =>{
  return todoList.filter(todo=>!todo.checked)
}

///render active
const renderActive = () =>{
renderTodos(getActive(todoList
  ))
}

//get completed todos
const getCompleted = (todoList) =>{
  return todoList.filter(todo=>todo.checked)
}

///render active
const renderCompleted = () =>{
renderTodos(getCompleted(todoList
  ))
}

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
  renderTodos(todoList);
};

//toggle checkbox
const toggleCheckbox = (event) => {
  const todo = getTodoById(getElementId(event.target));
  todo.checked = !todo.checked;
  renderTodos(todoList);
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
  checkbox.classList.add('checkbox')

  const label = document.createElement("h2");
  label.classList.add('label')
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
const renderTodos = (todoList) => {
  todos.innerHTML = "";
  todoList.forEach((todo) => {
    todos.appendChild(createTodoElement(todo));
  });
  setCounter(getActive(todoList))
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
  renderTodos(todoList);
};

//set counter
const setCounter = (todoList)=>{
  count.textContent = `${todoList.length} items left`
}

//toggle checkboxs all
const toggleCheckboxesAll = () => {
  if (!isChecked(todoList)) {
    toggleAllCheckboxes(todoList,true)
    renderTodos(todoList);
  } else if (isChecked(todoList)) {
    toggleAllCheckboxes(todoList,false)
    renderTodos(todoList);
  }
};
//check/uncheck all checkboxes
const toggleAllCheckboxes = (todoList,value)=>{
  todoList.forEach((todo) => {
    todo.checked = value;
  });
}
//check if all are checked
const isChecked = (todoList)=>todoList.every(todo=>todo.checked);

//event listeners
checkIcon.addEventListener("click", toggleCheckboxesAll);
addbtn.addEventListener("click", submitTodo);
activeBtn.addEventListener('click',renderActive)
completedBtn.addEventListener('click',renderCompleted)
allBtn.addEventListener('click',()=>renderTodos(todoList))

