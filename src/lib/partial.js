function partial(fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(undefined, [...args, ...arguments])
  }
}