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
 * 有四种方法，详情可见网站
 * 用栈
 * 只要当前元素比前一个大，就灌水，看灌一次水能淹多少个格子
 * 然后再灌水
 * 一排一排的灌水、
 * 栈底元素是最大的元素
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let stack = [];
  let current = 0;
  let ans = 0;
  while (current < height.length) {
    console.log(current, height[current], stack.length, height[stack[stack.length - 1]])
    while (stack.length && height[current] > height[stack[stack.length - 1]]) { //当前元素比栈顶元素大，则栈顶元素出栈，计算值，若当前元素比栈顶元素小，则入栈
      let top = stack[stack.length - 1];
      stack.pop();
      if (!stack.length) {
        break;
      }
      let distance = current - stack[stack.length - 1] - 1;
      let bounded_height = Math.min(height[current], height[stack[stack.length - 1]]) - height[top];
      ans += distance * bounded_height;
    }
    stack.push(current++);
  }
  return ans;
};
