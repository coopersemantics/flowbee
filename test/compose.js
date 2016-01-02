import compose from '../lib/compose.js';

describe('compose', () => {
  it('should consume the return value of the `next` function that follows', (done) => {
    let compose1 = compose(
      (cb) => {
        setTimeout(() => {
          cb((val) => val + 'a');
        }, 1000);
      },
      (cb) => {
        setTimeout(() => {
          cb((val) => val + 'b');
        }, 500);
      },
      (cb) => {
        setTimeout(() => {
          cb(() => 'c');
        }, 1);
      }
    );

    compose1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.equal('cba');
      done();
    });
  });
});
