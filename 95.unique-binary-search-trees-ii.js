/*
 * @lc app=leetcode id=95 lang=javascript
 *
 * [95] Unique Binary Search Trees II
 *
 * https://leetcode.com/problems/unique-binary-search-trees-ii/description/
 *
 * algorithms
 * Medium (34.76%)
 * Total Accepted:    133.7K
 * Total Submissions: 379.3K
 * Testcase Example:  '3'
 *
 * Given an integer n, generate all structurally unique BST's (binary search
 * trees) that store values 1 ... n.
 *
 * Example:
 *
 *
 * Input: 3
 * Output:
 * [
 * [1,null,3,2],
 * [3,2,null,1],
 * [3,1,null,null,2],
 * [2,1,3],
 * [1,null,2,null,3]
 * ]
 * Explanation:
 * The above output corresponds to the 5 unique BST's shown below:
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
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  if (n == 0) {
    return [];
  }
  let generate = function(start, end) {
    let arr = [];
    if (start > end) {
      arr.push(null);
      return arr;
    }
    for (let i = start; i <= end; ++i) {
      let leftArr = generate(start, i - 1);
      let rightArr = generate(i + 1, end);
      for (let l = 0; l < leftArr.length; l++) {
        for (let r = 0; r < rightArr.length; r++) {
          let node = new TreeNode(i);
          node.left = leftArr[l];
          node.right = rightArr[r];
          arr.push(node);
        }
      }
    }

    return arr;
  };
  return generate(1, n);
};
