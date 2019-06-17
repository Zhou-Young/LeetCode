/**
 * 自平衡二叉查找树
 *
 */

class hhTree {
  constructor(tree = []) {
    this.root = null; //树根
    this.Node = key => {
      //生成一个新的子树
      let _obj = Object.create(null, {});
      _obj.key = key;
      _obj.left = null;
      _obj.right = null;
      _obj.color = true; //由其父节点指向他的颜色
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
  isRed(node) {
    if (node == null) return false;
    return node.color;
  }
  rotateLeft(node) {
    var temp = node.right;
    node.right = temp.left;
    temp.left = node;
    temp.color = node.color;
    node.color = true;
    return temp;
  }
  rotateRight(node) {
    var temp = node.left;
    node.left = temp.right;
    temp.right = node;
    temp.color = node.color;
    node.color = true;
    return temp;
  }
  flipColors(node) {
    node.color = true;
    node.left.color = false;
    node.right.color = false;
  }
  insert(node, key) {
    //插入节点
    if (node === null) {
      node = this.Node(key);
      return node;
    }

    if (key < node.key) {
      node.left = this.insert(node.left, key);
    } else {
      node.right = this.insert(node.right, key);
    }
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node);
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node);
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node);
    }
    return node;
  }

  bulkInsert(nodes) {
    nodes.forEach(key => {
      //遍历数组，插入子树
      console.log(this.root);
      this.root = this.insert(this.root, key);
    });
  }
  showTree() {
    //返回二叉树对象
    console.log(this.root);
    return this.root;
  }

  //中序遍历
  inOrderTraverse(fn) {
    let inOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
      }
    };
    inOrderTraverseNode(this.root, fn);
  }

  // 找到特定的值
  search(key) {
    let searchNode = (node, key) => {
      if (node === null) {
        return false;
      }
      if (key < node.key) {
        return searchNode(node.left, key);
      } else if (key > node.key) {
        return searchNode(node.right, key);
      } else {
        return true;
      }
    };
    return searchNode(this.root, key);
  }
}
let nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7];
let binaryTree = new hhTree(nodes);
binaryTree.showTree();
