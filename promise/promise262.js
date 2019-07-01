/**
 * Promise
 */

/**
 * 判断是否是函数
 * @param {function} executor
 */
function isFuc(executor) {
  return typeof executor === 'function'
}

/**
 * 判断变量是否是promise
 * @param {*} x
 */
function isPromise(x) {
  return typeof x === 'object' && x.promiseState !== undefined
}

/**
 * 两种特殊的处理函数
 */
const handlerType = {
  IDENTITY: 'Identity',
  THROUER: 'Thrower',
}

/**
 * promise的三种状态
 */
const state = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

class ZYPromise {
  constructor(executor) {
    // 判断executor是否是一个函数，若不是则抛出类型错误
    if (!isFuc(executor)) {
      return new TypeError()
    }
    this.promiseState = state.PENDING // 默认状态
    this.promiseResult = undefined
    this.promiseRejectReactions = [] //rejected回调 主要来自于Promise.prototype.then
    this.promiseFulfillReactions = [] //resolved回调 then是莲师调用，所以用数组存

    //获取传入excutor中的resolved和rejected方法
    let resolvingFunctions = createResolvingFunctions(this)
    //new promise 会立即执行excutor
    try {
      executor.call(this, resolvingFunctions.resolve, resolvingFunctions.reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    let promise = this
    //如果this指向的不是promise则报错
    if (!isPromise(promise)) {
      return new TypeError()
    }
    //获取promise的constructot以保证调用子类的构造函数
    let C = promise.constructor
    //将构造函数传入，返回capability对象，相当于实例化和resolve，reject函数绑定
    let resultCapability = newPromiseCapability(C)

    return performPromiseThen(promise, onFulfilled, onRejected, resultCapability)
  }
}

function createResolvingFunctions(promise) {
  // 标识对象是否已经resolved
  let alreadyResolved = {
    value: false,
  }
  /**
   * 创建resolved方法
   * @param {function} resolution
   */
  let resolve = function(resolution) {
    resolve.promise = promise
    resolve.alreadyResolved = alreadyResolved
    // 避免重复调用
    if (alreadyResolved.value) {
      return undefined
    }
    //将promise标记为resolved
    alreadyResolved.value = true

    //禁止在resolve时传入原本的promise，不然就会形成环，这时直接reject报错
    if (resolution === promise) {
      let selfResolutionError = new TypeError()
      return rejectPromise(promise, selfResolutionError)
    }

    //如果是普通的值则直接fulfill
    if (typeof resolution !== 'object') {
      return fulfillPromise(promise, resolution)
    }

    //如果传入的是个对象，则获取其then方法
    let then = resolution.then
    //若then方法不存在或者不是函数 则fullfill
    if (!isFuc(then)) {
      return fulfillPromise(promise, resolution)
    }
    //否则把then方法的函数都加入事件
    enqueueJob(promiseResolveThenableJob, ...[promise, resolution, then])
  }
  /**
   * 创建reject方法
   * @param {function} reason
   */
  let reject = function(reason) {
    reject.promise = promise
    reject.alreadyResolved = alreadyResolved
    if (alreadyResolved) {
      return undefined
    }
    alreadyResolved.value = true
    return rejectPromise(promise.reason)
  }

  return {
    resolve,
    reject,
  }
}

/**
 * 用给定值fulfill一个promise
 */
function fulfillPromise(promise, value) {
  let reaction = promise.promiseFulfillReactions
  promise.promiseState = state.FULFILLED
  promise.promiseResult = value
  //清空任务队列
  promise.promiseRejectReactions = undefined
  promise.promiseFulfillReactions = undefined

  return triggerPromiseReactions(reaction, value)
}

/**
 * 用给定原因 reject一个promise
 */
function rejectPromise(promise, reason) {
  let reaction = promise.promiseRejectReactions //所有待处理的reject事件
  promise.promiseRejectReactions = undefined
  promise.promiseFulfillReactions = undefined
  promise.promiseResult = reason
  promise.promiseState = state.REJECTED

  return triggerPromiseReactions(reaction, reason)
}

/**
 * 事件队列
 * @param {function} job
 * @param  {...any} argumentArr
 */
function enqueueJob(job, ...argumentArr) {
  setTimeout(job, 0, ...argumentArr)
}

/**
 * 将待处理事件加入队列
 *
 */
function triggerPromiseReactions(reactions, argument) {
  for (let reaction of reactions) {
    enqueueJob(promiseReactionJob, ...[reaction, argument])
  }
}

/**
 * 用传入的argument对promise进行fulfill或reject
 * @param {*} reaction
 * @param {*} argument
 */
function promiseReactionJob(reaction, argument) {
  let promiseCapability = reaction.capabilities
  let handler = reaction.handler

  let handlerResult = undefined

  try {
    if (handler === handlerType.IDENTITY) {
      handlerResult = argument
    } else if (handler === handlerType.THROUER) {
      throw argument
    } else {
      handlerResult = handler.call(undefined, argument)
    }
  } catch (err) {
    return promiseCapability.reject.call(undefined, err)
  }

  return promiseCapability.resolve.call(undefined, handlerResult)
}

/**
 * 接受一个还未被resolve的promise，进行一步处理
 * @param {*} promiseToResolve
 * @param {*} thenable
 * @param {*} then
 */
function promiseResolveThenableJob(promiseToResolve, thenable, then) {
  //重新给promise绑定resolve和reject方法，因为传递进来的promise一定没有被resolve
  let resolvingFunctions = createResolvingFunctions(promiseToResolve)
  //完成handler内部返回promise后的传递核心逻辑，将外部promise的resolvereject方法传入then函数中
  let thenCallResult = undefined
  try {
    thenCallResult = then.call(thenable, ...[resolvingFunctions.resolve, resolvingFunctions.reject])
  } catch (err) {
    return resolvingFunctions.reject.call(undefined, ...[err])
  }
}

function performPromiseThen(promise, onFulfilled, onRejected, resultCapability) {
  if (!isFuc(onFulfilled)) {
    onFulfilled = handlerType.IDENTITY
  }
  if (!isFuc(onRejected)) {
    onRejected = handlerType.THROUER
  }
  //创建可被promiseReactionJob处理的行为对象
  let fulfillReaction = {
    capabilities: resultCapability,
    handler: onFulfilled,
  }
  let rejectReaction = {
    capabilities: resultCapability,
    handler: onRejected,
  }
  //根据promise状态，将其行为加入相应队列
  switch (promise.promiseState) {
    case state.PENDING:
      promise.promiseFulfillReactions.push(fulfillReaction)
      promise.promiseRejectReactions.push(rejectReaction)
      break
    case state.FULFILLED:
      let value = promise.promiseResult
      enqueueJob(promiseReactionJob, ...[fulfillReaction, value])
      break
    case state.FULFILLED:
      let reason = promise.promiseResult
      enqueueJob(promiseReactionJob, ...[rejectReaction, reason])
      break
  }
  return resultCapability.promise
}

/**
 * 据传入的构造函数构造新的 promsie 并获取到在构造函数中绑定的 resolve，reject 方法
 * @param {*} C
 */
function newPromiseCapability(C) {
  if (!isFuc(C)) {
    throw new TypeError()
  }

  let promiseCapability = {
    promise: undefined,
    resolve: undefined,
    reject: undefined,
  }
  // 创建传入构造函数中的函数，目的是获取 resolve 和 reject 方法
  let executor = function(resolve, reject) {
    let promiseCapability = executor.capability

    if (promiseCapability.resolve !== undefined || promiseCapability.reject !== undefined) {
      throw new TypeError()
    }
    promiseCapability.resolve = resolve
    promiseCapability.reject = reject
  }
  //创建引用
  executor.capability = promiseCapability

  let promise = new C(executor)

  if (!isFuc(promiseCapability.resolve) || !isFuc(promiseCapability.reject)) {
    throw new TypeError()
  }

  promiseCapability.promise = promise
  return promiseCapability
}

//test
new ZYPromise((resolve, reject) => {
  setTimeout(resolve, 1000, 'inside')
})
  .then(data => console.log(data))
  .then(data => console.log(data))
  .then(() => {
    return new ZYPromise((resolve, reject) => {
      setTimeout(resolve, 1000, 'second inside')
    })
  })
  .then(data => console.log(data))

console.log('outside')

// new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, 'inside')
// })
//   .then(data => {
//     console.log(data, '?')
//     return 'abc'
//   })
//   .then(data => console.log(data, '/'))
//   .then(() => {
//     return new Promise((resolve, reject) => {
//       setTimeout(resolve, 1000, 'second inside')
//     })
//   })
//   .then(data => console.log(data, '['))

// console.log('outside')

// var p1 = new ZYPromise(function(resolve, reject) {
//   resolve('p1')
// })

// var p2 = new ZYPromise(function(resolve, reject) {
//   resolve('p2')
// })

// p1.then(() => {
//   console.log('p11')
// }).then(() => {
//   console.log('p12')
// })

// p2.then(() => {
//   console.log('p21')
// }).then(() => {
//   console.log('p22')
// })
