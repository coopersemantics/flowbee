/**
 * Executes `fn` until `predicate` returns `false`.
 * @param {function} predicate
 * @param {function} fn
 * @returns {function}
 * @public
 */
export default function during(predicate, fn) {
  return (value) => {
    if (!predicate(value)) {
      return value;
    }

    return during(predicate, fn)(fn(value));
  };
}
