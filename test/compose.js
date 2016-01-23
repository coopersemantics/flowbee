import compose from '../lib/compose.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('compose', () => {
  it('should consume the return value of the `resolve` function that follows', (done) => {
    let compose1 = compose(
      (resolve) => {
        setTimeout(() => {
          resolve((value) => value + 'a');
        }, 1000);
      },
      (resolve) => {
        setTimeout(() => {
          resolve((value) => value + 'b');
        }, 500);
      },
      (resolve) => {
        setTimeout(() => {
          resolve(() => 'c');
        }, 1);
      }
    );

    compose1.execute((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('cba');
      done();
    });
  });
});
