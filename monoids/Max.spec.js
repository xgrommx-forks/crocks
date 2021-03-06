const test = require('tape')
const helpers = require('../test/helpers')

const bindFunc = helpers.bindFunc

const isFunction = require('../predicates/isFunction')
const isObject = require('../predicates/isObject')

const constant = require('../combinators/constant')
const identity = require('../combinators/identity')

const Max = require('./Max')

test('Max', t => {
  const m = bindFunc(Max)

  t.ok(isFunction(Max), 'is a function')

  t.ok(isFunction(Max.empty), 'provides an empty function')
  t.ok(isFunction(Max.type), 'provides a type function')
  t.ok(isObject(Max(0)), 'returns an object')

  t.throws(Max, TypeError, 'throws with nothing')
  t.throws(m(identity), TypeError, 'throws with a function')
  t.throws(m(''), TypeError, 'throws with falsey string')
  t.throws(m('string'), TypeError, 'throws with truthy string')
  t.throws(m(false), TypeError, 'throws with false')
  t.throws(m(true), TypeError, 'throws with true')
  t.throws(m([]), TypeError, 'throws with an array')
  t.throws(m({}), TypeError, 'throws with an object')

  t.doesNotThrow(m(undefined), 'allows undefined')
  t.doesNotThrow(m(null), 'allows null')
  t.doesNotThrow(m(0), 'allows a falsey number')
  t.doesNotThrow(m(1), 'allows a truthy number')

  t.end()
})

test('Max inspect', t => {
  const m = Max(124)

  t.ok(isFunction(m.inspect), 'provides an inspect function')
  t.equal(m.inspect(), 'Max 124', 'returns inspect string')

  t.end()
})

test('Max value', t => {
  const empty = Max.empty().value()

  t.ok(isFunction(Max(0).value), 'is a function')

  t.equal(Max(undefined).value(), empty, 'provides an empty value for undefined')
  t.equal(Max(null).value(), empty, 'provides an empty value for null')

  t.equal(Max(0).value(), 0, 'provides a wrapped falsey number')
  t.equal(Max(1).value(), 1, 'provides a wrapped truthy number')

  t.end()
})

test('Max type', t => {
  t.ok(isFunction(Max(0).type), 'is a function')

  t.equal(Max(0).type, Max.type, 'static and instance versions are the same')
  t.equal(Max(0).type(), 'Max', 'reports Max')

  t.end()
})

test('Max concat properties (Semigroup)', t => {
  const a = Max(45)
  const b = Max(20)
  const c = Max(35)

  const left = a.concat(b).concat(c)
  const right = a.concat(b.concat(c))

  t.ok(isFunction(Max(0).concat), 'is a function')

  t.equal(left.value(), right.value(), 'associativity')
  t.equal(a.concat(b).type(), a.type(), 'returns Semigroup of the same type')

  t.end()
})

test('Max concat functionality', t => {
  const x = 5
  const y = 23

  const a = Max(x)
  const b = Max(y)

  const notMax = { type: constant('Max...Not') }

  const cat = bindFunc(a.concat)

  t.throws(cat(undefined), TypeError, 'throws with undefined')
  t.throws(cat(null), TypeError, 'throws with null')
  t.throws(cat(0), TypeError, 'throws with falsey number')
  t.throws(cat(1), TypeError, 'throws with truthy number')
  t.throws(cat(''), TypeError, 'throws with falsey string')
  t.throws(cat('string'), TypeError, 'throws with truthy string')
  t.throws(cat(false), TypeError, 'throws with false')
  t.throws(cat(true), TypeError, 'throws with true')
  t.throws(cat([]), TypeError, 'throws with an array')
  t.throws(cat({}), TypeError, 'throws with an object')
  t.throws(cat(notMax), TypeError, 'throws with non-Max')

  t.equals(a.concat(b).value(), y, 'provides max wrapped values as expected')

  t.end()
})

test('Max empty properties (Monoid)', t => {
  const m = Max(32)

  t.ok(isFunction(m.concat), 'provides a concat function')
  t.ok(isFunction(m.empty), 'provides a empty function')

  const right = m.concat(m.empty())
  const left  = m.empty().concat(m)

  t.equal(right.value(), m.value(), 'right identity')
  t.equal(left.value(), m.value(), 'left identity')

  t.equal(m.empty().type(), m.type(), 'returns a Monoid of the same type')

  t.end()
})

test('Max empty functionality', t => {
  const x = Max(85).empty()

  t.equal(Max(0).empty, Max.empty, 'static and instance versions are the same')

  t.equal(x.type(), 'Max', 'provides a Max')
  t.equal(x.value(), -Infinity, 'wraps a -Infinity')

  t.end()
})
