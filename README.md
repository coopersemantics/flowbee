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

Executes `fns` in a series. Each function has a `next` function. Once the previous `next` function is executed, the series continues.

#### next(value)

The `next` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .done(err, values)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `values` is an array of `next` values, keeping the original order.

```js
flowbee.series(function(next) {
  setTimeout(function() {
    next('a');
  }, 1000);
}, function(next) {
  setTimeout(function() {
    next('b');
  }, 500);
}, function(next) {
  setTimeout(function() {
    next('c');
  }, 1);
}).done(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .parallel(fns)

Executes `fns` in parallel. Each function has an `fn` function.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .done(err, values)

The `.done` method is executed, once all `fn` functions have been executed. `.done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `values` is an array of `fn` values, keeping the original order.

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
}).done(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .flow(fns)

Executes `fns` in a series. Each function has a `next` function. `fns` consume the value of the previous `next` function.

#### next(value)

The `next` function has one argument - the fulfillment `value`. `value` can be of any type.

#### .done(err, value)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `value` is the last `next` value, which could be the sequence of `next` values, keeping the original order.

```js
flowbee.flow(function(next) {
  setTimeout(function() {
    next('a');
  }, 1000);
}, function(next, value) {
  setTimeout(function() {
    next(value + 'b');
  }, 500);
}, function(next, value) {
  setTimeout(function() {
    next(value + 'c');
  }, 1);
}).done(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .compose(fns)

Executes `fns` in parallel. Each function has an `fn` function, which consumes the return value of the `fn` function that follows.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` must be a function.

#### .done(err, value)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `value` is the composition of `fn` values, keeping the original order.

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
}).done(function(err, value) {
  // err => null
  // value => "cba"
});
```

### .sequence(fns)

Executes `fns` in parallel. Each function has an `fn` function, which consumes the return value of the previous `fn` function.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` must be a function.

#### .done(err, value)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `value` is the sequence of `fn` values, keeping the original order.

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
}).done(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .during(fns)

Executes `fns` in parallel. Each function has one argument; the first function has `predicate`, and the last function has `fn`. Once `.done` is executed, and `predicate` is passed a `value`, `fn` will be executed, until `predicate` returns `false`.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` must be a function.

#### predicate(value)

The `predicate` function has one argument - the fulfillment `value`. `value` must be a function.

#### .done(err, fn)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `fn` is the function that executes `predicate`, passing a `value`.

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
}).done(function(err, fn) {
  if (err) {
    return err;
  }

  // err => null
  // fn(0) => 100
});
```

### .until(fns)

Executes `fns` in parallel. Each function has one argument; the first function has `predicate`, and the last function has `fn`. Once `.done` is executed, and `predicate` is passed a `value`, `fn` will be executed, until `predicate` returns `true`.

#### fn(value)

The `fn` function has one argument - the fulfillment `value`. `value` must be a function.

#### predicate(value)

The `predicate` function has one argument - the fulfillment `value`. `value` must be a function.

#### .done(err, fn)

The `.done` method is executed, once all `fns` have been executed. `.done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `fns` is stopped, and `.done` is executed. `fn` is the function that executes `predicate`, passing a `value`.

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
}).done(function(err, fn) {
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
