import until from '../../lib/helpers/until.js';

describe('until', () => {
  it('should execute `fn` until `predicate` returns `true`', () => {
    let until1 = until(
      (val) => val > 100,
      (val) => val + 1
    );
    let until2 = until(
      (val) => val < 100,
      (val) => val + 1
    );

    expect(until1(0)).to.equal(101);
    expect(until2(0)).to.equal(0);
  });
});
