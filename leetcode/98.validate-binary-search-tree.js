/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
 *
 * https://leetcode.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (25.51%)
 * Total Accepted:    385.9K
 * Total Submissions: 1.5M
 * Testcase Example:  '[2,1,3]'
 *
 * Given a binary tree, determine if it is a valid binary search tree (BST).
 *
 * Assume a BST is defined as follows:
 *
 *
 * The left subtree of a node contains only nodes with keys less than the
 * node's key.
 * The right subtree of a node contains only nodes with keys greater than the
 * node's key.
 * Both the left and right subtrees must also be binary search trees.
 *
 *
 * Example 1:
 *
 *
 * Input:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * Output: true
 *
 *
 * Example 2:
 *
 *
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * Output: false
 * Explanation: The input is: [5,1,4,null,null,3,6]. The root node's
 * value
 * is 5 but its right child's value is 4.
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
 * @return {boolean}
 */
var isValidBST = function(root) {
  // 中序遍历看是否有序
  // 递归版
  // let ldr = (root, current) => {
  //   if (root) {
  //     ldr(root.left, current);
  //     current.push(root.val);
  //     ldr(root.right, current);
  //   }
  //   return current;
  // };
  // arr = ldr(root, []);
  // for (let i = 1; i < arr.length; i++) {
  //   if (arr[i] <= arr[i - 1]) {
  //     return false;
  //   }
  // }
  // return true;

  // 迭代版
  let stack = [];
  current = -Infinity;
  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      if (root.val <= current) {
        return false;
      } else {
        current = root.val;
      }
      root = root.right;
    }
  }
  return true;

  // 比较左右子树的大小
  // 递归版

  // 迭代版
};
