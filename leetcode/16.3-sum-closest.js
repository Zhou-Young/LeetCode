/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 *
 * https://leetcode.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (45.14%)
 * Likes:    1050
 * Dislikes: 81
 * Total Accepted:    336.8K
 * Total Submissions: 746.1K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * Given an array nums of n integers and an integer target, find three integers
 * in nums such that the sum is closest to target. Return the sum of the three
 * integers. You may assume that each input would have exactly one solution.
 *
 * Example:
 *
 *
 * Given array nums = [-1, 2, 1, -4], and target = 1.
 *
 * The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 *
 *
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  const MAX_VALUE = 2147483647;
  if (nums.length < 3) return 0;
  nums.sort((a, b) => a - b);
  let len = nums.length,
    minDiff = MAX_VALUE,
    complement,
    p1,
    p2,
    curSum,
    result;

  for (let i = 0; i < len; i++) {
    complement = target - nums[i];
    p1 = i + 1;
    p2 = len - 1;
    while (p1 < p2) {
      curSum = nums[p1] + nums[p2];
      if (minDiff > Math.abs(curSum - complement)) {
        minDiff = Math.abs(curSum - complement);
        result = curSum + nums[i];
      }
      if (minDiff == 0) break; //找到最接近的值了
      if (curSum > complement) {
        p2--;
      } else {
        p1++;
      }
    }
    while (nums[i + 1] === nums[i]) {
      // 避免重复计算
      i++;
    }
  }
  return result;
};
threeSumClosest([-1, 2, 1, -4], 1);
