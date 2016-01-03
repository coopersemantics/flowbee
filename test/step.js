import step from '../lib/step.js';

describe('step', () => {
  it('should create new instances', function() {
    let step1 = step(
      (next) => {
        next(1);
      },
      (next) => {
        next(2);
      },
      (next) => {
        next(3);
      }
    );
    let step2 = step(
      (next) => {
        next(1);
      },
      (next) => {
        next(2);
      },
      (next) => {
        next(3);
      }
    );

    expect(step1).to.not.equal(step2);
    expect(step1.stack).to.have.length(3);
  });

  describe('next', () => {
    it('should execute the `next` function, with a synchronous iterator', (done) => {
      let step1 = step(
        (next) => {
          next(1);
        },
        (next) => {
          next(2);
        },
        (next) => {
          next(3);
        }
      );
      let step2 = step(
        (next) => {
          next(1);
        },
        (next) => {
          next(2);
        },
        (next) => {
          next(3);
        }
      );

      step1.done((err, values) => {
        expect(err).to.be.null;
        expect(values).to.deep.equal([1, 2, 3]);
      });

      setTimeout(() => {
        step2.done((err, values) => {
          expect(err).to.be.null;
          expect(values).to.deep.equal([1, 2, 3]);
          done();
        });
      }, 1000);
    });

    it('should execute the `next` function, with an asynchronous iterator', (done) => {
      let step1 = step(
        (next) => {
          setTimeout(() => {
            next(1);
          }, 1000);
        },
        (next) => {
          setTimeout(() => {
            next(2);
          }, 500);
        },
        (next) => {
          setTimeout(() => {
            next(3);
          }, 1);
        }
      );
      let step2 = step(
        (next) => {
          setTimeout(() => {
            next(1);
          }, 100);
        },
        (next) => {
          setTimeout(() => {
            next(2);
          }, 10);
        },
        (next) => {
          setTimeout(() => {
            next(3);
          }, 1);
        }
      );

      step1.done((err, values) => {
        expect(err).to.be.null;
        expect(values).to.deep.equal([1, 2, 3]);
      });

      setTimeout(() => {
        step2.done((err, values) => {
          expect(err).to.be.null;
          expect(values).to.deep.equal([1, 2, 3]);
          done();
        });
      }, 1000);
    });

    it('should stop subsequent execution, if a synchronous error is caught', (done) => {
      let step1 = step(
        (next) => {
          setTimeout(() => {
            next(1);
          }, 1000);
        },
        (next) => {
          foo();
          setTimeout(() => {
            next(2);
          }, 500);
        },
        (next) => {
          setTimeout(() => {
            next(3);
          }, 1);
        }
      );
      let step2 = step(
        (next) => {
          foo();
          setTimeout(() => {
            next(1);
          }, 100);
        },
        (next) => {
          setTimeout(() => {
            next(2);
          }, 10);
        },
        (next) => {
          setTimeout(() => {
            next(3);
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
  });
});
