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
	 * Executes the given layer in the stack, until completion.
	 * @returns {boolean}
	 * @protected
	 */
	_exec() {
		let that = this;
		let layer = that.stack[that.index++];

		try {
			if (layer) {
				layer();

				return true;
			}
		} catch (err) {
			that.error = err;
		}

		return false;
	}

	/**
	 * Sets the value in the stack, and executes the done function, on completion.
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

		if (!that._exec()) {
			that._done(that.error, that.values);
		}
	}

	/**
	 * Executes the done function.
	 * @param {object} err
	 * @param {*} value
	 * @returns {void}
	 * @protected
	 */
	_done(err, value) {
		let that = this;

		if (typeof that.doneFn === 'function') {
			that.doneFn(err, err ? undefined : value);
		} else {
			console.warn('`.done` is not a Function');
		}
	}

	/**
	 * Sets the done function, and kicks off the stack iteration.
	 * @param {function} fn
	 * @returns {void}
	 * @protected
	 */
  done(fn) {
		let that = this;

		that.doneFn = fn;

		that.next();
	}
}

/**
 * Generates Step instances (Factory).
 * @param {function} arguments
 */
export default function() {
	return new Step(...arguments);
}
