/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 法一：遍历两次
  // 法二：将值存做索引
  let res = [];
  let exist = {};
  for (let i = 0; i < nums.length; i++) {
    if (exist[target - nums[i]] !== undefined) {
      res.push(exist[target - nums[i]]);
      res.push(i);
    }
    exist[nums[i]] = i;
  }

  return res;
};
