/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 *
 * https://leetcode.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (41.84%)
 * Total Accepted:    274.7K
 * Total Submissions: 645.4K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * Given n non-negative integers representing an elevation map where the width
 * of each bar is 1, compute how much water it is able to trap after raining.
 * 
 * 
 * The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
 * In this case, 6 units of rain water (blue section) are being trapped. Thanks
 * Marcos for contributing this image!
 * 
 * Example:
 * 
 * 
 * Input: [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * 
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let stack = [];
  height.push(0);
  flag = 0; //0 > ; 1 <
  sum = 0;
  lastHeight = 0;
  count = 0;
  console.log(height.length - 1);
  lastSum = 0;
  if (height.length < 3) {
    return 0
  }
  for (let i = 0; i < height.length - 1; i++) {
    stack.push(height[i]);
    if ((i < height.length - 2 && lastHeight > height[i]) || (i == height.length - 2 && height[i + 1] < height[i] && flag != 1)) {
      sum = sum + lastHeight - height[i]
    }
    count++;

    if (height[i + 1] > height[i] && flag != 0) {
      console.log(height[i], '制低点')
      flag = 0;
    } else if (height[i + 1] < height[i] && flag != 1) {
      // 制高点
      console.log(height[i], '制高点')
      flag = 1;
      if (lastHeight > height[i]) {
        sum = lastSum;
        lastHeight = height[i]
        console.log(i, count, stack, '--')
        stack.splice(i - count, count);
        console.log(stack)
        for (let j = i - count; j <= i; j++) {
          stack.push(height[j]);
          if (lastHeight > height[j]) {
            sum = sum + lastHeight - height[j]
          }
        }
      } else {
        lastSum = sum;
        count = 0;
        lastHeight = height[i]
      }

    }
  }
  console.log(sum)
  return sum;
};
