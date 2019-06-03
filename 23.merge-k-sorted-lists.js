/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
 *
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (32.91%)
 * Total Accepted:    365.4K
 * Total Submissions: 1.1M
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * Merge k sorted linked lists and return it as one sorted list. Analyze and
 * describe its complexity.
 * 
 * Example:
 * 
 * 
 * Input:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * Output: 1->1->2->3->4->4->5->6
 * 
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// var mergeKLists = function (lists) {
//   let len = lists.length - 1;

//   while (len > 0) {
//     let list = {
//       val: -1,
//       next: null
//     };
//     let head = list;
//     while (lists[len] && lists[len - 1]) {
//       if (lists[len].val <= lists[len - 1].val) {
//         head.next = lists[len];
//         head = head.next;
//         lists[len] = lists[len].next;
//       } else {
//         head.next = lists[len - 1];
//         head = head.next;
//         lists[len - 1] = lists[len - 1].next;
//       }
//     }
//     head.next = lists[len] || lists[len - 1];
//     lists[len - 1] = list.next;
//     len = len - 1;
//   }

//   return lists[0] || null;


// };

function(str){
  let arr;
  let currentIndex = 0,nextIndex = 0,sign=1;
  while(stack.length){
    
  }
}
