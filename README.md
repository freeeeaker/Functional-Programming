# Functional Programming  函数式编程

### 函数式编程的优点
1. 使用纯函数的代码绝不会更改或破坏全局状态，有助于提高代码的可测试性和可维护性
2. 函数式编程采用声明式的风格，易于推理。这提高了应用程序的整体可读性，通过使用组合和 lambda 表达式使代码更加精简
3. 集合中的数据元素处理可以通过链接如 map 和 reduce 这样的函数来实现
4. 函数式编程将函数视为积木，通过一等高阶函数来提高代码的模块化和可重用性
5. 可以利用响应式编程组合各个函数来降低事件驱动程序的复杂性


##### 一等函数
  指在语言层面将函数视为真实的对象。就像一个普通值一样可以赋予给变量或者作为实参传入。
##### higher-order function 高阶函数
  接收函数作为参数或者返回一个函数的函数
  `map`函数就是一个高阶函数
  ```js
    const array = [1, 2, 3, 4, 5].map( x => x * 10)
    // [10, 20, 30, 40, 50]
  ```
> 因为函数的一等性和高阶性，JavaScript 函数具有**值得行为**，也就是说函数就是一个基于输入的且尚未求值的不可变的值。
##### lambda 表达式
  rambda是函数是函数式编程的基础，
  在 JavaScript 中也被称为**箭头函数**, 是一个匿名函数，相信大家都很熟悉。
  对于rambda表达式 有两条规则：
  alpha规则，也叫做转换(conversion)规则。给定一个lambda表达式，我们可以任意改变参数的名字，只要我们相应的改变这些对应参数的变量名字
  ```js
  x => x === 0 ? 1 : x * x
  // 等价于
  y => y === 0 ? 1 : y * y
  ```
  beta规则，也叫做简化(reduction)规则。当把参数传到一个lambda表达式时，我们只需要用实际的参数来替换掉其函数体中相应的变量
  ```js
  x => x + 1
  // 令 x = 3 则
  3 => 3 + 1
  ```
  这两点看起来很简单，但是它构建了整个函数式编程的基础，在后面我们会看到让人迷糊的Y Combinator，其实也是基于这两个规则。
##### pure function 纯函数
  纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用
  纯函数具有以下性质
  1. 仅取决于提供的的输入，而不依赖于任何在函数求值期间或调用间隔时可能变化的隐藏状态和外部状态
  2. 不会造成超出其作用域的变化，例如修改全局对象或引用传递的参数
  ```js
     (x, y) => x + y // 纯函数
     () => Date.now() // 非纯函数
     function (name) { this.name = name } // 非纯函数
  ```
  JavaScript 中字符串的 slice 方法是纯函数， 而 splice 则是非纯函数
  slice 不会修改原值，返回一个新的值，而 splice 会修改原值
##### recursion 递归
  递归是一种旨在通过将问题分解成较小的自相似问题来解决问题本身的技术，将这些小的自相似问题结合在一起，就可以得到最终的解决方案。递归函数包含以下两个主要部分
  1. 基例 （也称为终止条件）
  2. 递归条件
  递归有两个经典的例子
  ```js
    // 阶乘
    function factorial (n) {
      if (n === 0) return 1
      return n * factorial(n - 1)
    }
    // 斐波拉契数列
    function fibonacci (n) {
      if (n === 1) return 1
      if (n === 2) return 1
      return fibonacci(n - 1) + fibonacci(n - 2)
    }
  ```
  递归和迭代是一枚硬币的两面。在不可变的条件下，递归提供了一种更具表现力、强大且优秀的迭代替代方法。事实上，纯函数语言甚至没有标准的循环结构，如 do、 for 和 while，因为所有的循环都是递归完成。递归使代码更易理解，因为它是以多次在较小的输入上重复相同的操作为基础的。
  但是递归的性能并不好，在直到终止条件前，我们没法得到每次递归的值。对于阶乘计算，迭代只需要 n 次，而递归则需要 2n 次。
  ```js
    factorial(5)
      -> 5 * factorial(4)
        -> 4 * factorial(3)
          -> 3 * factorial(2)
            -> 2 * factorial(1)
              -> 1 * factorial(0)
                <-> 终止条件触发
              <- 1 * 1
            <- 2 * 1
          <- 3 * 2
        <- 4 * 6
      <- 5 * 24
    = 120
  ```
##### tco(tail call optimization) 尾调用优化
尾调用即在函数末尾最后一句再次递归调用函数。函数最后的一件事情如果是递归的函数调用，那么运行时会认为不必要保持当前的栈帧，因为所有工作已经完成，完全可以抛弃当前帧。在大多数情况下，只有将函数的上下文状态作为参数传递给下一个函数调用，才能使递归调用不需要依赖当前帧。
```js
// 阶乘 尾调用
function factorial (n, total = 1) {
  if (n == 0) return total
  return factorial(n - 1, n * total)
}
// 按本人个人理解，其实尾调用类似于 循环
function loopFactorial (n) {
  var total = 1
  while(n > 0) {
    n *= total
    n--
  }
  return total
}
// 斐波拉契数列 尾调用
function fibonacci(n, p = 1, q = 1) {
  if (n == 1) return q
  if (n == 2) return q
  return fibonacci(n - 1, q, q + p)
}
// 按本人个人理解， 其实尾调用类似于 循环
function loopFibonacci(n) {
  var p = 1
  var q = 1
  if (n == 1) return p
  if (n == 2) return q
  while(n > 2) {
    var tmp = p
    p = q
    q = tmp + q
    n--
  }
  return q
}
```
##### curry 柯里化
```js
function curry(fn) {
  var args = arguments[1] ? arguments[1] : []
  return (function (o) {
    return function (...a) {
        var p = [...o, ...a]
        return p.length >= fn.length ? fn.apply(undefined, p) : curry(fn, p)
    }
  })(args)
}
```
##### partial 偏函数
```js
  function partial (fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
      return fn.apply(undefined, [...args, ...arguments])
    }
  }
```
##### pointfree
##### dot syntax
##### compose 组合
```js
  function compose (...fArr) {
    return function () {
      return fArr.reduceRight(function (val, f) {
        return f(val)
      }, arguments)
    }
  }
```

##### combinator 组合子
  1. I组合子
      ```js
        function identity (x) {
          return x
        }
      ```
  2. k组合子
  3. T组合子
  4. alt组合子
      ```js
      function alt (func1, func2, val) {
        return func1(val) || func2(val)
      }
      ```
  5. Y组合子
      ```js
      // 阶乘 y组合子
      const fn = (f => f(f))(f => n => n == 0 ? 1 : n * f(f)(n - 1))
      fn(5) // 1 * 2 * 3 * 4 * 5 = 120
      ```
##### functor 函子
##### monad 单子

