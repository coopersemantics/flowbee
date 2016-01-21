import parallel from './parallel.js';
import compose from './helpers/compose.js';

function decorator(that) {
	that._done = () => {
		that.doneFn(that.error, compose(...that.values)());
	};

	return that;
}

/**
 * Executes `tasks` in parallel. Each function has a `resolve` function,
 * which consumes the return value of the `resolve` function that follows.
 * @param {function} tasks
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(parallel(...arguments));
}
