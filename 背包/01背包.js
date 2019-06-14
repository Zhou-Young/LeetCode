/**
 * 01背包问题
 * 有 N 件物品和一个容量为 V 的背包。放入第 i 件物品耗费的费用是 C i ，得到的价值是 W i 。
 * 求解将哪些物品装入背包可使价值总和最大。
 * 这是最基础的背包问题，特点是：每种物品仅有一件，可以选择放或不放。
 * 用子问题定义状态：即 F[i,v] 表示前 i 件物品恰放入一个容量为 v 的背包可以获得的最大价值。则其状态转移方程便是：
 * F[i,v] = max{F[i − 1,v],F[i − 1,v − C i ] + W i }
 */

/**
 *
 * @param {number} V 背包容量
 * @param {number[]} arrC N件物品所消耗的空间
 * @param {number[]} arrW N件物品所值的价格
 */

let backpack = function(V, arrC, arrW) {
  let N = arrC.length;
  // 声明二维数组
  let total = new Array();
  for (let n = 0; n < N + 1; n++) {
    total[n] = new Array();
    for (let v = 0; v < V + 1; v++) {
      total[n][v] = 0;
    }
  }
  for (let i = 1; i < N + 1; i++) {
    for (let v = 1; v < V + 1; v++) {
      total[i][v] =
        v - arrC[i - 1] < 0
          ? total[i - 1][v]
          : Math.max(
              total[i - 1][v],
              total[i - 1][v - arrC[i - 1]] + arrW[i - 1]
            );
    }
  }
  return total[total.length - 1][total[total.length - 1].length - 1];
};

backpack(10, [2, 5, 3, 6, 2], [8, 10, 3, 9, 4]);

// 优化空间复杂度，用一维数组，倒叙排列
let backpack2 = function(V, arrC, arrW) {
  let N = arrC.length;
  // 声明二维数组
  let F = new Array(V + 1).fill(0);

  for (let i = 0; i < N; i++) {
    for (let v = V; v >= arrC[i]; v--) {
      F[v] = Math.max(F[v], F[v - arrC[i]] + arrW[i]);
    }
  }
  return F[F.length - 1];
};
backpack2(10, [2, 5, 3, 6, 2], [8, 10, 3, 9, 4]);

function ZeroOnePack(F, C, W) {
  for (let v = V; v >= C[i]; v--) {
    F[v] = Math.max(F[v], F[v - C[i]] + W[i]);
  }
}
