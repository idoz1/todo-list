import ToDoList from "./modules/ToDoList.js";

const myTodoList = new ToDoList("#todosList");
myTodoList.checkLocalStorageList()
document.forms[0].addEventListener('submit', function(event) {

  event.preventDefault();

  const data = {
    name: this.elements.name.value,
    desc: this.elements.desc.value,
    isDone: this.elements.done.checked,
    id: Date.now(),
  }
  myTodoList.addTodo(data)

  myTodoList.renderTodo()
  myTodoList.setDataToLocalStorage()

  this.reset()

})
