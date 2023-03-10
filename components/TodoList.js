import { createElement, cloneTemplate } from "../functions/dom.js";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class TodoList {
	/** @type {Todo[]} */
	#todos = [];

	/** @type {HTMLUListElement} */
	#listElement = [];

	/** @param {Todo[]} todos */
	constructor(todos) {
		this.#todos = todos;
	}

	/** @param {HTMLElement} element */
	appendTo(element) {
		element.append(cloneTemplate("todolist-layout"));

		this.#listElement = element.querySelector(".list-group");
		for (let todo of this.#todos) {
			const task = new TodoListItem(todo);
			this.#listElement.append(task.element);
		}
		element.querySelector("form").addEventListener("submit", (event) => this.#onSubmit(event));
		element.querySelectorAll(".btn-group button").forEach((button) => {
			button.addEventListener("click", (event) => this.#toggleFilter(event));
		});
	}

	/**
	 * @param {SubmitEvent} event
	 */
	#onSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const title = new FormData(form).get("title").toString().trim();
		if (title === "") {
			return;
		}
		const todo = {
			id: Date.now(),
			title,
			completed: false,
		};
		const item = new TodoListItem(todo);
		this.#listElement.prepend(item.element);
		form.reset();
	}

	/**
	 * @param {PointerEvent} event
	 */
	#toggleFilter(event) {
		event.preventDefault();
		const filter = event.currentTarget.getAttribute("data-filter");
		event.currentTarget.parentElement.querySelector(".active").classList.remove("active");
		event.currentTarget.classList.add("active");
		if (filter === "todo") {
			this.#listElement.classList.add("hide-completed");
			this.#listElement.classList.remove("hide-todo");
		} else if (filter === "done") {
			this.#listElement.classList.add("hide-todo");
			this.#listElement.classList.remove("hide-completed");
		} else {
			this.#listElement.classList.remove("hide-todo");
			this.#listElement.classList.remove("hide-completed");
		}
	}
}

class TodoListItem {
	#element;

	/** @type {Todo} */
	constructor(todo) {
		const id = `todo-${todo.id}`;
		const li = cloneTemplate("todolist-item").firstElementChild;
		this.#element = li;
		const checkbox = li.querySelector("input");
		checkbox.setAttribute("id", id);
		if (todo.completed) {
			checkbox.setAttribute("checked", "");
		}
		const label = li.querySelector("label");
		label.setAttribute("for", id);
		label.innerText = todo.title;

		const deleteButton = li.querySelector("button");
		this.toggle(checkbox);

		deleteButton.addEventListener("click", (event) => this.remove(event));
		checkbox.addEventListener("change", (event) => this.toggle(event.currentTarget));
	}

	/**
	 * @param {HTMLElement}
	 */
	get element() {
		return this.#element;
	}

	/**
	 * @param {PointEvent} event
	 */
	remove(event) {
		event.preventDefault();
		this.#element.remove();
	}

	/**
	 * Change state (todo / completed) of the task
	 *
	 * @param {HTMLInputElement} checkbox
	 */
	toggle(checkbox) {
		if (checkbox.checked) {
			this.#element.classList.add("is-completed");
		} else {
			this.#element.classList.remove("is-completed");
		}
	}
}
