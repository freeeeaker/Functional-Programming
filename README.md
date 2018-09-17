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
  在 JavaScript 中也被称为**箭头函数**, 是一个匿名函数，相信大家都很熟悉。
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
  η变换
  两个函数对所有的参数结果一致
  ```js
   x => f(x) 
   /*等价于*/ f
   f === x => fx(x)
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
function loopFactorial (n, total = 1) {
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
function loopFibonacci(n, p = 1, q = 1) {
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
柯里化是一种在所有参数被提供之前，挂起或“延迟”函数执行，将多参数转换为一原函数序列的技术。
例如 具有三个参数的柯里化函数定义如下：
```haskell
currf(f) :: (a, b, c) -> f(a) -> f(b) -> f(c)
```
以下是柯里化函数的简单实现
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
柯里化函数例子运用
```js
const add = (x, y, z) => x + y + z
const addCurry = curry(add)
const add10 = addCurry(10)
addCurry(10)(20)(30) // 60
add10(20)(30) // 60
```
柯里化能使我们记住参数，起到参数复用的作用， 帮助我们减少代码量
##### partial 偏函数
偏函数其实是柯里化的一种变体。柯里化是将函数转为一元函数序列，偏函数将函数转成两个n元函数序列。
```js
  function partial (fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
      return fn.apply(undefined, [...args, ...arguments])
    }
  }
```
js 中常用的 bind 函数其实就是偏函数的一种运用。 但是由于函数式语言强调纯函数的语言特性，所以是尽量不会再函数中使用 this 的。因为函数的 this 只有函数调用的时候才会确定，它会让我们的函数不纯
自己实现一个 bind 函数
```js
  var name = 'aaa'
  function run (age, sex) {
    console.log(this.name, age, sex)
  }
  var champion = {
    name: 'Ezreal'
  }
  function $bind (fn, context) {
    var args = [].slice.call(arguments, 2)
    return function () {
      return fn.apply(context, [...args, ...arguments])
    }
  }
  // 原型链上 bind 的实现
  Function.prototype.$bind = function (context) {
    var fn = this
    var args = [].slice.call(arguments, 1)
    return function () {
      return fn.apply(context, [...args, ...arguments])
    }
  }
  $bind(run, champion, 18)('male') // Ezreal 18 male
  run.$bind(champion, 20)('female') // Ezreal 20 female
```
##### combinator 组合子
  在纯正的函数式编程中是没有控制语句，即if else 之类的语句，那函数式编程如何实现 if else 之类的逻辑判断了。当然是通过函数！这种函数我们称之为函数组合子。组合子是一些可以组合其他函数（或其他组合子），并作为控制逻辑运行的高阶函数。组合子通常不声明任何变量，也不包含任何业务逻辑，它们旨在管理函数式程序的流程
  以下是一些常见的组合子以及比较出名的组合子(说的就是你 Y combinator)
  1.  identity (I组合子)
      ```js
      const identity = x => x
      ```
  2.  tap (k组合子)
      ```js
      function tap (fn, x) {
        if (arguments.length === 1) return function (y) {
          return tap(fn, y)
        } 
        fn(x)
        return x
      }
      ```
  3.  alt (OR组合子)
      ```js
      const alt = (fn1, fn2, val) => fn1(val) || fn2(val)
      ```
  4.  seq (S组合子)
      ```js
      const seq = (...funcs) => value => funcs.forEach(fn => fn(value))
       ```
  5.  compose组合子 (B组合子)
      实现代码组合，compose 接收一系列函数并返回一个新的函数。 执行这个新函数会从右到左执行这一些列函数，第一个函数的参数为新函数的参数，之后 每个函数接收的实参为前一个函数的返回值。 
      ```js
      /* 以下代码为 redux 中 compose 的实现 */
      const compose = (...funcs) => {
        if (funcs.length === 0) return f => f
        if (funcs.length === 1) return funcs[0]
        return funcs.reduce((g, f) => (...args) => g(f(...args)))
      }
      /* 根据 rambda 的 alpha 规则 */
      const log = n => _=> console.log(n)
      const add = (x, y) => x + y
      const addCurry = curry(add)
      const add2 = tap(log(2), addCurry(2))
      const add4 = tap(log(4), addCurry(4))
      const add6 = tap(log(6), addCurry(6))
      const addTotal = compose(add2, add4, add6)
      addTotal(1) // 13
      ```
  6.  pipe 组合子
      pipe 组合子和 compose 组合子执行的顺序正好相反
      ```js
      /* 模仿 redux 中 compose 的实现 */
      const pipe = (...funcs) => {
        if (funcs.length === 0) return f => f
        if (funcs.length === 1) return funcs[0]
        return funcs.reduceRight((g, f) => (...args) => g(f(...args)))        // 或者
      }
      ```
  7. Y 组合子 (不动点组合子)
      ```Scheme
        Y = λf. (λx. f(x x)) (λx. f(x x))
      ```
      ```js
        Y = f => (g => f(g(g)))(g => f(g(g)))
      ```
      ```js
      /* 阶乘 y组合子 */
      const fn = (f => f(f))(f => n => n == 0 ? 1 : n * f(f)(n - 1))
      fn(5) // 1 * 2 * 3 * 4 * 5 = 120
      ```
  8. Z 组合子
      Y 组合子作 η 变换 得到 Z组合子
      ```js
      Y = f => (g => g(g))(g => f(x => g(g)(x)))
      ```
##### pointfree
pointfree 是函数式编程的一种编程哲学，即不使用所要处理的值， 只合成运送风格
顾名思义，pointfree 即 消除点， 也就是消除 点运算，也即消除链式调用。
```js
  fetchData()
  .then(res => res.toJSON())
  .then(res => res.data)
  .then(data => data.map(x => x.num > 10))
  .then(data => data.sort())
```
一个 pointfree 风格的代码
```js
  fetchData()
  .then(R.pipe(toJSON, selectData, filterData, sortData))
```
pointfree 比链式调用的好处还于 链式调用是有局限性的。如果链式调用的对象没有相应的方法，那么我们就无法使用。但是对于 pointfree 风格的编程，我们可以自由组合函数，不会受限于被调用的对象本身。
比如 jQuery 的链式调用，我们就只能使用 jQuery 已有的方法进行链式调用，而 jQuery 没有的方法，则无能为力。
##### functor 函子
  functor 是一种容器，封装了我们的数据，并提供了操作数据的接口 fmap
  functor 本身并不关心数据， 只管应用函数到值并将结果包裹起来，并不能添加额外的逻辑
  ```js
    function Container (value) {
      this.__value = value
    }
    Container.prototype.fmap = function (f) {
      return Container.of(f(this.__value))
    }
    Container.prototype.of = function (value) {
      return new Container(value)
    }
  ```
1. pointed function
2. lift
3. ap
applicative functor 是实现了 ap 功能的 pointed functor
##### monad 单子
  monad 用于创建一个带有一定规则的容器，而 Functor 并不需要了解其容器内的值。 Functor 可以有效地保护数据， 然而当需要组合函数时， 即可以用 Monad 来安全并且无副作用地管理数据
```js
  class Maybe {
    constructor (value) {
      this.__value = value
    }
    static of (value) {
      return new Maybe(value)
    }
    isNothing () {
      return (this.__value == undefined || this.__value == null)
    }
    map (f) {
      return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
    }
  }
```



