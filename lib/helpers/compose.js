/**
 * Consumes the return value of the function that follows.
 * @param {function} fns
 * @returns {function}
 * @public
 */
export default function(...fns) {
	return (init, ...args) =>
		fns.reduceRight((prev, curr) => curr(prev, ...args), init);
}
