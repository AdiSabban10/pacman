'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const SUPER_FOOD = '&#9900;'
const CHERRY = '🍒'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0 //foodCount
}
var gBoard

function init() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true

    const elModal = document.querySelector('.modal')
    // const elVictory = document.querySelector('.victory')
    
    elModal.classList.add('hidden')
    // elVictory.classList.add('hidden')
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++ //foodCount
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                    board[i][j] = WALL
                    gGame.foodCount-- //foodCount
            }
            
        }
    }
        
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gGame.foodCount -= 4 //

    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function gameOver() {
    // console.log('Game Over')
    gGame.isOn = false
    
    // const elModal = document.querySelector('.modal')
    // elModal.classList.remove('hidden')

    const elModal = document.querySelector('.modal')
    const elModalHeading = document.querySelector('.modal h2')
    elModalHeading.innerText = 'GAME OVER'
    elModal.classList.remove('hidden')
    clearInterval(gGhostsInterval)
}