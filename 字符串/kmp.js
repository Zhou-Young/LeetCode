/**
 * KMP 子字符串查找
 * @param {string} text
 * @param {string} pattern
 */
let dfa = function(pattern) {
  let length = pattern.length;
  let mode = new Array(length).fill(0); // 生成一个长度为pattern的空数组，并初始化值为0
  let i = 0;
  for (let j = 1; j < length; j++) {
    // 判断新的值是否和上次匹配的最长相同前后缀后面的值是否相同
    while (i > 0 && pattern[i] !== pattern[j]) {
      i = mode[i - 1];
    }
    // 经过第一部分的过滤之后，比较新值跟pattern[i]
    if (pattern[i] === pattern[j]) {
      i++;
    } else {
      i = 0;
    }
    // 把得到的匹配值赋予匹配数组中
    mode[j] = i;
  }
  return mode;
};

let KMP = function(text, pattern) {
  let mode = dfa(pattern);
  let length = pattern.length;
  for (let i = 0, j = 0; i < text.length; i++) {
    if (j === length - 1) {
      return i - length + 1;
    }
    if (text[i] == pattern[j]) {
      j++;
    } else if (j == 0) {
    } else {
      j = mode[j - 1];
      i--;
    }
  }
  return -1;
};

console.log(KMP("BCBAABACAABABACAA", "ABABAC"));
