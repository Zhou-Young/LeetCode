//https://github.com/mqyqingfeng/Blog/issues/11
let foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

// 第三版
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};

bar.call2(foo); // 1
