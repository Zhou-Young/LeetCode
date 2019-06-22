class HashMap {
  constructor() {
    this.hashMap = new Array(137); // 长度选择能使数据均匀分布的【素数】
  }
  /**
   * @method hashFn 哈希函数
   * @param { String } data 传入的字符串
   * @return { Number } 返回取余的数字
   */
  hashFn(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    return total % this.hashMap.length;
  }
/**
 * 拉链法
 * @param {string} data 
 */
  put(data) {
    let pos = this.hashFn(data);
    if (this.hashMap[pos] === undefined) {
      this.hashMap[pos] = [];
    }
    this.hashMap[pos].push(data);
    return this;
  }

  // 展示
  show() {
    this.hashMap &&
      this.hashMap.forEach((item, index) => {
        if (item != undefined) {
          console.log(index + " => " + item);
        }
      });
  }
}

let hashtable = new HashMap(),
  arr = [
    "mouse",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "sheep",
    "monkey",
    "chicken",
    "dog",
    "pig"
  ];
arr.forEach(item => {
  hashtable.put(item);
});
hashtable.show();
