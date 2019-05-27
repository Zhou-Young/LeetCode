/**
 * 冒泡排序
 * @param {number[]} arr
 * 不断遍历整个数组，将当前数与后一个数比较大小，若当前数比后一个数大就交换位置
 */

let bubbleSort = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      let temp = 0;
      let cur = arr[j];
      let next = arr[j + 1];
      if (cur > next) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

console.log(bubbleSort([1, 2, 2, 1, 6, 1, 3, 4, 2, 2, 1]));

let swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

/**
 * 双向冒泡排序
 * @param {number[]} arr
 * 解决乌龟问题（大数上升快，小数上升慢）：[2,3,4,5,6,1]
 * 双向排序 + 标志位判断是否有序
 */
let bidirectionalBubbleSort = function(arr) {
  let left = 0,
    right = arr.length - 1,
    iswap = true;
  while (left < right && iswap == true) {
    iswap = false;
    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        iswap = true;
      }
    }
    left++;
    if (left == right || iswap == false) break;
    iswap = false;
    for (let i = right; i > left; i--) {
      if (arr[i] < arr[i - 1]) {
        swap(arr, i, i - 1);
        iswap = true;
      }
    }
    right--;
  }
  return arr;
};
console.log(bidirectionalBubbleSort([6, 1, 2, 3, 4, 5]));
