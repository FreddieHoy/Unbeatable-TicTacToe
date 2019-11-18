

// Decide
// Human v Human
// Human v Comp
// comp v comp
// who starts?

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Human or Computer
let playerOneType
let playerTwoType

let playerOnePositions = []
let playerTwoPositions = []

const playerOneSymbol = 'X'
const playerTwoSymbol = 'O'
let playerTurn

const pOneRadios = document.getElementsByName('playerOne')
const pTwoRadios = document.getElementsByName('playerTwo')
const startPlayerRadios = document.getElementsByName('startPlayer')
const start = document.querySelector('.startGame')
const infobox = document.querySelector('.infobox')
const gridSquares = document.querySelectorAll('.gridSquare')

start.addEventListener('click', () => {
  for(let i=0; i < startPlayerRadios.length; i++) {
    if (startPlayerRadios[i].checked) {
      playerTurn = startPlayerRadios[i].value
      break
    }
  }
  for(let i=0; i < pOneRadios.length; i++) {
    if (pOneRadios[i].checked) {
      playerOneType = pOneRadios[i].value
      break
    }
  }
  for(let i=0; i < pTwoRadios.length; i++) {
    if (pTwoRadios[i].checked) {
      playerTwoType = pTwoRadios[i].value
      break
    }
  }
  startGame()
})

function startGame() {
  // remove all previous player positions
  playerOnePositions = []
  playerTwoPositions = []
  // remove info from infobox
  infobox.innerHTML = ''
  // clear the board
  for(let i=0; i<gridSquares.length; i++) {
    gridSquares[i].innerHTML = ''
  }
  // Start the first turn
  turn()
}

function turn() {
  // whos turn is it? Are they Human or computer
  if(playerTurn === 'p1') {
    if(playerOneType === 'human') {
      humanChoice()
    } else if(playerOneType === 'computer') {
      computerChoice(playerOnePositions, playerOneSymbol)
    }
  } else if(playerTurn === 'p2') {
    if(playerTwoType === 'human') {
      humanChoice()
    } else if(playerTwoType === 'computer') {
      computerChoice(playerTwoPositions, playerTwoSymbol)
    }
  }
}

function humanChoice() {
  for(let i=0; i<gridSquares.length; i++) {
    if(gridSquares[i].innerHTML === '') {
      gridSquares[i].addEventListener('click', humanTakeSquare, false)
    }
  }
}

function humanTakeSquare() {
  let playerPositions
  let playerSymbol
  if(playerTurn === 'p1') {
    playerPositions = playerOnePositions
    playerSymbol = playerOneSymbol
  } else if(playerTurn === 'p2') {
    playerPositions = playerTwoPositions
    playerSymbol = playerTwoSymbol
  }
  this.innerHTML = playerSymbol
  playerPositions.push(parseInt(this.id))

  for(let i=0; i<gridSquares.length; i++) {
    gridSquares[i].removeEventListener('click', humanTakeSquare)
  }
  turnResult()
}

function computerChoice(playerPositions, playerSymbol) {
  // take array of all the previous player posotions and opponent player positions and choose the best square



  // return the best square possible
}

function computerTakeSquare() {

}

function turnResult() {
  // Was the boxcheck a winning check?
  // yes - endgame
  if(checkWin(playerOnePositions)) {
    endGame('Player One')
  } else if(checkWin(playerTwoPositions)) {
    endGame('Player Two')
  } else if(checkDraw()) {
    endGame('Draw')
  } else {
    // no - change turn
    if(playerTurn === 'p1') {
      playerTurn = 'p2'
    } else if(playerTurn === 'p2') {
      playerTurn = 'p1'
    }
    turn()
  }
}

function checkWin(playerPositions) {
  // takes the players positions and return true
  for(let i = 0; i< winningCombos.length; i++) {
    if(winningCombos[i].every(v => playerPositions.includes(v))) {
      return true
    } else {
      continue
    }
  }
  return false
}

function checkDraw() {
  const squareFilling = []
  for(let i=0; i<gridSquares.length; i++) {
    if(gridSquares[i].innerHTML !== '') {
      squareFilling.push('a')
    }
  }
  if(squareFilling.length === 9) {
    return true
  } else {
    return false
  }
}

function endGame(winner) {
  if(winner === 'Draw') {
    infobox.innerHTML = 'It\'s a draw!'
  } else {
    infobox.innerHTML = `${winner} has won!`
  }
}
