/**
 * It fetches a JSON resource and returns a promise that resolves to the JSON object
 * @param url - The URL to fetch.
 * @param [options] - {
 * @returns The response.json() is being returned.
 */
export const fetchJSON = async (url, options = {}) => {
	const headers = { Accept: "application/json", ...options.headers };
	const response = await fetch(url, { ...options, headers });
	if (response.ok) {
		return response.json();
	}
	throw new Error("Erreur serveur", { cause: response });
};
