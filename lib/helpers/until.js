/**
 * Executes `fn` until `predicate` returns `true`.
 * @param {function} predicate
 * @param {function} fn
 * @returns {function}
 * @public
 */
export default function until(predicate, fn) {
  return (value) => {
    if (predicate(value)) {
      return value;
    }

    return until(predicate, fn)(fn(value));
  };
}
