const { ENGINE_METHOD_PKEY_ASN1_METHS } = require('constants')
const fs = require('fs')

const getPos = (data) => data.split(',').map(e => parseInt(e, 10))

const fibonaplus = (v) => Array(v).fill(0).reduce((acc, c, i) => acc + i + 1, 0)

const getDist = (pos, d) => pos.reduce((acc, rec) => acc + Math.abs(rec - d), 0)

const getDistPow = (pos, d) => pos.reduce((acc, rec) => acc + fibonaplus(Math.abs(rec - d)), 0)

const leastDist = (pos) => Math.min(...Array(pos.length).fill(0).map((e, i) => getDist(pos, i)))

const leastDistPow = (pos) => Math.min(...Array(pos.length).fill(0).map((e, i) => getDistPow(pos, i)))

fs.readFile('./input', 'utf8', (err, data) => {
  const pos = getPos(data)
  console.log(pos)
  // console.log(leastDist(pos))
  console.log(leastDistPow(pos))
})
