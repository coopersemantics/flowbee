/**
 * Executes `fn` until `test` returns `true`.
 * @param {function} test
 * @param {function} fn
 * @returns {function}
 * @public
 */
export default function until(test, fn) {
  return (value) => {
    if (test(value)) {
      return value;
    }

    return until(test, fn)(fn(value));
  };
}
