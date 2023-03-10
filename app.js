import { createElement } from "./functions/dom.js"
import { TodoList } from "./components/TodoList.js"

try {
	const todosInStorage = localStorage.getItem("todos")?.toString()
	let todos = []
	if (todosInStorage) {
		todos = JSON.parse(todosInStorage)
	}
	const list = new TodoList(todos)
	list.appendTo(document.querySelector("#todolist"))
} catch (error) {
	const alertElement = createElement("div", { class: "alert alert-danger m-2", role: "alert" })
	alertElement.textContent = "Impossible de charger les tâches"
	document.body.prepend(alertElement)
	console.error(error)
}
