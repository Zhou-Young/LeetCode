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
  addEdge(v, w, weight) {
    this.adjList
      .get(v)
      .push(w)
      .push(weight); //有向图
    this.adjList
      .get(w)
      .push(v)
      .pudh(weight); // 无向图
  }
  // 最小生成树
  lazyPrimMST() {
    let marked = []; //最小生成树的顶点
    let mst = []; //最小生成树的边
    let pq = []; //横切边
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
graph.addEdge(0, 2, 26);
graph.addEdge(0, 7, 16);
graph.addEdge(0, 6, 58);
graph.addEdge(0, 4, 38);
graph.addEdge(2, 7, 34);
graph.addEdge(4, 6, 93);
graph.addEdge(4, 7, 37);
graph.addEdge(2, 6, 40);
graph.addEdge(2, 3, 17);
graph.addEdge(2, 1, 36);
graph.addEdge(1, 7, 19);
graph.addEdge(3, 6, 52);
graph.addEdge(1, 5, 32);
graph.addEdge(1, 3, 29);
graph.addEdge(4, 5, 35);
graph.addEdge(5, 7, 28);
graph.depthFirstSearch(0);
