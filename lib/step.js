import partial from './helpers/partial.js';

class Step {
	/**
	 * @param {array} fns
	 * @returns {object}
	 * @constructor
	 */
	constructor(...fns) {
		let that = this;

		that.index = 0;
		that.values = [];
		that.error = null;
		that.stack = fns.map((fn, index) => fn.bind(null, partial(that, 'next', index)));
	}

	/**
	 * Determines if the stack iteration is complete -
	 * whether there is a caught exception, or all layers
	 * in the stack have been executed.
	 * @returns {boolean}
	 * @protected
	 */
	_isDone() {
		let that = this;
		let layer = that.stack[that.index++];

		try {
			if (layer) {
				layer();

				return false;
			}
		} catch (err) {
			that.error = err;
		}

		return true;
	}

	/**
	 * Executes the next layer in the stack.
	 * @param {number|void} index
	 * @param {*} value
	 * @returns {void}
	 * @protected
	 */
	next(index, value) {
		let that = this;

		if (typeof index !== 'undefined') {
			that.values[index] = value;
		}

		if (that._isDone()) {
			that._done(that.error, that.values);
		}
	}

	/**
	 * Executes the `done` function.
	 * @param {object} err
	 * @param {*} value
	 * @returns {void}
	 * @protected
	 */
	_done(err, value) {
		let that = this;

		if (typeof that.doneFn !== 'function') {
			return console.warn('[.done] must be a Function');
		}

		that.doneFn(err, err ? undefined : value);
	}

	/**
	 * Starts the execution of the given method.
	 * @param {function} fn
	 * @returns {void}
	 * @protected
	 */
  execute(fn) {
		let that = this;

		that.doneFn = fn;

		that.next();
	}
}

/**
 * Generates `Step` instances (Factory).
 * @param {function} fns
 * @returns {object}
 * @public
 */
export default function() {
	return new Step(...arguments);
}
