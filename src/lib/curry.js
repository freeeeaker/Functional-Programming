function curry (fn) {
  var args = arguments[1] ? arguments[1] : []
  return (function (o) {
    return function (...c) {
      var p = [...o, ...c]
      return p.length >= fn.length ? fn.apply(undefined, p) : curry(fn, p)
    }
  })(args)
}

function tap (fn, x) {
  if (arguments.length === 1) return function (y) {
    return tap(fn, y)
  } 
  fn(x)
  return x
}

const K = x => y => x


const compose = (...funcs) => {
  if (funcs.length === 0) return f => f
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((g, f) => (...args) => g(f(...args)))
}

const pipe = (...funcs) => {
  if (funcs.length === 0) return f => f
  if (funcs.length === 1) return funcs[0]
  return funcs.reduceRight((g, f) => (...args) => g(f(...args)))        // 或者
}

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else {
      console.log(fn)
      return fn.apply(this, arguments);
    }
  };
}
console.log(_curry1(x => x + 1)()(1))