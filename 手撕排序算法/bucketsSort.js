/**
 * 桶排
 * @param {number[], number} arr
 */
let bucketsSort = function(array, num) {
  let max = Math.max.apply(0, array)
  let min = Math.min.apply(0, array)
  let capacity = (max - min + 1) / num // 桶的容量
  let buckets = new Array(num)
  for (let i = 0; i < array.length; i++) {
    let index = Math.floor((array[i] - min) / capacity)
    let bucket = buckets[index]
    if (!bucket) {
      buckets[index] = [array[i]]
    } else {
      if (array[i] > bucket[bucket.length - 1]) {
        bucket.push(array[i])
      } else {
        for (let j = 0; j < bucket.length; j++) {
          if (array[i] < bucket[j]) {
            for (let n = bucket.length; n > j; n--) {
              bucket[n] = bucket[n - 1]
            }
            bucket[j] = array[i]
            break
          }
        }
      }
    }
  }
  let res = []
  for (let i = 0; i < buckets.length; i++) {
    res = res.concat(buckets[i])
  }
  return res
}
console.log(bucketsSort([1, 4, 2, 6, 0, -1, 1.1], 4))
