import compose from '../lib/compose.js';

describe('compose', () => {
  it('should consume the return value of the `next` function that follows', (done) => {
    let compose1 = compose(
      (next) => {
        setTimeout(() => {
          next((value) => value + 'a');
        }, 1000);
      },
      (next) => {
        setTimeout(() => {
          next((value) => value + 'b');
        }, 500);
      },
      (next) => {
        setTimeout(() => {
          next(() => 'c');
        }, 1);
      }
    );

    compose1.done((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('cba');
      done();
    });
  });
});
