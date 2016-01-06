import parallel from './parallel.js';
import compose from './helpers/compose.js';

function decorator(that) {
	that._done = () => {
		that.doneFn(that.error, compose(...that.values.reverse())());
	};

	return that;
}

/**
 * Executes `fns` in parallel. Each function has an `fn` function,
 * which consumes the return value of the previous `fn` function.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(parallel(...arguments));
}
