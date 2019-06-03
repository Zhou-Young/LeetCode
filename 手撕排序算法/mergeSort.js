/**
 * 归并排序
 * @param {number[]} arr
 * 归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，
 * 直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 * 由于是分治法，归并排序是递归的。复杂度是O（nlogn）。
 */
let mergeSort = function(arr) {
  if (arr.length == 1) return arr;
  let mid = Math.ceil(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, arr.length);
  return merge(mergeSort(left), mergeSort(right));
};

// 两个有序数组合并成一个有序数组
let merge = function(left, right) {
  let result = new Array();
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  result = result.concat(left.length == 0 ? right : left);
  return result;
};
console.log(mergeSort([11, 2, 9, 0, 6, 7, 3]));

// 基于循环的归并排序 ---- 二路归并
let mergeSort2 = function(arr) {
  for (let size = 1; size < arr.length; size = size * 2) {
    for (let i = 0; i < arr.length; i = i + size + size) {
      merge(arr.slice(i, i + sizesize), arr.slice(i + size, i + size + size)); // slice是创建新数组，不能改变原数组，得传索引
    }
  }
};
console.log(mergeSort([11, 2, 9, 0, 6, 7, 3]));
