import parallel from './parallel.js';
import compose from './helpers/compose.js';

function decorator(that) {
	that.next = (index, value) => {
		that.values[index] = value;

		if (!index) {
			that._done(that.error, compose(...that.values)());
		}
	};

	return that;
}

/**
 * Executes `fns` in parallel. Each function
 * has an `fn` function, which consumes the return
 * value of the `fn` function that follows.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(parallel(...arguments));
}
