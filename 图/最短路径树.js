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
  //顶点s到v的距离，若不存在则无穷大
  distTo(graph, s, v) {
    if (Object.keys(graph.adjList).length == 0) {
      return false;
    }
    let marked = {};
    for (let i = 0; i < graph.vertices.length; i++) {
      marked[graph.vertices[i]] = false;
    }
    let length = Infinity;
    let dfs = (v, w) => {
      if (v == w) {
        length = 0;
        return true;
      }
      marked[v] = true;
      for (let i = 0; i < graph.adjList[v].length; i++) {
        let a = marked;
        if (marked[graph.adjList[v][i][1]] === false) {
          let res = dfs(graph.adjList[v][i][1], w);
          if (res === true) {
            length += graph.adjList[v][i][2];
            return true;
          }
        }
      }
    };
    dfs(s, v);
    return length;
  }
  //是否存在顶点s到v的路径
  hasPathTo(graph, s, v) {
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
    return dfs(s, v);
  }
  //顶点s到v的路径
  pathTo(graph, s, v) {
    if (Object.keys(graph.adjList).length == 0) {
      return false;
    }
    let marked = {};
    for (let i = 0; i < graph.vertices.length; i++) {
      marked[graph.vertices[i]] = false;
    }
    let path = [];
    let dfs = (v, w) => {
      if (v == w) {
        return true;
      }
      marked[v] = true;
      for (let i = 0; i < graph.adjList[v].length; i++) {
        let a = marked;
        if (marked[graph.adjList[v][i][1]] === false) {
          let res = dfs(graph.adjList[v][i][1], w);
          if (res === true) {
            path.unshift(graph.adjList[v][i][1]);
            return true;
          }
        }
      }
    };
    dfs(s, v);
    path.unshift(s);
    return path;
  }
  //放松边
  relaxEdge(e) {}
  //放松顶点
  relaxDot(v) {}
  dijkstra(s) {
    let edgeTo = {};
    let distTo = {};
    let pq = new MinPQ(); //优先队列，最小权重
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] == s) {
        // edgeTo[this.vertices[i]] = null;
        distTo[this.vertices[i]] = 0;
      } else {
        // edgeTo[this.vertices[i]] = null;
        distTo[this.vertices[i]] = Infinity;
      }
    }

    //放松边
    let relaxEdge = e => {
      let v = e[0],
        w = e[1],
        weight = e[2];
      if (distTo[w] > distTo[v] + weight) {
        distTo[w] = distTo[v] + weight;
        edgeTo[w] = e;
      }
    };
    //放松顶点
    let relaxDot = (graph, v) => {
      for (let i = 0; i < graph.adjList[v].length; i++) {
        let w = graph.adjList[v][i][1],
          weight = graph.adjList[v][i][2];
        if (distTo[w] > distTo[v] + weight) {
          distTo[w] = distTo[v] + weight;
          edgeTo[w] = graph.adjList[v][i];
          for (let n = 0; n < pq.item.length; n++) {
            if (
              pq.item[n][0] == edgeTo[w][0] &&
              pq.item[n][1] == edgeTo[w][1]
            ) {
              pq.item.splice(n, 1);
            }
          }
          pq.add([edgeTo[w][0], edgeTo[w][1], distTo[w]]);
        }
      }
    };

    pq.add([s, s, 0]);
    while (pq.item.length !== 0) {
      relaxDot(this, pq.item[0][1]);
      pq.out();
    }
    return edgeTo;
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
graph.addEdge(6, 0, 58);
graph.addEdge(0, 4, 38);
graph.addEdge(2, 7, 34);
graph.addEdge(6, 4, 93);
graph.addEdge(4, 7, 37);
graph.addEdge(6, 2, 40);
graph.addEdge(3, 6, 52);
graph.addEdge(5, 1, 32);
graph.addEdge(1, 3, 29);
graph.addEdge(4, 5, 35);
graph.addEdge(5, 4, 35);
graph.addEdge(5, 7, 28);
graph.addEdge(7, 5, 28);
graph.addEdge(7, 3, 37);
graph.dijkstra(0);

// let que = new MinPQ();
// que.add([1, 2, 1]);
// que.add([2, 3, 2]);
// que.add([3, 2, 4]);
// que.add([3, 3, 7]);
// que.add([1, 1, 5]);

// que.show();

// que.out();
// que.show();
