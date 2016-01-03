import step from './step.js';

/**
 * Executes `fns` in a series. Each function has a `next` function.
 * Once the previous `next` function is executed, the series continues.
 * @returns {object}
 * @public
 */
export default function() {
	return step(...arguments);
}
