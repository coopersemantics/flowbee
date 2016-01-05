import step from './step.js';

function decorator(that) {
  let next = that.next.bind(that);
  let _done = that._done.bind(that);

  that.next = (index, value) => {
    let layer = that.stack[that.index];

    if (layer) {
      that.stack[that.index] = layer.bind(null, value);
    }

    next(index, value);
	};

  that._done = (err) => {
    _done(err, that.values.slice(-1)[0]);
  };

  return that;
}

/**
 * Executes `fns` in a series. Each function has an `fn` function.
 * `fns` consume the value of the previous `fn` function.
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return decorator(step(...arguments));
}
