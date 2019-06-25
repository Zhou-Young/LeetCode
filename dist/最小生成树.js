"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import { minPQ } from "./minPQ.js";
var Dictionary =
/*#__PURE__*/
function () {
  function Dictionary() {
    _classCallCheck(this, Dictionary);

    this.item = {};
  } //设置字典的键值对


  _createClass(Dictionary, [{
    key: "set",
    value: function set(key, value) {
      this.item[key] = value;
      return this;
    } //获取某个值

  }, {
    key: "get",
    value: function get(key) {
      return this.has(key) ? this.item[key] : undefined;
    } //判断是否含有某个键的值

  }, {
    key: "has",
    value: function has(key) {
      return this.item.hasOwnProperty(key);
    }
  }]);

  return Dictionary;
}();

var Graph =
/*#__PURE__*/
function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.vertices = [];
    this.adjList = new Dictionary();
  } //添加顶点


  _createClass(Graph, [{
    key: "addVertex",
    value: function addVertex(v) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    } //添加边

  }, {
    key: "addEdge",
    value: function addEdge(v, w, weight) {
      this.adjList.get(v).push(w).push(weight); //有向图

      this.adjList.get(w).push(v).pudh(weight); // 无向图
    } // 最小生成树

  }, {
    key: "lazyPrimMST",
    value: function lazyPrimMST() {
      var marked = []; //最小生成树的顶点

      var mst = []; //最小生成树的边

      var pq = []; //横切边
    }
  }]);

  return Graph;
}();

var graph = new Graph();
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
var que = new minPQ();
que.add(1);
que.add(2);
que.add(4);
que.add(7);
que.add(5);
que.show();
que.out();
que.show();