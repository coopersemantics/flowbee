import parallel from '../lib/parallel.js';

describe('parallel', () => {
  it('should execute `fns` in parallel, keeping the original order', (done) => {
    let parallel1 = parallel(
      (fn) => {
        setTimeout(() => {
          fn('a');
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn('b');
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn('c');
        }, 1);
      }
    );

    parallel1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.deep.equal(['a', 'b', 'c']);
      done();
    });
  });
});
