import compose from '../../lib/helpers/compose.js';

describe('compose', () => {
  it('should consume the return value of the function that follows', () => {
    let compose1 = compose(
      (val) => val + 'a',
      (val) => val + 'b',
      () => 'c'
    );
    let compose2 = compose(
      (val) => val + 1,
      (val) => val + 2,
      () => 3
    );

    expect(compose1()).to.equal('cba');
    expect(compose2()).to.equal(6);
  });
});
