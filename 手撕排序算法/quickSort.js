/**
 * 快排
 * @param {number[]} arr
 * 找一个基准，将比基准小的放在基准左边，比基准大的放在基准右边
 * 重复上述步骤
 */
let swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

this.quickSort = function(arr) {
  quick0(arr, 0, arr.length);
  return arr;
};

let quick0 = function(arr, left, right) {
  if (right - left <= 1) return;
  let base = arr[left];
  let index = left;

  for (let i = left + 1; i < right; i++) {
    if (arr[i] < base) {
      swap(arr, i, ++index);
    }
  }
  swap(arr, left, index);
  quick0(arr, left, index);
  quick0(arr, index + 1, right);
};
console.log(this.quickSort([11, 2, 9, 0, 6, 7, 3]));

let quick = function(arr) {
  if (arr.length <= 1) return arr;
  let base = arr[0];
  let index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < base) {
      swap(arr, i, ++index);
    }
  }

  let left = [],
    right = [];
  left = quick(arr.slice(1, index + 1));
  right = quick(arr.slice(index + 1, arr.length));
  return left.concat(arr[0]).concat(right);
};

console.log(quick([11, 2, 9, 0, 6, 7, 3]));

let quick1 = function(arr) {
  if (arr.length <= 1) return arr;
  let base = arr[0];
  let left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick1(left)
    .concat(base)
    .concat(quick1(right));
};
console.log(quick1([11, 2, 9, 0, 6, 7, 3]));
