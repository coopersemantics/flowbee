import parallel from '../lib/parallel.js';

describe('parallel', () => {
  it('should execute `fns` in parallel, keeping the original order', (done) => {
    let parallel1 = parallel(
      (fn) => {
        setTimeout(() => {
          fn(1);
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn(2);
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn(3);
        }, 1);
      }
    );

    parallel1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.deep.equal([1, 2, 3]);
      done();
    });
  });
});
