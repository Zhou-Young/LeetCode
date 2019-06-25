export class minPQ {
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
    this.item.unshift(this.item.pop());
    this.sink(this.item, 0);
  }
  goUp(item, curIndex) {
    if (curIndex == 0) {
      return;
    }
    let fatherIndex = Math.ceil(curIndex) - 1;
    if (item[curIndex] < item[fatherIndex]) {
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
    let min = item[left] < item[right] ? left : right;
    if (item[min] < item[curIndex]) {
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


