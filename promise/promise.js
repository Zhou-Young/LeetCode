/**
 * Promise
 */

/**
 * 判断是否是函数
 * @param {function} executor
 */
function isFuc(executor) {
  return typeof executor === "function";
}

/**
 * 判断变量是否是promise
 * @param {*} x
 */
function isPromise(x) {
  return typeof x === "object" && x.promiseState !== undefined;
}

const handlerType = {
  IDENTITY: "Identity",
  THROUER: "Thrower"
};

const state = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
};

class ZYPromise {
  constructor(executor) {
    // 判断executor是否是一个函数，若不是则抛出类型错误
    if (!isFuc(executor)) {
      return new TypeError();
    }
    this.promiseState = state.PENDING; // 默认状态
    this.promiseResult = undefined;
    this.promiseRejectReactions = []; //rejected回调 主要来自于Promise.prototype.then
    this.promiseFulfillReactions = []; //resolved回调 then是莲师调用，所以用数组存

    //获取传入excutor中的resolved和rejected方法
    let resolvingFunctions = createResolvingFunctions(this);
    //new promise 会立即执行excutor
    try {
      executor.call(
        this,
        resolvingFunctions.resolve,
        resolvingFunctions.reject
      );
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {}
}

function createResolvingFunctions(promise) {
  // 标识对象是否已经resolved
  let alreadyResolved = {
    value: false
  };
  /**
   * 创建resolved方法
   * @param {function} value
   */
  let resolve = function(value) {
    resolve.promise = promise;
    resolve.alreadyResolved = alreadyResolved;
    if (promise.state == state.FULFILLED) {
    }
    // 避免重复调用
    if (alreadyResolved.value) {
      return undefined;
    }
    //将promise标记为resolved
    alreadyResolved.value = true;
    //禁止在resolve时传入原本的promise，不然就会形成环，这时直接reject报错
    if (value === promise) {
      let selfResolutionError = new TypeError();
      return rejectPromise(promise, selfResolutionError);
    }
  };
  /**
   * 创建reject方法
   * @param {function} reason
   */
  let reject = function(reason) {};
}

/**
 * 用给定值fulfill一个promise
 */
function resolvePromise(promise, value) {}

/**
 * 用给定原因 reject一个promise
 */
function rejectPromise(promise, reason) {
  let reaction = promise.promiseRejectReactions; //所有待处理的reject事件
  promise.promiseRejectReactions = undefined;
  promise.promiseFulfillReactions = undefined;
  promise.promiseResult = reason;
  promise.promiseState = status.REJECTED;

  triggerPromiseReactions(reaction, reason);
}

/**
 * 事件队列
 * @param {function} job
 * @param  {...any} argumentArr
 */
function enqueueJob(job, ...argumentArr) {
  setTimeout(job, 0, ...argumentArr);
}

/**
 * 将待处理事件加入队列
 *
 */
function triggerPromiseReactions(reactions, argument) {
  for (let reaction of reactions) {
    enqueueJob(promiseReactionJob, ...[reaction, argument]);
  }
}

/**
 * 用传入的argument对promise进行fulfill或reject
 * @param {*} reaction
 * @param {*} argument
 */
function promiseFulfillReactions(reaction, argument) {}
