import { v4 as uuidV4} from "uuid"

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}
const list =  document.querySelector<HTMLUListElement>('#list')
const form =  document.querySelector<HTMLFormElement>('#new-task-form')
const input =  document.querySelector<HTMLInputElement>('#new-task-title')
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()
  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  //checkbox section
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  // close button section
  const closeButton = document.createElement("button")
  closeButton.textContent = "X"
  closeButton.addEventListener("click", () => {
    removeListItem(task)
    item.remove()
  })
  //
  label.append(checkbox, task.title, closeButton)
  item.append(label)
  list?.append(item)
}

function removeListItem(task: Task){
  console.log(tasks)
  const taskIndex = tasks.indexOf(task)
  tasks.splice(taskIndex,1)
  saveTasks()
  console.log(tasks)
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem("TASKS")
  return tasksJSON==null ? [] : JSON.parse(tasksJSON)
}