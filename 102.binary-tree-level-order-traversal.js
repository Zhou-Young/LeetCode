/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
 *
 * https://leetcode.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (46.98%)
 * Total Accepted:    362.5K
 * Total Submissions: 755.7K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * Given a binary tree, return the level order traversal of its nodes' values.
 * (ie, from left to right, level by level).
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
 * return its level order traversal as:
 *
 * [
 * ⁠ [3],
 * ⁠ [9,20],
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
var levelOrder = function(root) {
  let re = [];
  let reItem = [];
  let stack = [];
  count = 1;
  nextCount = 0;
  if (root) {
    stack.push(root);
  }

  while (root || stack.length) {
    if (root && root.left) {
      stack.push(root.left);
      nextCount++;
    }
    if (root && root.right) {
      stack.push(root.right);
      nextCount++;
    }
    let item = stack.shift();
    reItem.push(item.val);
    count--;
    if (count === 0) {
      re.push(reItem);
      reItem = [];
      count = nextCount;
      nextCount = 0;
    }
    root = stack[0];
  }

  return re;
};
