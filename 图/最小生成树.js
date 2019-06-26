class MinPQ {
  constructor() {
    this.item = [];
  }
  add(v) {
    this.item.push(v);
    let length = this.item.length;
    this.goUp(this.item, length - 1);
  }
  out() {
    this.item.shift();
    if (this.item.length > 0) {
      this.item.unshift(this.item.pop());
      this.sink(this.item, 0);
    }
  }
  goUp(item, curIndex) {
    if (curIndex == 0) {
      return;
    }
    let fatherIndex = Math.ceil(curIndex) - 1;
    if (item[curIndex][2] < item[fatherIndex][2]) {
      this.swap(this.item, curIndex, fatherIndex);
      this.goUp(item, fatherIndex);
    }
    return;
  }
  sink(item, curIndex) {
    let left = curIndex * 2 + 1;
    let right = curIndex * 2 + 2;
    if (item[left] === undefined && item[right] == undefined) {
      return;
    }
    let min;
    if (item[right] == undefined) {
      min = left;
    } else if (item[left] === undefined) {
      min = right;
    } else {
      min = item[left][2] < item[right][2] ? left : right;
    }

    if (item[min][2] < item[curIndex][2]) {
      this.swap(item, min, curIndex);
      this.sink(item, min);
    }
  }
  swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  }
  show() {
    console.log(this.item);
  }
}

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
}

class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = {};
    this.edge = [];
  }
  //添加顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList[v] = [];
  }
  //添加边
  addEdge(v, w, weight) {
    this.adjList[v].push([v, w, weight]);
    this.adjList[w].push([w, v, weight]); // 无向图
    this.edge.push([v, w, weight]);
  }
  initialMark() {
    this.marked = {};
    for (let i = 0; i < this.vertices.length; i++) {
      this.marked[this.vertices[i]] = false;
    }
  }
  // 判断两点是否连通
  connected(graph, v, w) {
    if (Object.keys(graph.adjList).length == 0) {
      return false;
    }
    let marked = {};
    for (let i = 0; i < graph.vertices.length; i++) {
      marked[graph.vertices[i]] = false;
    }
    let dfs = (v, w) => {
      if (v == w) {
        return true;
      }
      marked[v] = true;
      for (let i = 0; i < graph.adjList[v].length; i++) {
        let a = marked;
        if (marked[graph.adjList[v][i][1]] === false) {
          let res = dfs(graph.adjList[v][i][1], w);
          if (res === true) return true;
        }
      }
      return false;
    };
    return dfs(v, w);
  }
  // 最小生成树
  lazyPrimMST() {
    let marked = []; //最小生成树的顶点
    let mst = []; //最小生成树的边
    let pq = new MinPQ(); //横切边
    this.initialMark();
    let visit = v => {
      //标记顶点v并将所有连接v和未被标记顶点的边加入pq
      this.marked[v] = true;
      marked.push(v);

      for (let i = 0; i < this.adjList[v].length; i++) {
        if (!this.marked[this.adjList[v][i][1]]) {
          let test = this.adjList[v];
          pq.add(this.adjList[v][i]);
        }
      }
    };
    visit(Math.min.apply(null, this.vertices));
    while (pq.item.length !== 0) {
      let t = pq.item[0][0];
      if (this.marked[pq.item[0][1]] === false) {
        let val = pq.item[0][1];
        mst.push(pq.item[0]);
        pq.out();
        visit(val);
      } else {
        pq.out();
      }
    }
    console.log(marked);
  }
  kruskalMST() {
    let marked = []; //最小生成树的顶点
    let mst = []; //最小生成树的边
    let pq = new MinPQ(); //横切边
    let uf = new Graph();
    // 遍历并排序所有边
    for (let i = 0; i < this.edge.length; i++) {
      pq.add(this.edge[i]);
    }

    //将最小的且不构成环的加入
    while (pq.item.length !== 0) {
      if (!marked.includes(pq.item[0][1])) {
        marked.push(pq.item[0][1]);
        uf.addVertex(pq.item[0][1]);
      }
      if (!marked.includes(pq.item[0][0])) {
        marked.push(pq.item[0][0]);
        uf.addVertex(pq.item[0][0]);
      }
      //判断是否连通
      if (!this.connected(uf, pq.item[0][1], pq.item[0][0])) {
        mst.push(pq.item[0]);
        uf.addEdge(pq.item[0][0], pq.item[0][1], pq.item[0][2]);
      }
      pq.out();
    }
    console.log(mst);
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
graph.lazyPrimMST();
graph.kruskalMST();

// let que = new MinPQ();
// que.add([1, 2, 1]);
// que.add([2, 3, 2]);
// que.add([3, 2, 4]);
// que.add([3, 3, 7]);
// que.add([1, 1, 5]);

// que.show();

// que.out();
// que.show();
