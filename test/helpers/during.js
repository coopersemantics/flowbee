import during from '../../lib/helpers/during.js';

describe('during', () => {
  it('should execute `fn` until `predicate` returns `false`', () => {
    let during1 = during(
      (val) => val < 100,
      (val) => val + 1
    );
    let during2 = during(
      (val) => val > 100,
      (val) => val + 1
    );

    expect(during1(0)).to.equal(100);
    expect(during2(0)).to.equal(0);
  });
});
