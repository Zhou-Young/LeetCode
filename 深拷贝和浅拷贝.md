# readme

## js的深拷贝与浅拷贝

**栈（stack）** ：为自动分配的内存空间，它由系统自动释放；

**堆（heap）** ：则是动态分配的内存，大小不定也不会自动释放。

**基本类型**（undefined，boolean，number，string，null）

- 存放在栈中
- 类型值不可变

```javascript
var str = "abc";
console.log(str[1]="f");    // f
console.log(str);           // abc
```

- 类型的比较是值的比较

```javascript
var a = 1;
var b = 1;
console.log(a === b);//true
```

- 赋值时两个对象互不影响

```javascript
var a = 10;
var b = a;

a ++ ;
console.log(a); // 11
console.log(b); // 10
```

**引用类型**：

- 存放在堆中  变量实际上是一个存放在栈内存的指针，这个指针指向堆内存中的地址
- 引用类型值可变

```javascript
var a = [1,2,3];
a[1] = 5;
console.log(a[1]); // 5
```

- 类型比较是引用的比较

```javascript
var a = [1,2,3];
var b = [1,2,3];
console.log(a === b); // false
```

- 传址只改变指针的指向

```javascript
var a = {}; // a保存了一个空对象的实例
var b = a;  // a和b都指向了这个空对象

a.name = 'jozo';
console.log(a.name); // 'jozo'
console.log(b.name); // 'jozo'

console.log(a == b);// true
```

**浅拷贝**：将 B 对象拷贝到 A 对象中，但不包括 B 里面的子对象

**深拷贝**：对对象以及对象的所有子对象进行拷贝

### 对比

| 方式   | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 |       原数据中包含子对象 |
| :----- | :----------------------: | :----------------------: | -----------------------: |
| 赋值   |            是            |  改变会使原数据一同改变  |   改变会使原数据一同改变 |
| 浅拷贝 |            否            | 改变不会使原数据一同改变 |   改变会使原数据一同改变 |
| 深拷贝 |            否            | 改变不会使原数据一同改变 | 改变不会使原数据一同改变 |

-----