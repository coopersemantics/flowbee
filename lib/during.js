import parallel from './parallel.js';
import during from './helpers/during.js';

function decorator(that) {
	that._done = () => {
		that.doneFn(that.error, during(...that.values));
	};

	return that;
}

/**
 * Executes `tasks` in parallel. Each function has one argument; the first function has `test`,
 * and the last function has `resume`. Once `done`'s `fn` function is executed,
 * `resume` will be executed, until `test` returns `false`.
 * @param {function} tasks
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(parallel(...arguments));
}
