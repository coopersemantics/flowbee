import parallel from '../lib/parallel.js';

describe('parallel', () => {
  it('should execute `fns` in parallel, keeping the order at which each is defined', (done) => {
    let parallel1 = parallel(
      (cb) => {
        setTimeout(() => {
          cb(1);
        }, 1000);
      },
      (cb) => {
        setTimeout(() => {
          cb(2);
        }, 500);
      },
      (cb) => {
        setTimeout(() => {
          cb(3);
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
