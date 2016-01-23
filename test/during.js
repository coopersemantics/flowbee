import during from '../lib/during.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('during', () => {
  it('should execute `resume` until `test` returns `false`', (done) => {
    let during1 = during(
      (test) => {
        setTimeout(() => {
          test((value) => value < 100);
        }, 1000);
      },
      (resume) => {
        setTimeout(() => {
          resume((value) => value + 1);
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
