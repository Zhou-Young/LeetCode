//
//  main.cpp
//  code2
//
//  Created by 周扬 on 2018/3/14.
//  Copyright © 2018年 周扬. All rights reserved.
//

#include <iostream>

using namespace std;

struct ListNode {
    int val;
    struct ListNode *next;
    ListNode(int x) :
    val(x), next(NULL) {
    }
};

ListNode *addTwoNumbers(ListNode *l1, ListNode *l2) {
    //preHead是链表的头节点的地址，p是要一直往后指的，所以需要preHead来保存链表头
    ListNode preHead(0), *p = &preHead;
    int extra = 0; //判断是否需要进位
    cout<<l1<<" "<<l1->val<<endl;
    while (l1 || l2 || extra) {
        int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + extra;
        extra = sum / 10;
        p->next = new ListNode(sum % 10);
        p = p->next;
        l1 = l1 ? l1->next : l1;
        l2 = l2 ? l2->next : l2;
    }
    return preHead.next;
}

int  main()
{
    ListNode *x = new ListNode(2);
    ListNode *y = new ListNode(4);
    ListNode *z = new ListNode(3);
    x -> next = y;
    y -> next = z;
    ListNode *o = new ListNode(5);
    ListNode *p = new ListNode(6);
    ListNode *q = new ListNode(4);
    o -> next = p;
    p -> next = q;
    ListNode *result = addTwoNumbers(x, o);
    cout<<result->val<<result->next->val<<result->next->next->val;
    cout<<"listNode"<<x->val<<bool(q->next)<<endl;
}


