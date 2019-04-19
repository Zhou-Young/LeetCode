/*
 * 单链表
 * es5语法
 */
function LinkedList() {
  let length = 0;
  let head = null; //头节点
  //辅助类：表示要加入链表的项
  let Node = function(element) {
    this.val = element;
    this.next = null; //这个节点的下一个节点暂时为空
  };

  //查找指定位置的元素
  this.findIndex = index => {
    let currentNode = head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };

  //查找指定元素的位置
  this.findElement = element => {
    let currentNode = head;
    while (currentNode.val != element) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };

  //查找该元素的前一个元素位置
  function findPrev(item) {
    var currNode = head;
    while (!(currNode.next == null) && currNode.next.val != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 链表的添加删除都需要用特定的方法
  //向链表的尾部添加节点
  this.append = function(element) {
    let node = new Node(element);
    if (!head) {
      head = node;
    } else {
      let current = head; //需要改变head指向吗？
      while (!!current.next) {
        current = current.next;
      }
      current.next = node; //这改的其实是head啊  js对象的拷贝得看看
      // head = head.next;
    }
    length++;
  };

  //在指定的元素后面添加节点
  this.insertElement = function(value, element) {
    let newNode = new Node(value);
    let currNode = this.findElement(element);
    newNode.next = currNode.next;
    currNode.next = newNode;
  };

  //在指定的位置添加节点
  this.insertIndex = function(value, index) {
    let newNode = new Node(value);
    let currNode = this.findIndex(index);
    newNode.next = currNode.next;
    currNode.next = newNode;
  };

  // 打印链表
  this.display = function() {
    var currNode = head;
    console.log("head:", currNode);
    let inn = 0;
    while (currNode != null) {
      console.log(inn, "-", currNode.val);
      currNode = currNode.next;
      inn++;
    }
  };

  //将指定的节点元素删除掉
  this.removeElement = function(item) {
    var prevNode = findPrev(item);
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
    }
  };

  this.removeIndex = function(item) {
    if (item > 0) {
      var prevNode = this.findIndex(item - 1);
      if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
      }
    } else {
      head = head.next;
    }
  };
  // this.removeAt = function (position) {}; //将指定位置的节点删除
}

let list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insertElement(2.5, 2);
list.insertIndex(1.5, 0);
console.log(list.findIndex(-1), "--");
list.display(); // 显示链表也需要写函数
list.removeElement(1);
console.log("--display--");
list.display(); // 显示链表也需要写函数
