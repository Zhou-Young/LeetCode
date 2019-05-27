/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 法一暴力法，三次for循环
  // 法二 参考两数之和，找到一个之后用索引的方式-----zz还得和答案顺序一致,,怎么排序都不一致啊感觉，，放弃  大约 56ms 不排序44ms
  var result = [];
  // nums = nums.sort((a, b) => a - b);
  for (var i = 0; i < nums.length - 2; i++) {
    var exist = {};
    var res = [nums[i]];
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    for (var j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] == nums[j - 1]) {
        continue;
      }
      if (exist[-nums[i] - nums[j]] !== undefined) {
        if (i > 0 && nums.slice(0, i).indexOf(nums[j]) > -1) {
          continue;
        }
        res.push(exist[-nums[i] - nums[j]]);
        res.push(nums[j]);
        result.push(res.sort((a, b) => a - b));
        res = [nums[i]];
      }
      exist[nums[j]] = nums[j];
    }
  }
  return result.reverse();
  // 法三 排序后找中心值，从两端往里找（先排次序不会更复杂吗？？   检验一下法二和法三   60ms??
  // let res = [];
  // let length = nums.length;
  // nums = nums.sort((a, b) => a - b);
  // if (nums[0] <= 0 && nums[length - 1] >= 0) {
  //   // 优化1: 整个数组同符号，则无解
  //   for (let i = 0; i < length - 2; ) {
  //     if (nums[i] > 0) break; // 优化2: 最左值为正数则一定无解
  //     let first = i + 1;
  //     let last = length - 1;
  //     do {
  //       if (first >= last || nums[i] * nums[last] > 0) break; // 两人选相遇，或者三人同符号，则退出
  //       let result = nums[i] + nums[first] + nums[last];
  //       if (result === 0) {
  //         // 如果可以组队
  //         res.push([nums[i], nums[first], nums[last]]);
  //       }
  //       if (result <= 0) {
  //         // 实力太弱，把菜鸟那边右移一位
  //         while (first < last && nums[first] === nums[++first]) {} // 如果相等就跳过
  //       } else {
  //         // 实力太强，把大神那边右移一位
  //         while (first < last && nums[last] === nums[--last]) {}
  //       }
  //     } while (first < last);
  //     while (nums[i] === nums[++i]) {}
  //   }
  // }
  // return res;

  // var rtn = [];
  // if (nums.length < 3) {
  //   return rtn;
  // }
  // nums = nums.sort(function(a, b) {
  //   return a - b;
  // });
  // for (var i = 0; i < nums.length - 2; i++) {
  //   if (nums[i] > 0) {
  //     return rtn;
  //   }
  //   if (i > 0 && nums[i] == nums[i - 1]) {
  //     continue;
  //   }
  //   for (var j = i + 1, k = nums.length - 1; j < k; ) {
  //     if (nums[i] + nums[j] + nums[k] === 0) {
  //       rtn.push([nums[i], nums[j], nums[k]]);
  //       j++;
  //       k--;
  //       while (j < k && nums[j] == nums[j - 1]) {
  //         j++;
  //       }
  //       while (j < k && nums[k] == nums[k + 1]) {
  //         k--;
  //       }
  //     } else if (nums[i] + nums[j] + nums[k] > 0) {
  //       k--;
  //     } else {
  //       j++;
  //     }
  //   }
  // }
  // return rtn;

  // class Solution:
  //   def threeSum(self, nums: List[int]) -> List[List[int]]:
  //       ans = []

  //       nums.sort()
  //       length = len(nums)
  //       bucket = dict()

  //       for i in range(length):
  //           bucket[nums[i]] = bucket.get(nums[i], 0) + 1

  //       for i in range(length):
  //           if i > 0 and nums[i] == nums[i-1]:
  //               continue

  //           bucket[nums[i]] -= 1

  //           for j in range(i+1, length):
  //               if j > i+1 and nums[j] == nums[j-1]:
  //                   continue

  //               bucket[nums[j]] -= 1

  //               target = -nums[i] - nums[j]
  //               if target >= nums[j] and bucket.get(target, -1) > 0:
  //                   ans.append([nums[i], nums[j], target])

  //               bucket[nums[j]] += 1

  //           bucket[nums[i]] += 1
  //       return ans
};
threeSum([-1, 0, 1, 2, -1, -4]);
