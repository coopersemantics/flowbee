import sequence from '../lib/sequence.js';

describe('sequence', () => {
  it('should consume the return value of the previous `fn` function', (done) => {
    let sequence1 = sequence(
      (fn) => {
        setTimeout(() => {
          fn(() => 'a');
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 'b');
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 'c');
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
