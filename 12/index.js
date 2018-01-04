const _ = require('lodash')
const primeFactorize = require('./prime-factorize.js')

function* triangleNumbers() {
  let sum = 0
  let i = 1
  while (true) {
    yield sum += i
    i++
  }
}

function countDivisors(n) {
  const factors = primeFactorize(n)
  const uniqueFactors = _.uniq(factors)

  // these for loops are slightly faster than using reduce.
  // maybe because this way avoids call stack overhead?
  let product = 1
  for (let i = 0; i < uniqueFactors.length; i++) {
    let count = 0
    for (let j = 0; j < factors.length; j++) {
      if (factors[j] === uniqueFactors[i]) count++
    }
    product = product * (count + 1)
  }

  return product
}

function solution(divisorCount) {
  for ( t of triangleNumbers() ) {
    if (countDivisors(t) > divisorCount) return t
  }
}


const start = new Date()
console.log(solution(500))
console.log('time:', new Date() - start)
