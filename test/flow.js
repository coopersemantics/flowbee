import flow from '../lib/flow.js';

describe('flow', () => {
  it('should consume the value of the previous `fn` function', (done) => {
    let flow1 = flow(
      (fn) => {
        setTimeout(() => {
          fn('a');
        }, 1000);
      },
      (fn, value) => {
        setTimeout(() => {
          fn(value + 'b');
        }, 500);
      },
      (fn, value) => {
        setTimeout(() => {
          fn(value + 'c');
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
