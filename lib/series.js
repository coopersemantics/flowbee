import step from './step.js';

/**
 * Executes `fns` in a series. Each function has a `next` function.
 * Once the `next` is invoked, the next function in the series is invoked.
 * @returns {object}
 * @public
 */
export default function() {
	return step(...arguments);
}
