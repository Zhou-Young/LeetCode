/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
 *
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (33.98%)
 * Total Accepted:    372.6K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * Given a linked list, remove the n-th node from the end of list and return
 * its head.
 * 
 * Example:
 * 
 * 
 * Given linked list: 1->2->3->4->5, and n = 2.
 * 
 * After removing the second node from the end, the linked list becomes
 * 1->2->3->5.
 * 
 * 
 * Note:
 * 
 * Given n will always be valid.
 * 
 * Follow up:
 * 
 * Could you do this in one pass?
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

 /*
* 方法一：先遍历一遍链表，知道其长度，从而知道要删除的位置，再从头遍历一遍
* 方法二：先遍历第一个链表到n，再同时遍历第一和第二个链表，第一个到头第二个就到了length-n
 */
var removeNthFromEnd = function (head, n) {
  let list = head
  let newhead = head;
  let length = 1;

  while (newhead.next != null) {
    newhead = newhead.next;
    length++;
  }
  length -= n;
  if (length === 0) {
    return list.next;
  }
  newhead = list;
  for (let i = 1; i < length; i++) {
    newhead = newhead.next;
  }
  if (n === 1) {
    newhead.next = null;
  } else {
    newhead.next = newhead.next.next;
  }
  return list;
};
