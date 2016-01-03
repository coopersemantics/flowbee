import sequence from '../lib/sequence.js';

describe('sequence', () => {
  it('should consume the return value of the previous `next` function', (done) => {
    let sequence1 = sequence(
      (next) => {
        setTimeout(() => {
          next(() => 'a');
        }, 1000);
      },
      (next) => {
        setTimeout(() => {
          next((value) => value + 'b');
        }, 500);
      },
      (next) => {
        setTimeout(() => {
          next((value) => value + 'c');
        }, 1);
      }
    );

    sequence1.done((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('abc');
      done();
    });
  });
});
