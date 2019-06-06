/**
 * 基数排序
 * @param {number[]} arr
 */
let radixSort = function(arr) {
  let max = Math.max.apply(null, arr);
  //判断位数
  let times = getLoopTimes(max);

  let radix = 0;
  while (times > 0) {
    times--;
    // 比较
    arr = putInBuckets(arr, radix);
    radix = radix + 1;
  }
  return arr;
};

function getLoopTimes(number) {
  let times = 1;
  while (Math.floor(number / 10) > 0) {
    times++;
    number = Math.floor(number / 10);
  }
  return times;
}

function putInBuckets(arr, radix) {
  let buckets = [];
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor((arr[i] / Math.pow(10, radix)) % 10);
    if (!buckets[index]) {
      buckets[index] = [arr[i]];
    } else {
      buckets[index].push(arr[i]);
    }
  }
  let res = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != undefined) {
      res = res.concat(buckets[i]);
    }
  }
  return res;
}

var arr = [278, 109, 63, 930, 589, 184, 505, 269, 8, 83];
console.log(radixSort(arr));
