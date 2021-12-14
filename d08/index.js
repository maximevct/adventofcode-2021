const fs = require('fs')

fs.readFile('./input', 'utf8', (err, data) => main(data.split('\n').filter(e => e.length)))

const isUniqueDigit = e => e.length === 2 || e.length === 4 || e.length === 3 || e.length === 7
const countUniqueDigits = data => data.reduce((acc, cur) => acc + cur[1].filter(isUniqueDigit).length, 0)
const countDigits = data => data.reduce((acc, cur) => acc + getValues(cur), 0)
const findPos = (data, digit) => data.indexOf(data.find(e => digit.every(d => e.indexOf(d) >= 0)))
const findPosWithLen = (data, digit) => data.indexOf(data.find(e => e.length === 6 && digit.every(d => e.indexOf(d) >= 0)))
const findWithLen = (data) => data.indexOf(data.find(e => e.length === 6))
const arraySub = (a, b) => a.filter(e => b.indexOf(e) < 0)

const getValues = (data) => {
  let digit = Array(10).fill('')
  data[0].sort((a, b) => a.length - b.length)
  data[0] = data[0].map(e => {
    let n = e.split('')
    n.sort()
    return n.join('')
  })
  digit[1] = data[0].splice(0, 1)[0]
  digit[4] = data[0].splice(1, 1)[0]
  digit[7] = data[0].splice(0, 1)[0]
  digit[8] = data[0].splice(6, 1)[0]
  digit[9] = data[0].splice(findPos(data[0], digit[4].split('')), 1)[0]
  digit[0] = data[0].splice(findPosWithLen(data[0], digit[1].split(''), 6), 1)[0]
  digit[6] = data[0].splice(findWithLen(data[0], 6), 1)[0]
  digit[3] = data[0].splice(findPos(data[0], digit[1].split('')), 1)[0]
  digit[5] = data[0].splice(findPos(data[0], arraySub(digit[9].split(''), digit[1].split(''))), 1)[0]
  digit[2] = data[0].splice(0, 1)[0]
  return data[1].reduce((acc, cur, i) => {
    let n = cur.split('')
    n.sort()
    return acc + Math.pow(10, 3 - i) * parseInt(digit.indexOf(n.join('')), 10)
  }, 0)
}

function main (data) {
  console.log(countUniqueDigits(data.map(e => e.split('|').map(i => i.trim().split(' ')))))
  console.log(countDigits(data.map(e => e.split('|').map(i => i.trim().split(' ')))))
}
