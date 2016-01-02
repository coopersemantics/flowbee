import sequence from '../lib/sequence.js';

describe('sequence', () => {
  it('should consume the return value of the previous `next` function', (done) => {
    let sequence1 = sequence(
      (cb) => {
        setTimeout(() => {
          cb(() => 'a');
        }, 1000);
      },
      (cb) => {
        setTimeout(() => {
          cb((val) => val + 'b');
        }, 500);
      },
      (cb) => {
        setTimeout(() => {
          cb((val) => val + 'c');
        }, 1);
      }
    );

    sequence1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.equal('abc');
      done();
    });
  });
});
