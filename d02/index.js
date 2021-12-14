const fs = require('fs')

const getInst = (data) => data.split('\n').filter((l) => l.length > 0).map(e => e.split(' '))

fs.readFile('./input', 'utf8', (err, data) => {
  const instructions = getInst(data)
  const pos = instructions.reduce((acc, c) => {
    if (c[0] === 'forward')
      acc.f += parseInt(c[1], 10)
    if (c[0] === 'down')
      acc.d += parseInt(c[1], 10)
    if (c[0] === 'up')
      acc.d -= parseInt(c[1], 10)
    return acc
  }, { d : 0, f : 0 })
  console.log(pos.d * pos.f)
})

fs.readFile('./input', 'utf8', (err, data) => {
  const instructions = getInst(data)
  const pos = instructions.reduce((acc, c) => {
    if (c[0] === 'forward') {
      acc.f += parseInt(c[1], 10)
      acc.d += parseInt(c[1], 10) * acc.aim
    }
    if (c[0] === 'down')
      acc.aim += parseInt(c[1], 10)
    if (c[0] === 'up')
      acc.aim -= parseInt(c[1], 10)
    return acc
  }, { aim : 0, d : 0, f : 0 })
  console.log(pos.d * pos.f)
})