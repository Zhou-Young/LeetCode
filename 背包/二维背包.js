let backpack = function(V, U, C, D, W) {
  let N = C.length;
  // 声明二维数组
  let F = new Array();
  for (let u = 0; u < U + 1; u++) {
    F[u] = new Array();
    for (let v = 0; v < V + 1; v++) {
      F[u][v] = 0;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let u = U; u >= C[i]; u--) {
      for (let v = V; v >= D[i]; v--) {
        F[u][v] = Math.max(F[u][v], F[u - C[i]][v - D[i]] + W[i]);
      }
    }
  }
  return F[F.length - 1][F[F.length - 1].length - 1];
};
backpack(10, 10, [2, 5, 3, 4, 2], [3, 4, 5, 4, 3], [8, 4, 7, 4, 9]);
