import compose from '../lib/compose.js';

describe('compose', () => {
  it('should consume the return value of the `fn` function that follows', (done) => {
    let compose1 = compose(
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 'a');
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 'b');
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn(() => 'c');
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
