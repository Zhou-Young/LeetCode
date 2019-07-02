/**
 * 柯里化
 * @param {*} fn
 * @param  {...any} args
 */
// function curry(fn, ...args) {
//   const length = fn.length;
//   let lists = args || [];
//   let listLen;
//   return function() {
//     lists = [...lists, ...Array.from(arguments)];
//     listLen = lists.length;
//     if (listLen < length) {
//       const _lists = lists;
//       lists = [];
//       return curry(fn, ..._lists);
//     } else if (listLen === length) {
//       const _lists = lists;
//       lists = [];
//       return fn.apply(this, _lists);
//     }
//   };
// }

var curry = function(func, ...args) {
  var length = func.length;
  args = args || [];

  return function() {
    let newArgs = args.concat(Array.from(arguments));
    if (newArgs.length < length) {
      return curry.call(this, func, ...newArgs);
    } else {
      return func.apply(null, newArgs);
    }
  };
};

var add = (a, b, c) => {
  return a + b + c;
};
console.log(add(1, 2, 3)); // 6

var curryAdd = curry(add);
// 以下输出结果都相同
// console.log(curryAdd(1, 2, 3)); // 6
console.log(curryAdd(1)(2, 3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1)(2)(3)); // 6

function addNew() {
  var args = [].slice.call(arguments);
  var fn = function() {
    var newArgs = args.concat([].slice.call(arguments));
    return addNew.apply(null, newArgs);
  };
  fn.toString = function() {
    return args.reduce(function(a, b) {
      return a + b;
    });
  };
  return fn;
}

console.log(addNew(1)(2)(3)(4)(5).toString());
