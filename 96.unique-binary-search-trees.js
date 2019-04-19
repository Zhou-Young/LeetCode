/*
 * @lc app=leetcode id=96 lang=javascript
 *
 * [96] Unique Binary Search Trees
 *
 * https://leetcode.com/problems/unique-binary-search-trees/description/
 *
 * algorithms
 * Medium (45.70%)
 * Total Accepted:    193.2K
 * Total Submissions: 422.4K
 * Testcase Example:  '3'
 *
 * Given n, how many structurally unique BST's (binary search trees) that store
 * values 1 ... n?
 *
 * Example:
 *
 *
 * Input: 3
 * Output: 5
 * Explanation:
 * Given n = 3, there are a total of 5 unique BST's:
 *
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 *
 *
 */
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  // 选定根节点后树个数即为左右子树个数的乘机
  // 故可得到关系：G(n) = G(0) * G(n-1) + G(1) * G(n-2) + … + G(n-1) * G(0) = F(1) + F(2) + F(n)
  let G = new Array(n + 1).fill(0);
  G[0] = G[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      G[i] += G[j - 1] * G[i - j];
    }
  }
  return G[n];
};
