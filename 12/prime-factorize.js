const _ = require('lodash')

module.exports = primeFactorize

// Use the Sieve of Sundaram to generate primes up to n
function sundaram(max) {
  const n = Math.ceil( (max - 2) / 2 )
  const sieve = Array(n + 1).fill(false)
  sieve[0] = true
  let i = 1, j = 1
  while (3 * i + 1 <= max) {
    let s
    while ( (s = i + j + 2 * i * j) <= max) {
      sieve[s] = true
      j++
    }
    j = 1
    i++
  }
  const primes = []
  for (let k = 0; k < sieve.length; k++) {
    if (!sieve[k]) primes.push( 2 * k + 1 )
  }
  primes.unshift(2)
  return primes
}

const memoizedSundaram = _.memoize(sundaram)

function roundUpToPowerOf10(n) {
  // these ifs are much faster than pow + ceil + log10
  if ( n < 1000 ) return 1000
  if ( n < 10000 ) return 10000
  if ( n < 100000 ) return 100000
  if ( n < 1000000 ) return 1000000
  if ( n < 10000000 ) return 10000000
  return Math.pow(10, Math.ceil(Math.log10(n)))
}

function primesUpTo(n) {
  // round n up to the nearest power of 10, to get more efficient memoization,
  // meaning the sieve has to run fewer times
  return memoizedSundaram(roundUpToPowerOf10(n))
}

function primeFactorize(n) {
  const maxPossibleFactor = Math.sqrt(n)
  const possibleFactors = primesUpTo(maxPossibleFactor)

  const factorization = []
  for (let i = 0; i < possibleFactors.length; i++) {
    const p = possibleFactors[i]

    // bail out early if we've reduced n enough so that we don't need to test
    // any of the larger prime factors. 2x performance gain
    if ( p > Math.sqrt(n) ) break
    while (n > 1 && n % p === 0) {
      n = n / p
      factorization.push(p)
    }
  }
  if (n > 1) {
    factorization.push(n)
  }
  return factorization
}
