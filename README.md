# Functional Programming

##### pure function 纯函数
  引用透明
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
##### partial 偏函数
```js
  function partial (fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
      return fn.apply(undefined, [...args, ...arguments])
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
##### tco(tail call optimization) 尾调用优化
