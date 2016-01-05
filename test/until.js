import until from '../lib/until.js';

describe('until', () => {
  it('should execute `fn` until `predicate` returns `true`', (done) => {
    let until1 = until(
      (predicate) => {
        setTimeout(() => {
          predicate((value) => value > 100);
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn((value) => value + 1);
        }, 1);
      }
    );

    until1.execute((err, fn) => {
      expect(err).to.be.null;
      expect(fn(0)).to.equal(101);
      done();
    });
  });
});
