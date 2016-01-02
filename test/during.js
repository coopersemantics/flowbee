import during from '../lib/during.js';

describe('during', () => {
  it('should invoke `fn` until `predicate` returns `false`', (done) => {
    let during1 = during(
      (cb) => {
        setTimeout(() => {
          cb((val) => val < 100);
        }, 1000);
      },
      (cb, val) => {
        setTimeout(() => {
          cb((val) => val + 1);
        }, 1);
      }
    );

    during1.done((err, fn) => {
      expect(err).to.be.null;
      expect(fn(0)).to.equal(100);
      done();
    });
  });
});
