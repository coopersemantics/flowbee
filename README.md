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

### .series(tasks)

Executes `tasks` in a series. Each function has a `resolve` function. Once the previous `resolve` function is executed, the series continues.

#### resolve(value)

The `resolve` function has one argument - `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of `.series`. `.execute` has a `done` function.

##### done(err, values)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `values` is an array of `resolve` values, keeping the original order.

```js
flowbee.series(function(resolve) {
  setTimeout(function() {
    resolve('a');
  }, 1000);
}, function(resolve) {
  setTimeout(function() {
    resolve('b');
  }, 500);
}, function(resolve) {
  setTimeout(function() {
    resolve('c');
  }, 1);
}).execute(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .parallel(tasks)

Executes `tasks` in parallel. Each function has a `resolve` function.

#### resolve(value)

The `resolve` function has one argument - `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of `.parallel`. `.execute` has a `done` function.

##### done(err, values)

The `done` function is executed, once all `resolve` functions have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `values` is an array of `resolve` values, keeping the original order.

```js
flowbee.parallel(function(resolve) {
  setTimeout(function() {
    resolve('a');
  }, 1000);
}, function(resolve) {
  setTimeout(function() {
    resolve('b');
  }, 500);
}, function(resolve) {
  setTimeout(function() {
    resolve('c');
  }, 1);
}).execute(function(err, values) {
  // err => null
  // values => ["a", "b", "c"]
});
```

### .flow(tasks)

Executes `tasks` in a series. Each function has a `resolve` function. `tasks` consume the value of the previous `resolve` function.

#### resolve(value)

The `resolve` function has one argument - `value`. `value` can be of any type.

#### .execute(done)

Starts the execution of `.flow`. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `value` is the last `resolve` value, which could be the sequence of `resolve` values, keeping the original order.

```js
flowbee.flow(function(resolve) {
  setTimeout(function() {
    resolve('a');
  }, 1000);
}, function(resolve, value) {
  setTimeout(function() {
    resolve(value + 'b');
  }, 500);
}, function(resolve, value) {
  setTimeout(function() {
    resolve(value + 'c');
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .compose(tasks)

Executes `tasks` in parallel. Each function has a `resolve` function, which consumes the return value of the `resolve` function that follows.

#### resolve(fn)

The `resolve` function has one argument - `fn`.

##### fn(value)

`value` is the return value of the `resolve` that follows.

#### .execute(done)

Starts the execution of `.compose`. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.`
It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `value` is the composition of `resolve` values, keeping the original order.

```js
flowbee.compose(function(resolve) {
  setTimeout(function() {
    resolve(function(value) {
      return value + 'a';
    });
  }, 1000);
}, function(resolve) {
  setTimeout(function() {
    resolve(function(value) {
      return value + 'b';
    });
  }, 500);
}, function(resolve) {
  setTimeout(function() {
    resolve(function() {
      return 'c';
    });
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "cba"
});
```

### .sequence(tasks)

Executes `tasks` in parallel. Each function has a `resolve` function, which consumes the return value of the previous `resolve` function.

#### resolve(fn)

The `resolve` function has one argument - `fn`.

##### fn(value)

`value` is the return value of the previous `resolve` function.

#### .execute(done)

Starts the execution of `.sequence`. `.execute` has a `done` function.

##### done(err, value)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `value`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `value` is the sequence of `resolve` values, keeping the original order.

```js
flowbee.sequence(function(resolve) {
  setTimeout(function() {
    resolve(function() {
      return 'a';
    });
  }, 1000);
}, function(resolve) {
  setTimeout(function() {
    resolve(function(value) {
      return value + 'b';
    });
  }, 500);
}, function(resolve) {
  setTimeout(function() {
    resolve(function(value) {
      return value + 'c';
    });
  }, 1);
}).execute(function(err, value) {
  // err => null
  // value => "abc"
});
```

### .during(tasks)

Executes `tasks` in parallel. Each function has one argument; the first function has `test`, and the last function has `resume`. Once `done`'s `fn` function is executed, `resume` will be executed, until `test` returns `false`.

#### test(fn)

The `test` function has one argument - `fn`.

##### fn(value)

`value` is the return value of `resume`'s `fn` function; `done`'s `fn` function starts the execution, passing the initial value.

#### resume(fn)

The `resume` function has one argument - `fn`.

##### fn(value)

`value` is the return value of the previous `resume`'s `fn` function.

#### .execute(done)

Starts the execution of `.during`. `.execute` has a `done` function.

##### done(err, fn)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `done`'s `fn` function executes `test`'s `fn` function, passing a `value`.

```js
flowbee.during(function(test) {
  setTimeout(function() {
    test(function(value) {
      return value < 100;
    });
  }, 1000);
}, function(resume) {
  setTimeout(function() {
    resume(function(value) {
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

### .until(tasks)

Executes `tasks` in parallel. Each function has one argument; the first function has `test`, and the last function has `resume`. Once `done`'s `fn` function is executed, `resume` will be executed, until `test` returns `true`.

#### test(fn)

The `test` function has one argument - `fn`.

##### fn(value)

`value` is the return value of `resume`'s `fn` function; `done`'s `fn` function starts the execution, passing the initial value.

#### resume(fn)

The `resume` function has one argument - `fn`.

##### fn(value)

`value` is the return value of the previous `resume`'s `fn` function.

#### .execute(done)

Starts the execution of `.until`. `.execute` has a `done` function.

##### done(err, fn)

The `done` function is executed, once all `tasks` have been executed. `done` has two arguments - `err` and `fn`. If a synchronous error is caught, then `err` is the exception object; otherwise, `err` is `null.` It is important to note, if a synchronous error is caught, execution of `tasks` is stopped, and `done` is executed. `done`'s `fn` function executes `test`'s `fn` function, passing a `value`.

```js
flowbee.until(function(test) {
  setTimeout(function() {
    test(function(value) {
      return value > 100;
    });
  }, 1000);
}, function(resume) {
  setTimeout(function() {
    resume(function(value) {
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
