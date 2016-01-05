import step from './step.js';

/**
 * Executes `fns` in a series. Each function has an `fn` function.
 * Once the previous `fn` function is executed, the series continues.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return step(...arguments);
}
