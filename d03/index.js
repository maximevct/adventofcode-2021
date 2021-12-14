const fs = require('fs')

const getBits = (data) => data.split('\n').filter((l) => l.length > 0).map(e => e.split('').map(n => parseInt(n, 10)))

const countBits = (data) => data.reduce((acc, c) => {
  for (let i = 0; i < c.length; i++) {
    acc[i] += c[i]
  }
  return acc
}, Array(data[0].length).fill(0))

fs.readFile('./input', 'utf8', (err, data) => {
  const bits = getBits(data)
  const v = countBits(bits)
  const res = v.map(l => l < 500 ? 1 : 0).join('')
  const ires = v.map(l => l < 500 ? 0 : 1).join('')
  console.log(parseInt(res, 2) * parseInt(ires, 2))
})

const fn = (data, bits, pos) => {
  let m = data[pos] > (bits.length / 2) ? 1 : 0
  m = data[pos] == (bits.length / 2) ? 1 : m
  bits = bits.filter((l) => l[pos] == m)
  if (bits.length > 1)
    return fn(countBits(bits), bits, pos + 1)
  return bits[0]
}

const fn2 = (data, bits, pos) => {
  let m = data[pos] < (bits.length / 2) ? 1 : 0
  m = data[pos] == (bits.length / 2) ? 0 : m
  bits = bits.filter((l) => l[pos] == m)
  if (bits.length > 1)
    return fn2(countBits(bits), bits, pos + 1)
  return bits[0]
}

fs.readFile('./input', 'utf8', (err, data) => {
  const bits = getBits(data)
  const v = countBits(bits)
  const resOxygen = fn(v, bits, 0).join('')
  const resC02 = fn2(v, bits, 0).join('')
  console.log('Oxygen', resOxygen)
  console.log('CO2', resC02)
  console.log('res = ', parseInt(resOxygen, 2) * parseInt(resC02, 2))
})
