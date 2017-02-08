import R from 'ramda'
import { test } from 'ava'

const testCases = {
  objects: [
    { a: 1, b: 2, c: 3 },
    { a: 'hello', 'stuff-***': 2, c: 1.0e5 }
  ],
  strings: [
    'string',
    'another.string'
  ]
}

test('serialization is isomorphic', t => {
  const base64 = require('./')
  const identity = R.compose(
    base64.deserialize,
    base64.serialize
  )
  testCases.objects.forEach(obj => {
    t.deepEqual(obj, identity(obj))
  })
})

test('encoding is isomorphic', t => {
  const base64 = require('./')
  const identity = R.compose(
    base64.decode,
    base64.encode
  )
  testCases.strings.forEach(str => {
    t.is(str, identity(str))
  })
})

test('encoding produces a string', t => {
  const base64 = require('./')
  testCases.strings.forEach(str => {
    t.is(typeof base64.encode(str), 'string')
  })
})

