const fs = require('fs')

const getCoos = (data) => data.split('\n').filter(e => e.length).map(e => e.split('->').map(i => i.trim().split(',').map(j => parseInt(j, 10))))

const placeLineOnMap = (map, coos) => {
    for (let i = 0; i < coos.length; i++) {
        let coo = coos[i]
        if (coo[0][0] > coo[1][0]) {
            let tmp = coo[0][0]
            coo[0][0] = coo[1][0]
            coo[1][0] = tmp
        }
        for (let y = coo[0][0]; y <= coo[1][0]; y++) {
            if (coo[0][1] > coo[1][1]) {
                let tmp = coo[0][1]
                coo[0][1] = coo[1][1]
                coo[1][1] = tmp
            }
            for (let x = coo[0][1]; x <= coo[1][1]; x++) {
                map[x][y] += 1
            }
        }
    }
    return map
}

const placeDiagOnMap = (map, coos) => {
    let act = false
    for (let i = 0; i < coos.length; i++) {
        let coo = coos[i]
        for (let y = coo[0][0], x = coo[0][1]; y <= coo[1][0] && x <= coo[1][1]; y++, x++) {
            map[x][y] += 1
        }
        for (let y = coo[0][0], x = coo[0][1]; y >= coo[1][0] && x >= coo[1][1]; y--, x--) {
            map[x][y] += 1
        }
        for (let y = coo[0][0], x = coo[0][1]; y >= coo[1][0] && x <= coo[1][1]; y--, x++) {
            map[x][y] += 1
        }
        for (let y = coo[0][0], x = coo[0][1]; y <= coo[1][0] && x >= coo[1][1]; y++, x--) {
            map[x][y] += 1
        }
    }
    return map
}

fs.readFile('./input', 'utf8', (err, data) => {
    let map = Array(1000).fill(0).map(() => Array(1000).fill(0))
    let coos = getCoos(data)
    let vertCoos = coos.filter(e => e[0][0] == e[1][0])
    let horCoos = coos.filter(e => e[0][1] == e[1][1])
    let diagCoos = coos.filter(e => e[0][0] != e[1][0] && e[0][1] != e[1][1])
    map = placeLineOnMap(map, vertCoos)
    map = placeLineOnMap(map, horCoos)
    map = placeDiagOnMap(map, diagCoos)
    const count = map.reduce((acc, l) => acc + l.filter(e => e > 1).length, 0)
    console.log(map.map(e => e.map(i => !i ? '.' : i ).join('')).join('\n'), count)
})