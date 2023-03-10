/**
 * Create an element with the given tag and attributes.
 * @param {string} tag - The tag name of the element to create.
 * @param {object} attributes - An object containing the attributes to set on the element.
 * @returns {HTMLElement}
 */
export const createElement = (tag, attributes = {}) => {
	const element = document.createElement(tag)
	for (const [attribute, value] of Object.entries(attributes)) {
		if (value !== false && value !== null && value !== undefined) {
			element.setAttribute(attribute, value)
		}
	}
	return element
}

/**
 *
 * @param {string} id
 * @returns {DocumentFragment}
 */
export const cloneTemplate = (id) => {
	return document.getElementById(id).content.cloneNode(true)
}
