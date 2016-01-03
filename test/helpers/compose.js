import compose from '../../lib/helpers/compose.js';

describe('compose', () => {
  it('should consume the return value of the function that follows', () => {
    let compose1 = compose(
      (value) => value + 'a',
      (value) => value + 'b',
      () => 'c'
    );
    let compose2 = compose(
      (value) => value + 1,
      (value) => value + 2,
      () => 3
    );

    expect(compose1()).to.equal('cba');
    expect(compose2()).to.equal(6);
  });
});
