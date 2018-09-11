
function add (x, y) {
  return x + y
}

console.log(curry(add)(5)(10))