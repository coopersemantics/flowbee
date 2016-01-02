import partial from '../../lib/helpers/partial.js';

describe('partial', () => {
  let foo = {
    bar(...args) {
      return args.join('') + 'bar';
    }
  };

  it('should create a new function that, when called, has its `this` keyword set to the provided `context`, with a given sequence of `args` preceding any provided, when the function is called', () => {
    let partial1 = partial(foo, 'bar', 'foo', 'boo');

    expect(partial1('baz')).to.equal('fooboobazbar');
  });
});
