import until from '../lib/until.js';

describe('until', () => {
  it('should invoke `fn` until `predicate` returns `true`', (done) => {
    let until1 = until(
      (cb) => {
        setTimeout(() => {
          cb((val) => val > 100);
        }, 1000);
      },
      (cb, val) => {
        setTimeout(() => {
          cb((val) => val + 1);
        }, 1);
      }
    );

    until1.done((err, fn) => {
      expect(err).to.be.null;
      expect(fn(0)).to.equal(101);
      done();
    });
  });
});
