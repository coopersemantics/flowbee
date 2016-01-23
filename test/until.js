import until from '../lib/until.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('until', () => {
  it('should execute `resume` until `test` returns `true`', (done) => {
    let until1 = until(
      (test) => {
        setTimeout(() => {
          test((value) => value > 100);
        }, 1000);
      },
      (resume) => {
        setTimeout(() => {
          resume((value) => value + 1);
        }, 1);
      }
    );

    until1.execute((err, fn) => {
      expect(err).to.be.null;
      expect(fn(0)).to.equal(101);
      done();
    });
  });
});
