import step from './step.js';
import compose from './helpers/compose.js';

function decorator(that) {
	let _done = that._done.bind(that);

	that._done = (err, values) => {
		_done(err, compose(...values)());
	};

	return that;
}

/**
 * Executes `fns` in a series. Each function has a `next` function,
 * which consumes the return value of the `next` function that follows.
 * @param {function} arguments
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(step(...arguments));
}
