function test(arr1, arr2, arr3) {
  let sum = arr1;
  let maxValue = 0;
  let bestArr = [];
  let bestIndex = [];
  for (let i = 0; i < arr2.length; i++) {
    bestArr.push(arr2[i] / arr3[i]);
    bestIndex.push(i);
  }

  for (let i = 0; i < bestArr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bestArr.length; j++) {
      if (bestArr[j] < bestArr[minIndex]) {
        minIndex = j;
      }
    }
    if (i != minIndex) {
      let temp = bestArr[minIndex];
      bestArr[minIndex] = bestArr[i];
      bestArr[i] = temp;
      let temp1 = bestIndex[minIndex];
      bestIndex[minIndex] = bestIndex[i];
      bestIndex[i] = temp1;
    }
  }

  let used = 0;
  let have = sum;
  for (let i = 0; i < bestIndex.length; i++) {
    if (used + arr2[bestIndex[i]] > sum) {
      continue;
    } else {
      used += arr2[bestIndex[i]];
      maxValue += arr3[bestIndex[i]];
    }
    have = sum - used;
    if (have < Math.min.apply(0, arr2)) {
      break;
    }
  }
  return maxValue;
}

test([1000], [200, 900, 300, 400, 600, 450, 130], [4, 18, 6, 6, 6, 8, 3]);
