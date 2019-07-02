//co
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === "function") gen = gen.call(ctx);
    if (!gen || typeof gen.next !== "function") return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
          "You may only yield a function, promise, generator, array, or object, " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}

// async
function spaw(genf) {
  return new Promise(function(resolve, reject) {
    let gen = genf();
    function step(nextf) {
      try {
        let next = nextf();
      } catch (e) {
        reject;
      }
      if (next.done) {
        return resolve;
      }
      Promise.resolve(next).then(v => {
        step(function() {
          return gen.next(next);
        });
      });
    }
    step(function() {
      getSelection.next();
    });
  });
}
