const fs = require('fs')

const countHigher = (highs) => highs.reduce((acc, curr, i, all) => i > 0 && curr > all [i - 1] ? acc + 1 : acc, 0);
const getNums = (data) => data.split('\n').filter((l) => l.length > 0).map((l) => parseInt(l, 10))
const concatHighs = (highs) => highs.reduce((acc, c, i, arr) => (i > arr.length - 3) ? acc :[...acc, [arr[i], arr[i + 1], arr[i + 2]].reduce((sum, n) => sum + n, 0)], [])

fs.readFile('./input', 'utf8', (err, data) => {
  console.log('Part 1 =', countHigher(getNums(data)))
  console.log('Part 2 =', countHigher(concatHighs(getNums(data))))
})