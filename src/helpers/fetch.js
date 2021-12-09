/** @format */

export const fetchJSON = async (route) => {
	try {
		const res = await fetch(route);
		return res.json();
	} catch (e) {
		console.error("error while fetching JSON: ", e);
	}
};
