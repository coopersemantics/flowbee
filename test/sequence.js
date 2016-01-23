import sequence from '../lib/sequence.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('sequence', () => {
  it('should consume the return value of the previous `resolve` function', (done) => {
    let sequence1 = sequence(
      (resolve) => {
        setTimeout(() => {
          resolve(() => 'a');
        }, 1000);
      },
      (resolve) => {
        setTimeout(() => {
          resolve((value) => value + 'b');
        }, 500);
      },
      (resolve) => {
        setTimeout(() => {
          resolve((value) => value + 'c');
        }, 1);
      }
    );

    sequence1.execute((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('abc');
      done();
    });
  });
});
