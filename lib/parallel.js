import step from './step.js';

function decorator(that) {
  that.next = (index, value) => {
    that.values[index] = value;

    if (!index) {
      that._done(that.error, that.values);
    }
  };

  that.done = (fn) => {
    that.doneFn = fn;

    while (that._exec()) {}

    if (that.error) {
      that._done(that.error);
    }
  };

  return that;
}

/**
 * Executes `fns` in parallel.
 * Each function has an `fn` function.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(step(...arguments));
}
