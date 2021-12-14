const fs = require('fs')

const getLines = (data) => data.split('\n').filter((l) => l.length > 0)
const getDraw = (lines) => lines.splice(0, 1)[0].split(',').map(e => parseInt(e, 10))
const getBoards = (lines) => lines.reduce((acc, curr, i) => {
    if (i % 5 == 0) {
        acc.push([])
    }
    acc[acc.length - 1].push(curr.split(' ').filter(e => e.length).map(e => ({ v : parseInt(e, 10), d : false })))
    return acc
}, [])

const isWinner = (board) => {
    if (board.find(l => l.every(n => n.d == true)))
        return true
    let i = 0
    for (let c = 0; c < board[0].length; c++) {
        i = 0
        while (i < board.length && board[i][c].d) {
            i++
        }
        if (i == board.length)
            return true
    }
    return false
}

const getWinner = (boards) => {
    return boards.find(isWinner)
}

const drawNumber = (board, n) => {
    return board.map(l => l.map(c => {
        if (c.v == n)
            c.d = true
        return c
    }))
}

const play = (draw, boards) => {
    let win, num
    while (!(win = getWinner(boards)) && draw.length) {
        num = draw.splice(0, 1)
        boards = boards.map((b) => drawNumber(b, num))
    }
    return {winner : win, num }
}

const countScore = (board) => board.reduce((acc, l) => {
    return l.reduce((racc, curr) => {
        if (!curr.d)
            racc += curr.v
        return racc
    }, acc)
}, 0)

fs.readFile('./input', 'utf8', (err, data) => {
    const lines = getLines(data)
    const draw = getDraw(lines)
    const boards = getBoards(lines)
    const { winner, num } = play(draw, boards)
    const score = countScore(winner)
    console.log(score * num)
})

const getLastWinner = (draw, boards) => {
    let lastWin, num
    while (boards.length > 1) {
        num = draw.splice(0, 1)
        boards = boards.map((b) => drawNumber(b, num)).filter(b => !isWinner(b))
    }
    while (!isWinner(boards[0])) {
        num = draw.splice(0, 1)
        boards[0] = drawNumber(boards[0], num)
    }
    return { winner : boards[0], num }
}

fs.readFile('./input', 'utf8', (err, data) => {
    const lines = getLines(data)
    const draw = getDraw(lines)
    const boards = getBoards(lines)
    const { winner, num } = getLastWinner(draw, boards)
    const score = countScore(winner)
    console.log(score * num)
})