import parallel from './parallel.js';
import during from './helpers/during.js';

function decorator(that) {
	that.next = (index, value) => {
		that.values[index] = value;

		if (!index) {
			that._done(that.error, during(...that.values));
		}
	};

	return that;
}

/**
 * Executes `fns` in parallel. Each function has one argument;
 * the first function has `predicate`, and the last function has `fn`.
 * Once `.done` is executed, and `predicate` is passed a `value`,
 * `fn` will be executed, until `predicate` returns `false`.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(parallel(...arguments));
}
