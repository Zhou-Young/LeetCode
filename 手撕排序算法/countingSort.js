/**
 * 计数排序
 * @param {number[]} arr
 */
let countingSort0 = function(arr) {
  let count = {}
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i]] == undefined) {
      count[arr[i]] = 1
    } else {
      count[arr[i]] += 1
    }
  }
  let res = []
  Object.keys(count).forEach(key => {
    key = Number(key)
    while (count[key] > 0) {
      res.push(key)
      count[key]--
    }
  })
  return res
}

console.log(countingSort0([5, 2, 3, -1, 0, 2]))

let countingSort = function(arr) {
  let min = arr[0],
    max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = [arr[i]]
    } else if (arr[i] < min) {
      min = arr[i]
    }
  }
  let buckets = new Array(max - min + 1).fill(0)
  for (let i = 0; i < arr.length; i++) {
    buckets[arr[i] - min]++
  }
  let res = []
  buckets.forEach((v, i) => {
    while (v > 0) {
      res.push(i + min)
      v--
    }
  })
  return res
}

console.log(countingSort([5, 2, 3, -1, 0, 2]))
