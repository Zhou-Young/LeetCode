/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
 *
 * https://leetcode.com/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (43.13%)
 * Total Accepted:    385.8K
 * Total Submissions: 893.2K
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * Given a binary tree, check whether it is a mirror of itself (ie, symmetric
 * around its center).
 *
 *
 * For example, this binary tree [1,2,2,3,4,4,3] is symmetric:
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠/ \ / \
 * 3  4 4  3
 *
 *
 *
 * But the following [1,2,2,null,3,null,3]  is not:
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠  \   \
 * ⁠  3    3
 *
 *
 *
 *
 * Note:
 * Bonus points if you could solve it both recursively and iteratively.
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
  // 递归
  function check(node1, node2) {
    if (!node1 && !node2) {
      return true;
    }
    if (!node1 || !node2) {
      return false;
    }
    if (node1.val !== node2.val) {
      return false;
    }
    return check(node1.left, node2.right) && check(node1.right, node2.left);
  }
  return check(root, root);
};
