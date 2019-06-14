// 优化空间复杂度，用一维数组，倒叙排列
let backpack2 = function(V, arrC, arrW) {
  let N = arrC.length;
  // 声明二维数组
  let F = new Array(V + 1).fill(0);

  for (let i = 0; i < N; i++) {
    for (let v = arrC[i]; v <=V ; v++) {
      F[v] = Math.max(F[v], F[v - arrC[i]] + arrW[i]);
    }
  }
  return F[F.length - 1];
};
backpack2(10, [2, 5, 3, 6, 2], [8, 10, 3, 9, 4]);