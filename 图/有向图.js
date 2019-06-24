class Dictionary {
  constructor() {
    this.item = {};
  }
  //设置字典的键值对
  set(key, value) {
    this.item[key] = value;
    return this;
  }
  //获取某个值
  get(key) {
    return this.has(key) ? this.item[key] : undefined;
  }
  //判断是否含有某个键的值
  has(key) {
    return this.item.hasOwnProperty(key);
  }
  //移除元素
  remove(key) {
    if (!this.has(key)) return false;
    delete this.item[key];
    return true;
  }
  // 展示字典的键
  keys() {
    return Object.keys(this.item);
  }
  // 字典的大小
  size() {
    return Object.keys(this.item).length;
  }
  // 展示字典的值
  values() {
    return Object.values(this.item).join(" ");
  }
  // 清空字典
  clear() {
    this.item = {};
    return this;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }
  // 入队操作
  enqueue(element) {
    if (element === undefined) return;
    this.items.push(element);
    return this;
  }
  // 出队操作
  dequeue() {
    return this.items.shift();
  }
  // 查看队前元素或者说即将处理的元素
  front() {
    return this.items[0];
  }
  // 查看队列是否为空
  isEmpty() {
    return this.items.length == 0;
  }
  // 查看队列的长度
  len() {
    return this.items.length;
  }
  // 打印队列数据
  print() {
    return this.items.join(" ");
  }
}

class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Dictionary();
  }
  //添加顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }
  //添加边
  addEdge(v, w) {
    this.adjList.get(v).push(w); //有向图
  }
  //计算v的出度
  degreeOut(v) {
    return this, this.adjList[v].length;
  }
  //计算v的入度
  degreeIn(v) {
    let count = 0;
    let keys = this.adjList.keys();
    keys.forEach(key => {
      for (let i = 0; i < this.adjList.get(key).length; i++) {
        let a = this.adjList.get(key);
        if (this.adjList.get(key)[i] == v) {
          count++;
        }
      }
    });
    return count;
  }
  initialMark() {
    this.marked = {};
    for (let i = 0; i < this.vertices.length; i++) {
      this.marked[this.vertices[i]] = false;
    }
  }
  // marked(key) {
  //   this.visited[this.vertices[key]] = true;
  // }
  // 深度优先搜索
  depthFirstSearch(v) {
    this.initialMark();
    this.dfs(v);
  }
  dfs(v) {
    this.marked[v] = true;
    for (let i = 0; i < this.adjList.get(v).length; i++) {
      if (!this.marked[this.adjList.get(v)[i]]) {
        this.dfs(this.adjList.get(v)[i]);
      }
    }
    console.log(v);
  }
  //广度优先搜索
  breadthFirstPaths(v) {
    this.initialMark();
    this.bfs(v);
  }
  bfs(v) {
    let queue = new Queue();
    queue.enqueue(v);
    console.log(v);
    this.marked[v] = true;
    while (!queue.isEmpty()) {
      v = queue.dequeue();
      for (let i = 0; i < this.adjList.get(v).length; i++) {
        if (!this.marked[this.adjList.get(v)[i]]) {
          queue.enqueue(this.adjList.get(v)[i]);
          console.log(this.adjList.get(v)[i]);
          this.marked[this.adjList.get(v)[i]] = true;
        }
      }
    }
  }
  //寻找入度为0的点
  zeroDegreeIn() {
    let S = [];
    let keys = this.adjList.keys();
    keys.forEach(key => {
      if (this.degreeIn(key) == 0) {
        S.push(key);
      }
    });
    return S;
  }
  //拓扑排序
  topSort() {
    //法一，找所有入度为0的点，删除该点涉及的边，继续找入度为0的点，若点找完了还有多余边则说明有环
    //法二，dfs
    let pre = []; //前序
    let post = []; //后序
    let reversePost = []; //逆后序
    let stack = [];
    let S = [];
    S = this.zeroDegreeIn();
    this.initialMark();
    S.forEach(key => {
      let dfs = v => {
        pre.push(v);
        stack.push(v);
        this.marked[v] = true;
        console.log(v);
        for (let i = 0; i < this.adjList.get(v).length; i++) {
          if (stack.includes(this.adjList.get(v)[i])) {
            // return null;
          }
          if (!this.marked[this.adjList.get(v)[i]]) {
            dfs(this.adjList.get(v)[i]);
          }
        }
        stack.pop(v);
        post.unshift(v);
        reversePost.push(v);
      };
      dfs(key);
    });
    return reversePost;
  }

  //寻找有向环
  directedCycle() {
    let stack = [];
    let S = [];
    let cicle = [];
    S = this.zeroDegreeIn();
    this.initialMark();
    S.forEach(key => {
      let dfs = v => {
        this.marked[v] = true;
        stack.push(v);
        console.log(v);
        for (let i = 0; i < this.adjList.get(v).length; i++) {
          if (stack.includes(this.adjList.get(v)[i])) {
            cicle.push(stack.slice(stack.indexOf(this.adjList.get(v)[i])));
            console.log(this.adjList.get(v)[i], "qw");
          }
          if (!this.marked[this.adjList.get(v)[i]]) {
            dfs(this.adjList.get(v)[i]);
          }
        }
        stack.pop(v);
      };
      dfs(key);
    });
    return true;
  }
}

let graph = new Graph();

graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);
graph.addVertex(9);
graph.addVertex(10);
graph.addVertex(11);
graph.addVertex(12);
graph.addEdge(0, 1);
graph.addEdge(0, 5);
graph.addEdge(2, 0);
graph.addEdge(2, 3);
graph.addEdge(3, 5);
graph.addEdge(5, 4);
graph.addEdge(6, 4);
graph.addEdge(6, 9);
graph.addEdge(8, 7);
graph.addEdge(9, 10);
graph.addEdge(9, 11);
graph.addEdge(11, 12);

graph.addEdge(8, 9);

// graph.addEdge(6, 7);
graph.addEdge(7, 6);

graph.addEdge(7, 8);
graph.addEdge(4, 3);
graph.addEdge(4, 2);
// graph.addEdge(6, 0);
graph.addEdge(0, 6);
graph.addEdge(3, 2);
graph.addEdge(12, 9);
graph.addEdge(10, 12);

// graph.addEdge(0, 6);
// graph.addEdge(9, 12);

// graph.breadthFirstPaths(0);
// graph.degreeIn(5);
// graph.topSort();
// graph.directedCycle();
graph.depthFirstSearch(1);
