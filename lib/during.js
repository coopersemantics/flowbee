import step from './step.js';
import during from './helpers/during.js';

function decorator(that) {
	let _done = that._done.bind(that);

	that._done = (err, values) => {
		_done(err, during(...values));
	};

	return that;
}

/**
 * Executes `fns` in a series. Each function has one argument;
 * the first function has `predicate`, and the last function has `fn`.
 * Once `.done` is invoked, and `predicate` is passed a `value`, `fn`
 * will be invoked, until `predicate` returns `false`.
 * @param {function} arguments
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(step(...arguments));
}
