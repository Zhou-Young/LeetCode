/**
 * 希尔排序
 * @param {number[]} arr
 * 选定步长的插入排序
 */
let swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};
let shellSort = function(arr) {
  let step = Math.floor(arr.length / 2);
  while (step > 0) {
    for (let i = step; i < arr.length; i = i + step) {
      curIndex = i;
      while (arr[curIndex] < arr[curIndex - step]) {
        swap(arr, curIndex, curIndex - step);
        curIndex--;
      }
    }
    step = Math.floor(step / 2);
  }
  return arr;
};

console.log(shellSort([49, 38, 76, 13, 27, 49, 55, 04]));
