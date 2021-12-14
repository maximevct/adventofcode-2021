const fs = require('fs')
const assert = require('assert/strict')

const initData = data => data.split('\n').filter(e => e.length)

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

const countPoint = l => l.reduce((a, b) => a + (
    b === ')' ? 3 
  : b === ']' ? 57 
  : b === '}' ? 1197 
  : b === '>' ? 25137 
  : 0) , 0)

const partOne = data => countPoint(data.reduce((acc, cur) => [...acc, getCorrupted(cur.split(''))], []))

function main (data) {
  console.log(partOne(data))
}