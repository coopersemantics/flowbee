import during from '../lib/during.js';

describe('during', () => {
  it('should execute `fn` until `predicate` returns `false`', (done) => {
    let during1 = during(
      (predicate) => {
        setTimeout(() => {
          predicate((value) => value < 100);
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 1);
        }, 1);
      }
    );

    during1.execute((err, fn) => {
      expect(err).to.be.null;
      expect(fn(0)).to.equal(100);
      done();
    });
  });
});
