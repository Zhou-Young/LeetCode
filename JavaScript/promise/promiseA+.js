const state = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REEJECT: "reject"
};

/**
 * 判断是否是函数
 * @param {function} executor
 */
function isFunc(executor) {
  return typeof executor === "function";
}

class MPromise {
  constructor(excutor) {
    this.state = state.PENDING;
    this.value = undefined;
    this.reson = undefined;
    this.fulfilledReactions = [];
    this.rejectReaction = [];

    let resolve = value => {
      setTimeout(() => {
        // 只接受第一次resolve
        // 状态只能由pending变为其他，变换后不能再次变换
        if (this.state == state.PENDING) {
          this.state = state.FULFILLED;
          this.value = value;
          this.fulfilledReactions.map(cb => {
            this.value = cb(this.value);
          });
        }
      }, 0);
    };

    let reject = reason => {
      setTimeout(() => {
        if (this.state == state.PENDING) {
          this.state = state.REJECTED;
          this.reason = reason;
          this.rejectReaction.map(cb => {
            this.reason = cb(this.reason);
          });
        }
      });
    };

    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    let newPromise;
    // 如果onfulfilled不是函数且promise1成功执行，promise2必须成功执行并返回相同值
    onFulfilled = isFunc(onFulfilled) ? onFulfilled : value => value;
    onRejected = isFunc(onRejected)
      ? onRejected
      : reason => {
          throw reason;
        };

    newPromise = new MPromise((resolve, reject) => {
      // 若 p = Promise；p.then（）此时state为fulfilled  若直接push resolve时状态不为pending不会执行
      // 若不push，每次都直接执行，那么值无法传递
      switch (this.state) {
        case state.PENDING:
          this.fulfilledReactions.push(value => {
            try {
              let x = onFulfilled(value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          this.rejectReaction.push(reason => {
            try {
              let x = onRejected(value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
        case state.FULFILLED:
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
        case state.REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
      }
    });

    // then方法必须返回一个promise对象
    return newPromise;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  //
  if (promise2 === x) {
    reject(new TypeError());
  } else if (x instanceof MPromise) {
    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    // 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    if ((x.state = state.PENDING)) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      // 如果 x 处于执行态，用相同的值执行 promise
      // 如果 x 处于拒绝态，用相同的据因拒绝 promise
      x.then(resolve, reject);
    }
  } else if (x && typeof x === "object") {
    // 避免多次调用
    let called = false;
    try {
      let then = x.then;
      if (isFunc(then)) {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

//test
// let p = new MPromise((resolve, reject) => {
//   resolve("first");
//   setTimeout(resolve, 1000, "inside");
// });
// setTimeout(() => {
//   p.then(data => {
//     console.log(data);
//     return data;
//   })
//     .then(data => console.log(data, "/"))
//     .then(() => {
//       return new MPromise((resolve, reject) => {
//         // resolve("second");
//         setTimeout(resolve, 1000, "second inside");
//       });
//     })
//     .then(data => console.log(data));
// }, 1000);

// console.log("outside");

// new MPromise((resolve, reject) => {
//   setTimeout(resolve, 1000, "inside");
// })
//   .then(data => {
//     console.log(data);
//     return data;
//   })
//   .then(2)
//   .then(data => console.log(data, "/"))
//   .then(data => console.log(data, "/"))
//   .then(() => {
//     return new MPromise((resolve, reject) => {
//       setTimeout(resolve, 1000, "second inside");
//     });
//   })
//   .then(data => console.log(data));

// console.log("outside");

// var p1 = new MPromise(function(resolve, reject) {
//   resolve("p1");
// });

// var p2 = new MPromise(function(resolve, reject) {
//   resolve("p2");
// });

// p1.then(() => {
//   console.log("p11");
// }).then(() => {
//   console.log("p12");
// });

// p2.then(() => {
//   console.log("p21");
// }).then(() => {
//   console.log("p22");
// });

let doSomethingElse = function() {
  return new MPromise((resolve, reject) => {
    console.log("start");
    setTimeout(() => {
      resolve("doSomethingElse");
    }, 100);
  }).then(data => console.log(data));
};

let doSomething = function() {
  return new MPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("doSomething");
    }, 1000);
  });
};

let finalHandler = function(data) {
  // return new MPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("finalHandler");
  //   }, 1000);
  // }).then(data => console.log(data));
  console.log(data);
};

doSomething()
  .then(doSomethingElse)
  .then(finalHandler);
