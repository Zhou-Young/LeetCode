/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let newArr = [];
  let index = 0;
  if (nums1.length > 0 && nums2.length > 0) {
    for (let i = 0; i < nums1.length; i++) {
      if (nums2[index] == undefined || nums1[i] < nums2[index]) {
        newArr.push(nums1[i]);
      } else {
        while (nums1[i] > nums2[index] && nums2[index] != undefined) {
          newArr.push(nums2[index]);
          index++;
        }
        newArr.push(nums1[i]);
      }
    }
    if (index < nums2.length) {
      newArr = newArr.concat(nums2.slice(index));
    }
  } else {
    newArr = !!nums1.length ? nums1 : nums2;
  }

  if ((newArr.length / 2) % 1) {
    return newArr[Math.floor(newArr.length / 2)];
  } else {
    return (
      (newArr[Math.floor(newArr.length / 2) - 1] +
        newArr[Math.floor(newArr.length / 2)]) /
      2
    );
  }
  return;
};
