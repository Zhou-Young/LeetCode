/**
 * 选择排序 —— 不稳定
 * @param {number[]} arr
 */
let selectionSort = function(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i != minIndex) {
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
};
console.log(selectionSort([11, 2, 9, 0, 6, 7, 3, 4, 5, 2, 1]));
