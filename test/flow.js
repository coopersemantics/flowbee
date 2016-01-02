import flow from '../lib/flow.js';

describe('flow', () => {
  it('should consume the value of the previous `next` function', (done) => {
    let flow1 = flow(
      (cb) => {
        setTimeout(() => {
          cb('a');
        }, 1000);
      },
      (cb, val) => {
        setTimeout(() => {
          cb(val + 'b');
        }, 500);
      },
      (cb, val) => {
        setTimeout(() => {
          cb(val + 'c');
        }, 1);
      }
    );

    flow1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.equal('abc');
      done();
    });
  });
});
