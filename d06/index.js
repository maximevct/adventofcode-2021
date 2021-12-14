const fs = require('fs')

const getValues = (data) => data.split(',').filter((l) => l.length > 0).map(n => parseInt(n, 10))

const pastDays = (data, days) => {
  if (days == 0)
    return data
  for (let d = 0; d < days; d++) {
    let add = []
    for (let i = 0; i < data.length; i++) {
      for (let index = 0; index < data[i].length; index++) {
        data[i][index] -= 1
        if (data[i][index] < 0) {
          data[i][index] = 6
          add.push(8)
        }
      }
    }
    data.push(add)
    console.log(`day [${d}] => ${data.reduce((acc, r) => acc + r.length, 0)}`)
  }
  return data
}

const v2 = (data, days) => {
  let stat = data.reduce((acc, cur) => {
    acc[cur]++
    return acc
  }, Array(8).fill(0))
  while (days > 0) {
    let newFishes = stat[0]
    for (let i = 0; i < stat.length - 1; i++) {
      stat[i] = stat[i + 1]
    }
    stat[6] += newFishes
    stat[8] = newFishes
    days--
  }
  return stat
}

fs.readFile('./input', 'utf8', (err, data) => {
  const v = getValues(data)
  // console.log(pastDays([v], 256).length)
  const res = v2(v, 256)
  console.log(res, res.reduce((acc, cur)=> acc + cur, 0))
})