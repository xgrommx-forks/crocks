/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const constant = require('../combinators/constant')
const isFunction = require('../predicates/isFunction')
const isSameType = require('../predicates/isSameType')

const _type =
  constant('Unit')

const _of =
  Unit

const _empty =
  Unit

function Unit() {
  const equals =
    m => isSameType(Unit, m) && undefined === m.value()

  const inspect =
    constant(`()`)

  const value =
    constant(undefined)

  const type =
    _type

  const of =
    _of

  const empty =
    _empty

  function concat(m) {
    if(!(isSameType(Unit, m))) {
      throw new TypeError('Unit.concat: Unit required')
    }

    return Unit()
  }

  function map(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Unit.map: Function required')
    }

    return Unit()
  }

  function ap(m) {
    if(!isSameType(Unit, m)) {
      throw new TypeError('Unit.ap: Unit required')
    }

    return Unit()
  }

  function chain(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Unit.chain: Function required')
    }

    return Unit()
  }

  return {
    inspect, value, type, equals,
    concat, empty, map, ap, of, chain
  }
}

Unit.type =
  _type

Unit.of =
  _of

Unit.empty =
  _empty

module.exports = Unit


