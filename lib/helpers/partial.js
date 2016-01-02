/**
 * Creates a new function that, when called, has its `this` keyword set to
 * the provided `context`, with a given sequence of `args` preceding
 * any provided, when the function is called.
 * @param {object} context
 * @param {string} fnName
 * @param {*} args
 * @returns {function}
 * @public
 */
export default function(context, fnName, ...args) {
  return (...a) =>
    context[fnName].apply(context, args.concat(a));
}
