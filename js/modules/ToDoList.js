export default class ToDoList {
  #localStorageKey
  #todos
  #config
  constructor(parentSelector) {
    this.parentElement = document.querySelector(parentSelector);
    this.#localStorageKey= 'todoList';
    this.#todos = []
    this.#config = {
      wrapClasses: "border-b-2 py-4 grid grid-cols-[1fr_152px] gap-x-10 gap-y-4",
      titleClass: "text-3xl",
      descriptionClass: "text-xg",
      buttonsContainerClasses: "flex gap-4 col-start-2 row-start-1 row-end-3",
      baseButtonClasses: "w-10 h-10 border-2 text-white bg-emerald-500 text-2xl flex items-center justify-center material-symbols-outlined",
      buttonColors: {
        isDone: 'bg-emerald-500',
        edit: 'bg-yellow-300',
        delete: 'bg-red-300',
      },
      buttonIcons: {
        isDone: 'check',
        edit: 'edit',
        delete: 'delete',
      }
    }
  }

  addTodo(todo) {
    this.#todos.push(todo)

    return this.#todos
  }

  removeTodo(todoId) {
    const indexToDelete = this.#todos.findIndex((item) => +item.id === +todoId)

    if(indexToDelete >= 0) {
      this.#todos.splice(indexToDelete, 1)
    }

    return this.#todos
  }

  markAsDone(todoId) {
    const indexToUpdate = this.#todos.findIndex(item => +item.id === +todoId)

    if(indexToUpdate >= 0) {
      this.#todos[indexToUpdate].isDone = !this.#todos[indexToUpdate].isDone
    }

    return this.#todos
  }
  startEdit(todoId) {
    //There the task
    const indexToEdit = this.#todos.findIndex(item => +item.id === +todoId)

    if(indexToEdit >= 0) {
      document.getElementById("first-input").value = this.#todos[indexToEdit].name
      document.getElementById("second-input").value = this.#todos[indexToEdit].desc
      document.getElementById("is-task-done").checked = this.#todos[indexToEdit].isDone;
      this.removeTodo(todoId)
    }

    return this.#todos
  }

  getTodos() {
    return this.#todos
  }

  renderTodo() {
    this.parentElement.innerHTML = ''

    this.#todos.forEach(todo => {
      const wrap = document.createElement('div')
      wrap.classList = this.#config.wrapClasses;

      const title = document.createElement('h2')
      title.classList = this.#config.titleClass
      title.innerText = todo.name;
      wrap.appendChild(title)

      const description = document.createElement('p')
      description.classList = this.#config.descriptionClass
      description.innerText = todo.desc;
      wrap.appendChild(description)


      const buttonsWrapper = document.createElement('div')
      buttonsWrapper.classList = this.#config.buttonsContainerClasses;

      buttonsWrapper.appendChild(this.createButton('isDone', this.markAsDone, todo))
      buttonsWrapper.appendChild(this.createButton('edit', this.startEdit, todo))
      buttonsWrapper.appendChild(this.createButton('delete', this.removeTodo, todo))
      wrap.appendChild(buttonsWrapper)

      this.parentElement.append(wrap)
    })
  }

  createButton(type, action, todo) {
    const button = document.createElement('button')
    button.classList = this.#config.baseButtonClasses;
    button.classList.add(this.#config.buttonColors[type])

    if(type !== 'isDone' || (type === 'isDone' && todo.isDone)) {
      button.innerText = this.#config.buttonIcons[type]
    }

    button.addEventListener('click', () => {
      action.call(this, todo.id)
      this.renderTodo.call(this)
      this.setDataToLocalStorage.call(this)
    })

    return button
  }

  setDataToLocalStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#todos))
  }

  checkLocalStorageList() {
    if(localStorage.getItem(this.#localStorageKey)){
      this.#todos = JSON.parse(localStorage.getItem(this.#localStorageKey))
      this.renderTodo()
    }
  }
}