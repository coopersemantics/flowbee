import step from '../lib/step.js';

describe('step', () => {
  it('should create new instances', function() {
    let step1 = step(
      (next) => {
        next('a');
      },
      (next) => {
        next('b');
      },
      (next) => {
        next('c');
      }
    );
    let step2 = step(
      (next) => {
        next('a');
      },
      (next) => {
        next('b');
      },
      (next) => {
        next('c');
      }
    );

    expect(step1).to.not.equal(step2);
    expect(step1.stack).to.have.length(3);
  });

  it('should execute the `next` function, with a synchronous iterator', (done) => {
    let step1 = step(
      (next) => {
        next('a');
      },
      (next) => {
        next('b');
      },
      (next) => {
        next('c');
      }
    );
    let step2 = step(
      (next) => {
        next('a');
      },
      (next) => {
        next('b');
      },
      (next) => {
        next('c');
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

  it('should execute the `next` function, with an asynchronous iterator', (done) => {
    let step1 = step(
      (next) => {
        setTimeout(() => {
          next('a');
        }, 1000);
      },
      (next) => {
        setTimeout(() => {
          next('b');
        }, 500);
      },
      (next) => {
        setTimeout(() => {
          next('c');
        }, 1);
      }
    );
    let step2 = step(
      (next) => {
        setTimeout(() => {
          next('a');
        }, 100);
      },
      (next) => {
        setTimeout(() => {
          next('b');
        }, 10);
      },
      (next) => {
        setTimeout(() => {
          next('c');
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
      (next) => {
        setTimeout(() => {
          next('a');
        }, 1000);
      },
      (next) => {
        foo();
        setTimeout(() => {
          next('b');
        }, 500);
      },
      (next) => {
        setTimeout(() => {
          next('c');
        }, 1);
      }
    );
    let step2 = step(
      (next) => {
        foo();
        setTimeout(() => {
          next('a');
        }, 100);
      },
      (next) => {
        setTimeout(() => {
          next('b');
        }, 10);
      },
      (next) => {
        setTimeout(() => {
          next('c');
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

  it('should stop subsequent execution, if `next` is not executed', function() {
    let values = [];
    let fn = sinon.spy();
    let step1 = step(
      (next) => {
        values.push('a');
      },
      (next) => {
        values.push('b');
      },
      (next) => {
        values.push('c');
      }
    );

    step1.done(fn);
    expect(fn.called).to.be.false;
    expect(values).to.deep.equal(['a']);
  });
});
