import step from './step.js';

function decorator(that) {
  that.next = (index, value) => {
    that.values[index] = value;

    if (!index) {
      that._done();
    }
  };

  that.execute = (done) => {
    that.doneFn = done || console.warn.bind(console, '[.execute(done)] \'done\' must be a Function');

    while (!that._isDone()) {}

    if (that.error) {
      that._done();
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
