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
        if (this.state == state.PENDING) {
          this.state = state.FULFILLED;
          this.value = value;
          this.fulfilledReactions.map(onFulfilled => {
            this.value = onFulfilled(this.value);
          });
        }
      }, 0);
    };

    let reject = reason => {
      setTimeout(() => {
        if (this.state == state.PENDING) {
          this.state = state.REJECTED;
          this.reason = reason;
          this.rejectReaction.map(onRejected => {
            this.reason = onRejected(reason);
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

    // 若只考虑链式调用
    // this.fulfilledReactions.push(onFulfilled);
    // this.rejectReaction.push(onRejected);
    // return this;

    newPromise = new MPromise((resolve, reject) => {
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
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });

    // then方法必须返回一个promise对象
    return newPromise;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  //
  if (promise2 === x) {
    reject(new TypeError());
  }
  if (x instanceof MPromise) {
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
      x.then(resolve, reject);
    }
  } else {
    resolve(x);
  }
}

//test
new MPromise((resolve, reject) => {
  setTimeout(resolve, 1000, "inside");
})
  .then(data => {
    console.log(data);
    return data;
  })
  .then(2)
  .then(data => console.log(data, "/"))
  .then(data => console.log(data, "/"))
  .then(() => {
    return new MPromise((resolve, reject) => {
      setTimeout(resolve, 1000, "second inside");
    });
  })
  .then(data => console.log(data));

console.log("outside");
