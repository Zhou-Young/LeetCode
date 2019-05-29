# readme ---- 算法思路速解

1、描述：给定一个数组和一个目标值，求数组中刚好相加等于目标值的两个数
举例：
思路：
- 循环两次暴力查找
- 将值存做索引

``` javascript
  for (let i = 0; i < nums.length; i++) {
    if (exist[target - nums[i]] !== undefined) {
      res.push(exist[target - nums[i]]);
      res.push(i);
    }
    exist[nums[i]] = i;
  }
```