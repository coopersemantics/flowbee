# flowbee

Async control flow library for Node.js and the browser.

![Unit Test Coverage](http://img.shields.io/badge/coverage-98.18%-green.svg?style=flat)

## Getting Started

`flowbee` requires [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download), before proceeding.

```bash
# Install flowbee
$ npm install --save git+ssh://git@github.com/coopersemantics/flowbee.git
```

## Run flowbee in a Browser

### HTML Script Element

[`path/to/flowbee.js`](dist/flowbee.js)

```html
<script src="path/to/flowbee.js"></script>
```

### CommonJS Browser Shimming (Browserify and Other Flavors)

```js
var flowbee = require('flowbee');
```

## Run flowbee in Node.js

```js
var flowbee = require('flowbee');
```

## API Documentation

### .series(fns)

Executes `fns` in a series. Each function has an `fn` function. Once the previous `fn` function is executed, the series continues.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, values)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `values` is an array of `fn` values, keeping the original order.

```js
flowbee.series(function(fn) {
  setTimeout(function() {
    fn('a');
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn('b');
  }, 500);
}, function(fn) {
  setTimeout(function() {
    fn('c');
  }, 1);
}).execute(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .parallel(fns)

Executes `fns` in parallel. Each function has an `fn` function.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, values)

The `done` function is executed, once all `fn` functions have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `values` is an array of `fn` values, keeping the original order.

```js
flowbee.parallel(function(fn) {
  setTimeout(function() {
    fn('a');
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn('b');
  }, 500);
}, function(fn) {
  setTimeout(function() {
    fn('c');
  }, 1);
}).execute(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .flow(fns)

Executes `fns` in a series. Each function has an `fn` function. `fns` consume the value of the previous `fn` function.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `value` is the last `fn` value, which could be the sequence of `fn` values, keeping the original order.

```js
flowbee.flow(function(fn) {
  setTimeout(function() {
    fn('a');
  }, 1000);
}, function(fn, value) {
  setTimeout(function() {
    fn(value + 'b');
  }, 500);
}, function(fn, value) {
  setTimeout(function() {
    fn(value + 'c');
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .compose(fns)

Executes `fns` in parallel. Each function has an `fn` function, which consumes the return value of the `fn` function that follows.

#### fn(f)

The `fn` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of the `fn` that follows.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `value` is the composition of `fn` values, keeping the original order.

```js
flowbee.compose(function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 'a';
    });
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 'b';
    });
  }, 500);
}, function(fn) {
  setTimeout(function() {
    fn(function() {
      return 'c';
    });
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "cba"
});
```

### .sequence(fns)

Executes `fns` in parallel. Each function has an `fn` function, which consumes the return value of the previous `fn` function.

#### fn(f)

The `fn` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of the previous `fn` function.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `value` is the sequence of `fn` values, keeping the original order.

```js
flowbee.sequence(function(fn) {
  setTimeout(function() {
    fn(function() {
      return 'a';
    });
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 'b';
    });
  }, 500);
}, function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 'c';
    });
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .during(fns)

Executes `fns` in parallel. Each function has one argument; the first function has `predicate`, and the last function has `fn`. Once `done` is executed, and `predicate` is passed a `value`, `fn` will be executed, until `predicate` returns `false`.

#### predicate(f)

The `predicate` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of `fn`; `done`'s `fn` starts the execution, passing the initial value.

#### fn(f)

The `fn` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of the previous `fn` function.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, fn)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `fn` is the function that executes `predicate`, passing a `value`.

```js
flowbee.during(function(predicate) {
  setTimeout(function() {
    predicate(function(value) {
      return value < 100;
    });
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 1;
    });
  }, 1);
}).execute(function(err, fn) {
  if (err) {
    return err;
  }

  // err => null
  // fn(0) => 100
});
```

### .until(fns)

Executes `fns` in parallel. Each function has one argument; the first function has `predicate`, and the last function has `fn`. Once `done` is executed, and `predicate` is passed a `value`, `fn` will be executed, until `predicate` returns `true`.

#### predicate(f)

The `predicate` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of `fn`; `done`'s `fn` starts the execution, passing the initial value.

#### fn(f)

The `fn` function has one argument - the fulfillment function - `f`.

##### f(value)

`value` is the return value of the previous `fn` function.

#### .execute(done)

Starts the execution of the method. `.execute` has a `done` function.

##### done(err, fn)

The `done` function is executed, once all `fns` have been executed. `done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `done` is executed. `fn` is the function that executes `predicate`, passing a `value`.

```js
flowbee.until(function(predicate) {
  setTimeout(function() {
    predicate(function(value) {
      return value > 100;
    });
  }, 1000);
}, function(fn) {
  setTimeout(function() {
    fn(function(value) {
      return value + 1;
    });
  }, 1);
}).execute(function(err, fn) {
  if (err) {
    return err;
  }

  // err => null
  // fn(0) => 101
});
```

## Examples

[Examples](examples)

## Contributing

[Contributing](CONTRIBUTING.md)

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT License](LICENSE)
