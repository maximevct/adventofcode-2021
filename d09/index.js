const fs = require('fs')

const transformData = d => d.trim().split('\n').map(l => l.split('').map(v => parseInt(v)))

fs.readFile('input2', 'utf8', (e, d) => main(transformData(d)))
fs.readFile('input' , 'utf8', (e, d) => main(transformData(d)))

const getXPos = (i, all) => i % all[0].length
const getYPos = (i, all) => Math.floor(i / all[0].length)

const getLeft   = (i, all) => all[getYPos(i, all)    ][getXPos(i, all) - 1]
const getRight  = (i, all) => all[getYPos(i, all)    ][getXPos(i, all) + 1]
const getUp     = (i, all) => all[getYPos(i, all) - 1][getXPos(i, all)    ]
const getDown   = (i, all) => all[getYPos(i, all) + 1][getXPos(i, all)    ]

const isLTLeft  = (v, i, all) => getXPos(i, all) === 0                 || v < getLeft (i, all)
const isLTRight = (v, i, all) => getXPos(i, all) === all[0].length - 1 || v < getRight(i, all)
const isLTUp    = (v, i, all) => getYPos(i, all) === 0                 || v < getUp   (i, all)
const isLTDown  = (v, i, all) => getYPos(i, all) === all.length - 1    || v < getDown (i, all)

const isGTLeft   = (v, i, all) => getXPos(i, all) > 0                 && getLeft (i, all) > v
const isGTRight  = (v, i, all) => getXPos(i, all) < all[0].length - 1 && getRight(i, all) > v
const isGTUp     = (v, i, all) => getYPos(i, all) > 0                 && getUp   (i, all) > v
const isGTDown   = (v, i, all) => getYPos(i, all) < all.length - 1    && getDown (i, all) > v

const addIfNotPresent = (n, i) => n.indexOf(i) < 0 ? [...n, i] : n

const countMaxN = (v, i, all, n = [i]) => {
  if (v === 9) return n
  if (isGTLeft (v, i, all)) n = countMaxN(getLeft (i, all), i - 1            , all, addIfNotPresent(n, i))
  if (isGTUp   (v, i, all)) n = countMaxN(getUp   (i, all), i - all[0].length, all, addIfNotPresent(n, i))
  if (isGTRight(v, i, all)) n = countMaxN(getRight(i, all), i + 1            , all, addIfNotPresent(n, i))
  if (isGTDown (v, i, all)) n = countMaxN(getDown (i, all), i + all[0].length, all, addIfNotPresent(n, i))
  return n
}

const isLower   = (v, i, all) => isLTLeft(v, i, all) && isLTRight(v, i, all) && isLTUp(v, i, all) && isLTDown(v, i, all)
const getLowest = d => d.reduce((acc, cur, y, all) => [...acc, cur.map((e, x) => isLower(e, x + y * all[0].length, all) ? e + 1 : 0)], [])
const partOne   = d => getLowest(d).reduce((acc, cur) => acc + cur.reduce((a, b) => a + b, 0), 0)
const partTwo   = d => getLowest(d).reduce((acc, cur, y) => cur.reduce((a, b, x) => b ? [...a, countMaxN(b - 1, x + y * d[0].length, d).length] : a, acc), [])
                        .sort((a, b) => b - a)
                        .slice(0, 3)
                        .reduce((a, b) => a * b, 1)

function main(data) {
  // console.log(partOne(data))
  console.log(partTwo(data))
}