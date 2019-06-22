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
    return Object.keys(this.items).join(" ");
  }
  // 字典的大小
  size() {
    return Object.keys(this.items).length;
  }
  // 展示字典的值
  values() {
    return Object.values(this.items).join(" ");
  }
  // 清空字典
  clear() {
    this.items = {};
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
  //计算v的度数
  degree(v) {
    return this, this.adjList[v].length;
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
    console.log(v);
    for (let i = 0; i < this.adjList.get(v).length; i++) {
      if (!this.marked[this.adjList.get(v)[i]]) {
        this.dfs(this.adjList.get(v)[i]);
      }
    }
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
}

let graph = new Graph();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addEdge(0, 2);
graph.addEdge(0, 1);
graph.addEdge(0, 5);
graph.addEdge(1, 0);
graph.addEdge(1, 2);
graph.addEdge(2, 0);
graph.addEdge(2, 1);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(3, 4);
graph.addEdge(3, 2);
graph.addEdge(5, 3);
graph.addEdge(5, 0);
graph.breadthFirstPaths(0);
