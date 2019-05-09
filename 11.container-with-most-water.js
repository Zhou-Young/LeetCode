/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  // 法一：暴力循环
  // let maxHeight = 0;
  // let lastHeight = 0;
  // let currentHeight = 0;
  // if (height.length < 2) return;
  // for (let i = 0; i < height.length; i++) {
  //   if (height[i] < lastHeight) continue;
  //   for (let j = i + 1; j < height.length; j++) {
  //     currentHeight =
  //       height[i] - height[j] > 0 ? height[j] * (j - i) : height[i] * (j - i);
  //     if (currentHeight > maxHeight) {
  //       maxHeight = currentHeight;
  //       lastHeight = height[i] - height[j] > 0 ? height[j] : height[i];
  //     }
  //   }
  // }
  // return maxHeight;

  // 法二：双指针法，从两头开始往中间遍历
  var l = 0,
    r = height.length - 1,
    maxHeight = 0,
    currentHeight = 0;
  if (height.length < 2) return;
  while (l !== r) {
    currentHeight =
      height[l] - height[r] > 0 ? height[r] * (r - l) : height[l] * (r - l);
    if (currentHeight > maxHeight) {
      maxHeight = currentHeight;
    }
    // 谁短移谁
    if (height[r] > height[l]) {
      l = l + 1;
    } else {
      r = r - 1;
    }
  }
  return maxHeight;
};
maxArea([1, 3, 2, 5, 25, 24, 5]);
