/**
 * 自平衡二叉查找树
 *
 */

class AVLTree {
  constructor(tree = []) {
    this.root = null;
    this.Node = key => {
      //生成一个新的子树
      let _obj = Object.create(null, {});
      _obj.key = key;
      _obj.left = null;
      _obj.right = null;
      return _obj;
    };
    //初始化二叉树
    if (typeof tree === "number") {
      this.insert(tree);
    } else if (Array.isArray(tree)) {
      this.bulkInsert(tree);
    } else {
      console.error("请输入Number类型或者Array类型的参数");
    }
  }

  bulkInsert(nodes) {
    nodes.forEach(key => {
      //遍历数组，插入子树
      console.log(this.root);
      this.root = this.insertNode(this.root, key);
    });
  }
  showTree() {
    //返回二叉树对象
    console.log(this.root);
    return this.root;
  }

  //判断节点所在层数
  nodeHeight(node) {
    if (node === null) {
      return -1;
    } else {
      return (
        Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right)) + 1
      );
    }
  }
  //判断平衡因子
  nodeBF(node) {
    return this.nodeHeight(node.left) - this.nodeHeight(node.right);
  }
  //LL 右旋
  transLL(node) {
    let temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }
  //RR 左旋
  transRR(node) {
    let temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }
  //LR 先右旋再左旋
  transLR(node) {
    node.left = this.transRR(node.left);
    return this.transLL(node);
  }
  //RL 先左旋再右旋
  transRL(node) {
    node.right = this.transLL(node.right);
    return this.transRR(node);
  }
  //插入节点
  insertNode(node, key) {
    if (node === null) {
      node = this.Node(key);
      return node;
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key);
    } else {
      node.right = this.insertNode(node.right, key);
    }
    if (this.nodeBF(node) == 2 && this.nodeBF(node.left) == 1) {
      node = this.transLL(node);
    }
    if (this.nodeBF(node) == 2 && this.nodeBF(node.left) == -1) {
      node = this.transLR(node);
    }
    if (this.nodeBF(node) == -2 && this.nodeBF(node.right) == 1) {
      node = this.transRL(node);
    }
    if (this.nodeBF(node) == -2 && this.nodeBF(node.right) == -1) {
      node = this.transRR(node);
    }
    return node;
  }
}
let nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7];
let binaryTree = new AVLTree(nodes);
binaryTree.showTree();
