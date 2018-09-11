function curry (fn) {
  var args = arguments[1] ? arguments[1] : []
  return (function (o) {
    return function (...c) {
      var p = [...o, ...c]
      return p.length >= fn.length ? fn.apply(undefined, p) : curry(fn, p)
    }
  })(args)
}