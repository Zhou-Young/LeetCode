/**
 * 自平衡二叉查找树
 *
 */

class AVLTree {
  constructor(tree = []) {
    this.root = null
    this.node = key => {
      this.left = null
      this.right = null
      this.key = key
    }
  }
  //判断节点所在层数
  nodeHeight(node) {
    if (node === null) {
      return -1
    } else {
      return Math.max(nodeHeight(node.left), nodeHeight(node.right)) + 1
    }
  }
  //判断平衡因子
  nodeBF(node) {
    return this.nodeHeight(node.left) - this.nodeHeight(node.right)
  }
  //LL 右旋
  transLL(node) {
    let temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }
  //RR 左旋
  transRR(node) {
    let temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }
  //LR 先右旋再左旋
  transLR(node) {
    node.left = this.transRR(node.left)
    return this.transLL(node)
  }
  //RL 先左旋再右旋
  transRL(node) {
    node.right = this.transLL(node.right)
    return this.transRR(node)
  }
  //插入节点
  insertNode(node, key){
    if(node === null){
      node = key
    }
    else{
      
    }
  }
}
