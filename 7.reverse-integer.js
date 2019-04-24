/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 *
 * https://leetcode.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (25.12%)
 * Total Accepted:    611.6K
 * Total Submissions: 2.4M
 * Testcase Example:  '123'
 *
 * Given a 32-bit signed integer, reverse digits of an integer.
 *
 * Example 1:
 *
 *
 * Input: 123
 * Output: 321
 *
 *
 * Example 2:
 *
 *
 * Input: -123
 * Output: -321
 *
 *
 * Example 3:
 *
 *
 * Input: 120
 * Output: 21
 *
 *
 * Note:
 * Assume we are dealing with an environment which could only store integers
 * within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of
 * this problem, assume that your function returns 0 when the reversed integer
 * overflows.
 *
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let result = 0;

  while (x != 0) {
    result = result * 10 + (x % 10);
    if (x > 0) {
      x = Math.floor(x / 10);
    } else {
      x = Math.ceil(x / 10);
    }
  }
  if (result >= 2 ** 31 - 1 || result <= 2 ** 31 * -1) {
    return 0;
  }
  return result;

  // const max = 2 ** 31 - 1,
  //   min = -1 * 2 ** 31,
  //   sign = Math.sign(x);

  // x =
  //   Math.sign(x) < 0
  //     ? 0 -
  //       Math.abs(x)
  //         .toString()
  //         .split("")
  //         .reverse()
  //         .join("")
  //     : Math.abs(
  //         0 -
  //           Math.abs(x)
  //             .toString()
  //             .split("")
  //             .reverse()
  //             .join("")
  //       );

  // return x <= min || x >= max ? 0 : x;
};
