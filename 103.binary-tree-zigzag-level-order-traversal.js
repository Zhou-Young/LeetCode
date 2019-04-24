/*
 * @lc app=leetcode id=103 lang=javascript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
 *
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 *
 * algorithms
 * Medium (41.29%)
 * Total Accepted:    210.3K
 * Total Submissions: 509.2K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * Given a binary tree, return the zigzag level order traversal of its nodes'
 * values. (ie, from left to right, then right to left for the next level and
 * alternate between).
 *
 *
 * For example:
 * Given binary tree [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 *
 * return its zigzag level order traversal as:
 *
 * [
 * ⁠ [3],
 * ⁠ [20,9],
 * ⁠ [15,7]
 * ]
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
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  var zigzag = function(root, res = [], level = 0) {
    if (!root) return [];
    res[level] =
      level % 2
        ? [root.val, ...(res[level] || [])]
        : [...(res[level] || []), root.val];
    zigzag(root.left, res, level + 1);
    zigzag(root.right, res, level + 1);
    return res;
  };
  return zigzag(root);
};
