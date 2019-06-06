/**
 * 堆排序
 * 先将初始的R[0…n-1]建立成最大堆，此时是无序堆，而堆顶是最大元素。
 * 再将堆顶R[0]和无序区的最后一个记录R[n-1]交换
 * 将当前无序区R[1..n-1]调整为堆。然后再次将R[1..n-1]中关键字最大的记录R[1]和该区间的最后一个记录R[n-1]交换
 * 直到无序区只有一个元素为止。
 * @param {number[]} arr
 */
let heapSort = function(arr) {
  buildMaxHeap(arr); //arr[0]此时顶部为最大值
  heapSize = arr.length;
  while (heapSize > 1) {
    heapSize--;
    // 将最大值放到最后一位
    swap(arr, 0, heapSize);
    // 对前面几位继续寻找最大堆，此时除第一位外其他都是有序的，故可以直接heapify
    heapify(arr, heapSize, 0);
  }
  return arr;
};

/**
 *
 * @param {number[]} arr
 * @param {number} heapSize 数组长度
 * @param {number} i
 */
let heapify = function(arr, heapSize, i) {
  var left = i * 2 + 1,
    right = i * 2 + 2,
    larger = i;
  // 判断左右孩子谁大
  if (left < heapSize && arr[left] > arr[larger]) {
    larger = left;
  }
  if (right < heapSize && arr[right] > arr[larger]) {
    larger = right;
  }
  // 如果最大的不是父亲，则交换
  if (larger !== i) {
    swap(arr, i, larger);
    // 交换后要保证子孩子的那个堆依然满足最大堆，所以需要递归一下
    heapify(arr, heapSize, larger);
  }
};

let buildMaxHeap = function(arr) {
  //从最后一个点所在的堆开始构建最大堆
  // 让每个堆的父节点都大于左右子节点
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
};

let swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

console.log(heapSort([11, 2, 9, 0, 6, 7, 3, 4, 5, 2, 1]));
