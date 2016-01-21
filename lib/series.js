import step from './step.js';

/**
 * Executes `tasks` in a series. Each function has a `resolve` function.
 * Once the previous `resolve` function is executed, the series continues.
 * @param {function} tasks
 * @returns {object}
 * @public
 */
export default function() {
	return step(...arguments);
}
