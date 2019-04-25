/*
 * @lc app=leetcode id=99 lang=javascript
 *
 * [99] Recover Binary Search Tree
 *
 * https://leetcode.com/problems/recover-binary-search-tree/description/
 *
 * algorithms
 * Hard (34.26%)
 * Total Accepted:    114.8K
 * Total Submissions: 334.9K
 * Testcase Example:  '[1,3,null,null,2]'
 *
 * Two elements of a binary search tree (BST) are swapped by mistake.
 *
 * Recover the tree without changing its structure.
 *
 * Example 1:
 *
 *
 * Input: [1,3,null,null,2]
 *
 * 1
 * /
 * 3
 * \
 * 2
 *
 * Output: [3,1,null,null,2]
 *
 * 3
 * /
 * 1
 * \
 * 2
 *
 *
 * Example 2:
 *
 *
 * Input: [3,1,4,null,null,2]
 *
 * ⁠ 3
 * ⁠/ \
 * 1   4
 *    /
 *   2
 *
 * Output: [2,1,4,null,null,3]
 *
 * ⁠ 2
 * ⁠/ \
 * 1   4
 *    /
 * ⁠  3
 *
 *
 * Follow up:
 *
 *
 * A solution using O(n) space is pretty straight forward.
 * Could you devise a constant space solution?
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  let prev = new TreeNode(-Number.MAX_VALUE); // 最小数
  let node1, node2; // 第一个错误的点和第二个错误的点   63452   第一个错的是前一个，第二个错的是后一个
  //中序遍历
  function traverse(root) {
    if (root) {
      traverse(root.left);
      if (root.val < prev.val) {
        if (!node1) {
          node1 = prev;
        }
        node2 = root;
      }
      prev = root;
      traverse(root.right);
    }
  }
  traverse(root);
  // 找到错误点后，交换他们的值就好了，改node相当于改root
  let temp = node1.val;
  node1.val = node2.val;
  node2.val = temp;
};
