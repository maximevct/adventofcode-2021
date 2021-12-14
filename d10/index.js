const fs = require('fs')
const assert = require('assert/strict')

const initData = data => data.split('\n').filter(e => e.length).map(e => e.split(''))
const ops = ['()', '[]', '{}', '<>']
const gO = ops.map(e => e.split('')[0])
const gC = ops.map(e => e.split('')[1])
const gMatch = (f) => ops.find(e => e.indexOf(f) >= 0).split('')[gO.indexOf(f) < 0 ? 0 : 1]

fs.readFile('input', 'utf8', (err, data) => main(initData(data)))

const getCorrupted = l => {
  let i = 0
  let stack = []
  while (i < l.length) {
    if (['[', '{', '(', '<'].indexOf(l[i]) >= 0) {
      stack.push(l[i])
    }
    else {
      let last = stack.pop()
      if (['[]', '{}', '<>', '()'].indexOf([last, l[i]].join('')) < 0)
        return l[i]
    }
    i++
  }
  return 0
}

const getIncomplete = l => {
  let i = 0
  let stack = []
  while (i < l.length) {
    if (['[', '{', '(', '<'].indexOf(l[i]) >= 0) {
      stack.push(l[i])
    }
    else {
      let last = stack.pop()
      if (['[]', '{}', '<>', '()'].indexOf([last, l[i]].join('')) < 0)
        return false
    }
    i++
  }
  return true
}

const countPointPartOne = l => l.reduce((a, b) => a + (
    b === ')' ? 3 
  : b === ']' ? 57 
  : b === '}' ? 1197 
  : b === '>' ? 25137 
  : 0) , 0)

const getPoint = a => ops.findIndex(e => e.indexOf(a) >= 0) + 1

const countPointPartTwo = l => l.reduce((a, b) => a * 5 + getPoint(b), 0)

const getLastClosing = l => l.findIndex(e => gC.indexOf(e) >= 0)
const removeLastClosing = l => {
  let lastPos = getLastClosing(l)
  if (lastPos < 0)
    return l
  let i = lastPos - 1
  while (i >= 0) {
    if (l[i] === gMatch(l[lastPos])) {
      l.splice(lastPos, 1)
      l.splice(i, 1)
      return l
    }
    i--
  }
  return null
}
assert.equal(gMatch('('), ')')
assert.equal(gMatch(')'), '(')
assert.deepEqual(removeLastClosing('((<{}>))'.split('')), '((<>))'.split(''))

const removeAllClosing = l => {
  while (l && getLastClosing(l) >= 0) {
    l = removeLastClosing(l)
  }
  return l
}
assert.deepEqual(removeAllClosing('((<{}>))'.split('')), [])
assert.deepEqual(removeAllClosing('((<{>))'.split('')), ['{'])
assert.deepEqual(removeAllClosing('((<}>))'.split('')), null)

const getScore = a => a.splice(a.length / 2, 1)[0]

const partOne = data => countPointPartOne(data.reduce((acc, cur) => [...acc, getCorrupted(cur)], []))
const partTwo = data => getScore(data.filter(getIncomplete).map(e => countPointPartTwo(removeAllClosing(e).map(gMatch).reverse())).sort((a, b) => a - b))

function main (data) {
  // console.log(partOne(data))
  console.log(partTwo(data))
}