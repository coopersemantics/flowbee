import flow from '../lib/flow.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('flow', () => {
  it('should consume the value of the previous `resolve` function', (done) => {
    let flow1 = flow(
      (resolve) => {
        setTimeout(() => {
          resolve('a');
        }, 1000);
      },
      (resolve, value) => {
        setTimeout(() => {
          resolve(value + 'b');
        }, 500);
      },
      (resolve, value) => {
        setTimeout(() => {
          resolve(value + 'c');
        }, 1);
      }
    );

    flow1.execute((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('abc');
      done();
    });
  });
});
