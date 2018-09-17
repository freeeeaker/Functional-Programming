
function add (x, y) {
  return x + y
}

const alwaysLog = s => _ => console.log(s)

const addCurry = curry(add)
const add2 = tap(alwaysLog(2), addCurry(2))
const add4 = tap(alwaysLog(4), addCurry(4))
const add6 = tap(alwaysLog(6), addCurry(6))
// compose(add2, add4, add6)(1)
console.log('------')
pipe(add2, add4, add6)(1)