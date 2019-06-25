"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minPQ = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var minPQ =
/*#__PURE__*/
function () {
  function minPQ() {
    _classCallCheck(this, minPQ);

    this.item = [];
  }

  _createClass(minPQ, [{
    key: "add",
    value: function add(v) {
      this.item.push(v);
      var length = this.item.length;
      this.goUp(this.item, length - 1);
    }
  }, {
    key: "out",
    value: function out() {
      this.item.shift();
      this.item.unshift(this.item.pop());
      this.sink(this.item, 0);
    }
  }, {
    key: "goUp",
    value: function goUp(item, curIndex) {
      if (curIndex == 0) {
        return;
      }

      var fatherIndex = Math.ceil(curIndex) - 1;

      if (item[curIndex] < item[fatherIndex]) {
        this.swap(this.item, curIndex, fatherIndex);
        this.goUp(item, fatherIndex);
      }

      return;
    }
  }, {
    key: "sink",
    value: function sink(item, curIndex) {
      var left = curIndex * 2 + 1;
      var right = curIndex * 2 + 2;

      if (item[left] === undefined && item[right] == undefined) {
        return;
      }

      var min = item[left] < item[right] ? left : right;

      if (item[min] < item[curIndex]) {
        this.swap(item, min, curIndex);
        this.sink(item, min);
      }
    }
  }, {
    key: "swap",
    value: function swap(arr, index1, index2) {
      var temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
    }
  }, {
    key: "show",
    value: function show() {
      console.log(this.item);
    }
  }]);

  return minPQ;
}();

exports.minPQ = minPQ;