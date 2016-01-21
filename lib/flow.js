import step from './step.js';

function decorator(that) {
  let next = that.next.bind(that);

  that.next = (index, value) => {
    let layer = that.stack[that.index];

    if (layer) {
      that.stack[that.index] = layer.bind(null, value);
    }

    next(index, value);
	};

  that._done = () => {
    that.doneFn(that.error, that.values.slice(-1)[0]);
  };

  return that;
}

/**
 * Executes `tasks` in a series. Each function has a `resolve` function.
 * `tasks` consume the value of the previous `resolve` function.
 * @param {function} tasks
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(step(...arguments));
}
