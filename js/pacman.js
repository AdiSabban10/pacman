'use strict'

const PACMAN = '🙂'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount-- //foodCount
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        gameOver()
        return
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount-- //foodCount


        if (gGame.foodCount === 0) { //foodCount
            // const elVictory = document.querySelector('.victory')
            // elVictory.classList.remove('hidden')
            const elModal = document.querySelector('.modal')
            const elModalHeading = document.querySelector('.modal h2')
            elModalHeading.innerText = 'victorious'
            elModal.classList.remove('hidden')
            clearInterval(gGhostsInterval)
            return
        }
    }

    if (nextCell === SUPER_FOOD) {
        gPacman.isSuper = true
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = 'blue'
        }
        setTimeout(() => gPacman.isSuper = false, 5000)
        
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)

}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;

        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}