const test = require('tape')

const isFunction = require('./isFunction')
const identity = require('../combinators/identity')

const isChain = require('./isChain')

test('isChain predicate function', t => {
  const fake = { map: identity, ap: identity, chain: identity }

  t.equal(isChain(undefined), false, 'returns false for undefined')
  t.equal(isChain(null), false, 'returns false for null')
  t.equal(isChain(0), false, 'returns false for falsey number')
  t.equal(isChain(1), false, 'returns false for truthy number')
  t.equal(isChain(''), false, 'returns false for falsey string')
  t.equal(isChain('string'), false, 'returns false for truthy string')
  t.equal(isChain(false), false, 'returns false for false')
  t.equal(isChain(true), false, 'returns false for true')
  t.equal(isChain({}), false, 'returns false for an object')
  t.equal(isChain([]), false, 'returns false for an array')
  t.equal(isChain(identity), false, 'returns false for function')

  t.equal(isChain(fake), true, 'returns true when a Chain is passed')

  t.ok(isFunction(isChain))
  t.end()
})
