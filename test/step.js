import step from '../lib/step.js';

describe('step', () => {
  it('should create new instances', function() {
    let step1 = step(
      (fn) => {
        fn('a');
      },
      (fn) => {
        fn('b');
      },
      (fn) => {
        fn('c');
      }
    );
    let step2 = step(
      (fn) => {
        fn('a');
      },
      (fn) => {
        fn('b');
      },
      (fn) => {
        fn('c');
      }
    );

    expect(step1).to.not.equal(step2);
    expect(step1.stack).to.have.length(3);
  });

  it('should execute the `fn` function, with a synchronous iterator', (done) => {
    let step1 = step(
      (fn) => {
        fn('a');
      },
      (fn) => {
        fn('b');
      },
      (fn) => {
        fn('c');
      }
    );
    let step2 = step(
      (fn) => {
        fn('a');
      },
      (fn) => {
        fn('b');
      },
      (fn) => {
        fn('c');
      }
    );

    step1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.deep.equal(['a', 'b', 'c']);
    });

    setTimeout(() => {
      step2.done((err, values) => {
        expect(err).to.be.null;
        expect(values).to.deep.equal(['a', 'b', 'c']);
        done();
      });
    }, 1000);
  });

  it('should execute the `fn` function, with an asynchronous iterator', (done) => {
    let step1 = step(
      (fn) => {
        setTimeout(() => {
          fn('a');
        }, 1000);
      },
      (fn) => {
        setTimeout(() => {
          fn('b');
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn('c');
        }, 1);
      }
    );
    let step2 = step(
      (fn) => {
        setTimeout(() => {
          fn('a');
        }, 100);
      },
      (fn) => {
        setTimeout(() => {
          fn('b');
        }, 10);
      },
      (fn) => {
        setTimeout(() => {
          fn('c');
        }, 1);
      }
    );

    step1.done((err, values) => {
      expect(err).to.be.null;
      expect(values).to.deep.equal(['a', 'b', 'c']);
    });

    setTimeout(() => {
      step2.done((err, values) => {
        expect(err).to.be.null;
        expect(values).to.deep.equal(['a', 'b', 'c']);
        done();
      });
    }, 1000);
  });

  it('should stop subsequent execution, if a synchronous error is caught', (done) => {
    let step1 = step(
      (fn) => {
        setTimeout(() => {
          fn('a');
        }, 1000);
      },
      (fn) => {
        foo();
        setTimeout(() => {
          fn('b');
        }, 500);
      },
      (fn) => {
        setTimeout(() => {
          fn('c');
        }, 1);
      }
    );
    let step2 = step(
      (fn) => {
        foo();
        setTimeout(() => {
          fn('a');
        }, 100);
      },
      (fn) => {
        setTimeout(() => {
          fn('b');
        }, 10);
      },
      (fn) => {
        setTimeout(() => {
          fn('c');
        }, 1);
      }
    );

    step1.done((err, values) => {
      expect(typeof err.message).to.equal('string');
      expect(values).to.be.undefined;
    });

    setTimeout(() => {
      step2.done((err, values) => {
        expect(typeof err.message).to.equal('string');
        expect(values).to.be.undefined;
        done();
      });
    }, 1000);
  });

  it('should stop subsequent execution, if `fn` is not executed', function() {
    let values = [];
    let fn = sinon.spy();
    let step1 = step(
      (fn) => {
        values.push('a');
      },
      (fn) => {
        values.push('b');
      },
      (fn) => {
        values.push('c');
      }
    );

    step1.done(fn);
    expect(fn.called).to.be.false;
    expect(values).to.deep.equal(['a']);
  });
});
