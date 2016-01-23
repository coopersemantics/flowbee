import parallel from '../lib/parallel.js';

/**
 * @see {@link ./step} for step-specific tests.
 */
describe('parallel', () => {
  it('should execute `tasks` in parallel, keeping the original order', (done) => {
    let parallel1 = parallel(
      (resolve) => {
        setTimeout(() => {
          resolve('a');
        }, 1000);
      },
      (resolve) => {
        setTimeout(() => {
          resolve('b');
        }, 500);
      },
      (resolve) => {
        setTimeout(() => {
          resolve('c');
        }, 1);
      }
    );

    parallel1.execute((err, values) => {
      expect(err).to.be.null;
      expect(values).to.deep.equal(['a', 'b', 'c']);
      done();
    });
  });
});
