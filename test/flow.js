import flow from '../lib/flow.js';

describe('flow', () => {
  it('should consume the value of the previous `next` function', (done) => {
    let flow1 = flow(
      (next) => {
        setTimeout(() => {
          next('a');
        }, 1000);
      },
      (next, value) => {
        setTimeout(() => {
          next(value + 'b');
        }, 500);
      },
      (next, value) => {
        setTimeout(() => {
          next(value + 'c');
        }, 1);
      }
    );

    flow1.done((err, value) => {
      expect(err).to.be.null;
      expect(value).to.equal('abc');
      done();
    });
  });
});
