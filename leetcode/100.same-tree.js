/*
 * @lc app=leetcode id=100 lang=javascript
 *
 * [100] Same Tree
 *
 * https://leetcode.com/problems/same-tree/description/
 *
 * algorithms
 * Easy (49.75%)
 * Total Accepted:    367K
 * Total Submissions: 737K
 * Testcase Example:  '[1,2,3]\n[1,2,3]'
 *
 * Given two binary trees, write a function to check if they are the same or
 * not.
 *
 * Two binary trees are considered the same if they are structurally identical
 * and the nodes have the same value.
 *
 * Example 1:
 *
 *
 * Input:     1         1
 * ⁠         / \       / \
 * ⁠        2   3     2   3
 *
 * ⁠       [1,2,3],   [1,2,3]
 *
 * Output: true
 *
 *
 * Example 2:
 *
 *
 * Input:     1         1
 * ⁠         /           \
 * ⁠        2             2
 *
 * ⁠       [1,2],     [1,null,2]
 *
 * Output: false
 *
 *
 * Example 3:
 *
 *
 * Input:     1         1
 * ⁠         / \       / \
 * ⁠        2   1     1   2
 *
 * ⁠       [1,2,1],   [1,1,2]
 *
 * Output: false
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  // 层级遍历,出去一个进去一对左右子树
  let stackP = [];
  let stackQ = [];
  stackP.push(p);
  stackQ.push(q);
  if (!p && !q) {
    return true;
  }
  while (p && q && stackP.length && stackQ.length) {
    PVal = stackP.shift();
    QVal = stackQ.shift();
    if (PVal && QVal) {
      stackP.push(PVal.left);
      stackP.push(PVal.right);
      stackQ.push(QVal.left);
      stackQ.push(QVal.right);
      if (PVal.val !== QVal.val) {
        return false;
      }
    }
    if ((PVal && !QVal) || (!PVal && QVal)) {
      return false;
    }
  }
  if (
    stackQ.length ||
    stackP.length ||
    (stackP && !stackQ) ||
    (stackQ && !stackP)
  ) {
    return false;
  }
  return true;
};
