/**
 * 插入排序 —— 稳定
 * @param {number[]} arr
 * 判断当前数字在前面那些数字中的位置，插入合适的位置。
 * 当前数字之前的数字都是有序的。类似于斗地主整理牌一样。
 */

let swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

let insertionSort = function(arr) {
  for (let i = 1; i < arr.length; i++) {
    curIndex = i;
    while (arr[curIndex] < arr[curIndex - 1]) {
      swap(arr, curIndex, curIndex - 1);
      curIndex--;
    }
    // temp = arr[i];
    // while (temp < arr[curIndex - 1]) {
    //   arr[curIndex] = arr[curIndex - 1];
    //   curIndex--;
    // }
    // arr[curIndex] = temp;
  }
  return arr;
};
// console.log(insertionSort([11, 2, 9, 0, 6, 7, 3, 4, 5, 2, 1]));

/**
 * 二分插入排序
 * @param {number[]} arr
 * 前面序列是有序的，故可以通过二分查找进行优化
 */
let twoPointsInsertionSort = function(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let firstIndex = 0;
    let lastIndex = i - 1;
    while (firstIndex <= lastIndex) {
      let midIndex = Math.round((firstIndex + lastIndex) / 2);
      if (temp < arr[midIndex]) {
        lastIndex = midIndex - 1;
      } else {
        firstIndex = midIndex + 1;
      }
    }
    for (let j = i; j > lastIndex + 1; j--) {
      arr[j] = arr[j - 1];
    }
    arr[lastIndex + 1] = temp;
  }
  return arr;
};
console.log(twoPointsInsertionSort([11, 2, 9, 0, 6, 7, 3, 4, 5, 2, 1]));
