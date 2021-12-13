/** @format */

export const fetchJSON = async (route) => {
	try {
		// send a request on the given route and await the response
		const res = await fetch(route);
		// return the result as json
		return res.json();
	} catch (e) {
		console.error("error while fetching JSON: ", e);
	}
};
