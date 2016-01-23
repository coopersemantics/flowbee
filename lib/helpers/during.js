/**
 * Executes `fn` until `test` returns `false`.
 * @param {function} test
 * @param {function} fn
 * @returns {function}
 * @public
 */
export default function during(test, fn) {
  return (value) => {
    if (!test(value)) {
      return value;
    }

    return during(test, fn)(fn(value));
  };
}
