const fs = require('fs')
const assert = require('assert/strict')

const transformData = d => d.trim().split('\n').map(l => l.split('').map(v => parseInt(v)))

fs.readFile('input2', 'utf8', (e, d) => main(transformData(d)))
fs.readFile('input' , 'utf8', (e, d) => main(transformData(d)))

const getXPos = (i, all) => i % all[0].length
const getYPos = (i, all) => Math.floor(i / all[0].length)
const getCurrent = (i, all) => all[getYPos(i, all)][getXPos(i, all)]

//#region Test getPos
assert.equal(0, getXPos(0, [[0, 0, 0], [0, 0, 0]]))
assert.equal(1, getXPos(4, [[0, 0, 0], [0, 0, 0]]))
assert.equal(0, getYPos(0, [[0, 0, 0], [0, 0, 0]]))
assert.equal(1, getYPos(4, [[0, 0, 0], [0, 0, 0]]))
//#endregion

const getLeft   = (i, all) => all[getYPos(i, all)    ][getXPos(i, all) - 1]
const getRight  = (i, all) => all[getYPos(i, all)    ][getXPos(i, all) + 1]
const getUp     = (i, all) => all[getYPos(i, all) - 1][getXPos(i, all)    ]
const getDown   = (i, all) => all[getYPos(i, all) + 1][getXPos(i, all)    ]

//#region Test getDirection
assert.equal(5, getLeft (4, [[0, 0, 0], [5, 0, 0], [0, 0, 0]]))
assert.equal(5, getRight(4, [[0, 0, 0], [0, 0, 5], [0, 0, 0]]))
assert.equal(5, getUp   (4, [[0, 5, 0], [0, 0, 0], [0, 0, 0]]))
assert.equal(5, getDown (4, [[0, 0, 0], [0, 0, 0], [0, 5, 0]]))
//#endregion

const isLTLeft  = (i, all) => getXPos(i, all) === 0                 || getCurrent(i, all) < getLeft (i, all)
const isLTRight = (i, all) => getXPos(i, all) === all[0].length - 1 || getCurrent(i, all) < getRight(i, all)
const isLTUp    = (i, all) => getYPos(i, all) === 0                 || getCurrent(i, all) < getUp   (i, all)
const isLTDown  = (i, all) => getYPos(i, all) === all.length - 1    || getCurrent(i, all) < getDown (i, all)

//#region Test isLTDirection
assert.equal(true, isLTLeft (4, [[0, 0, 0], [2, 1, 0], [0, 0, 0]]))
assert.equal(true, isLTLeft (3, [[0, 0, 0], [2, 1, 0], [0, 0, 0]]))
assert.equal(true, isLTRight(4, [[0, 0, 0], [0, 1, 2], [0, 0, 0]]))
assert.equal(true, isLTRight(5, [[0, 0, 0], [0, 1, 2], [0, 0, 0]]))
assert.equal(true, isLTUp   (4, [[0, 2, 0], [0, 1, 0], [0, 0, 0]]))
assert.equal(true, isLTUp   (1, [[0, 2, 0], [0, 1, 0], [0, 0, 0]]))
assert.equal(true, isLTDown (4, [[0, 0, 0], [0, 1, 0], [0, 2, 0]]))
assert.equal(true, isLTDown (7, [[0, 0, 0], [0, 1, 0], [0, 2, 0]]))
//#endregion

const isWLTLeft   = (i, all) => getXPos(i, all) > 0                 && getCurrent(i, all) < getLeft (i, all) && getLeft (i, all) < 9
const isWLTRight  = (i, all) => getXPos(i, all) < all[0].length - 1 && getCurrent(i, all) < getRight(i, all) && getRight(i, all) < 9
const isWLTUp     = (i, all) => getYPos(i, all) > 0                 && getCurrent(i, all) < getUp   (i, all) && getUp   (i, all) < 9
const isWLTDown   = (i, all) => getYPos(i, all) < all.length - 1    && getCurrent(i, all) < getDown (i, all) && getDown (i, all) < 9

//#region Test isWLTDirection
assert.equal(true , isWLTLeft (4, [[0, 0, 0], [2, 1, 0], [0, 0, 0]]))
assert.equal(false, isWLTLeft (4, [[0, 0, 0], [9, 1, 0], [0, 0, 0]]))
assert.equal(false, isWLTLeft (3, [[0, 0, 0], [2, 1, 0], [0, 0, 0]]))
assert.equal(true , isWLTRight(4, [[0, 0, 0], [0, 1, 2], [0, 0, 0]]))
assert.equal(false, isWLTRight(4, [[0, 0, 0], [0, 1, 9], [0, 0, 0]]))
assert.equal(false, isWLTRight(5, [[0, 0, 0], [0, 1, 2], [0, 0, 0]]))
assert.equal(true , isWLTUp   (4, [[0, 2, 0], [0, 1, 0], [0, 0, 0]]))
assert.equal(false, isWLTUp   (4, [[0, 9, 0], [0, 1, 0], [0, 0, 0]]))
assert.equal(false, isWLTUp   (1, [[0, 2, 0], [0, 1, 0], [0, 0, 0]]))
assert.equal(true , isWLTDown (4, [[0, 0, 0], [0, 1, 0], [0, 2, 0]]))
assert.equal(false, isWLTDown (4, [[0, 0, 0], [0, 1, 0], [0, 9, 0]]))
assert.equal(false, isWLTDown (7, [[0, 0, 0], [0, 1, 0], [0, 2, 0]]))
//#endregion

const addIfNotPresent = (n, i) => n.indexOf(i) < 0 ? [...n, i] : n

//#region Test addIfNotPresent
assert.deepEqual([1, 2, 3], addIfNotPresent([1, 2], 3))
assert.deepEqual([1, 2, 3], addIfNotPresent([1, 2, 3], 3))
//#endregion

const countMaxN = (i, all, n = [i]) => {
  if (getCurrent(i, all) === 9) return n
  if (isWLTLeft (i, all)) n = countMaxN(i - 1            , all, addIfNotPresent(n, i))
  if (isWLTUp   (i, all)) n = countMaxN(i - all[0].length, all, addIfNotPresent(n, i))
  if (isWLTRight(i, all)) n = countMaxN(i + 1            , all, addIfNotPresent(n, i))
  if (isWLTDown (i, all)) n = countMaxN(i + all[0].length, all, addIfNotPresent(n, i))
  return addIfNotPresent(n, i)
}

const isLower   = (i, all) => isLTLeft(i, all) && isLTRight(i, all) && isLTUp(i, all) && isLTDown(i, all)
const getLowest = d => d.reduce((acc, cur, y, all) => [...acc, cur.map((e, x) => isLower(x + y * all[0].length, all) ? e + 1 : 0)], [])
const partOne   = d => getLowest(d).reduce((acc, cur) => acc + cur.reduce((a, b) => a + b, 0), 0)
const partTwo   = d => getLowest(d).reduce((acc, cur, y) => cur.reduce((a, b, x) => b ? [...a, countMaxN(x + y * d[0].length, d).length] : a, acc), [])
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .reduce((a, b) => a * b, 1)

function main(data) {
  // console.log(partOne(data))
  console.log(partTwo(data))
}