
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
let boardState

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
      computerTakeSquare(playerOneSymbol)
    }
  } else if(playerTurn === 'p2') {
    if(playerTwoType === 'human') {
      humanChoice()
    } else if(playerTwoType === 'computer') {
      computerTakeSquare(playerTwoSymbol)
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

// -------------------------------- Computer Logic ----------
function getBoardState() {
  // takes in these two array with diffrent numbers between 0-8
  const boardState = []
  for(let i = 0; i<9; i++) {
    if(playerOnePositions.includes(i)) {
      boardState.push('X')
    } else if(playerTwoPositions.includes(i)) {
      boardState.push('O')
    } else {
      boardState.push(i)
    }
  }
  console.log(boardState)
  return boardState
  // returns array
}

// takes in boardState and computer Symbol
function minimax(boardStatePositions, player) {
  // take array of all the previous player posotions and opponent player positions and choose the best square
  let opponentSymbol
  let computerSymbol
  if(player === 'X') {
    computerSymbol === 'X'
    opponentSymbol === 'O'
  } else if(player === 'O') {
    computerSymbol === 'O'
    opponentSymbol === 'X'
  }

  const avSquares = avialableSquares(boardStatePositions)
  let score
  if(winning(boardStatePositions, opponentSymbol)) {
    score = -10
  } else if(winning(boardStatePositions, computerSymbol)) {
    score = 10
  } else if(avSquares.length === 0) {
    score = 0
  }

  const moves = []
  for(let i = 0; i < avSquares.length; i++) {
    const move = {}
    move.index = boardStatePositions[avSquares[i]]
    boardStatePositions[avSquares[i]] = computerSymbol

    if(player === computerSymbol) {
      const result = minimax(boardStatePositions, opponentSymbol)
      move.score = result.score
    } else {
      const result = minimax(boardStatePositions, computerSymbol)
      move.score= result.score
    }
    boardStatePositions[avSquares[i]] = move.index
    moves.push(move)
  }

  let bestMove
  if(player === computerSymbol) {
    let bestScore = -1000
    for(let i = 0; i < moves.lenght; i++) {
      if(moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 1000
    for(let i = 0; i < moves.lenght; i++) {
      if(moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  console.log(bestMove)
  return bestMove
  // return the best square possible
}

function avialableSquares(boardState) {
  const freePositions = []
  for(let i = 0; i< boardState.length; i++ ) {
    if(boardState[i] !== 'X' && boardState[i] !== 'O') {
      freePositions.push(boardState[i])
    } else {
      continue
    }
  }
  // console.log(freePositions)
  return freePositions
}

function winning(board, compSymbol) {
  if(
    (board[0] === compSymbol && board[1] === compSymbol && board[2] === compSymbol) ||
    (board[3] === compSymbol && board[4] === compSymbol && board[5] === compSymbol) ||
    (board[6] === compSymbol && board[7] === compSymbol && board[8] === compSymbol) ||
    (board[0] === compSymbol && board[3] === compSymbol && board[6] === compSymbol) ||
    (board[1] === compSymbol && board[4] === compSymbol && board[7] === compSymbol) ||
    (board[2] === compSymbol && board[5] === compSymbol && board[8] === compSymbol) ||
    (board[0] === compSymbol && board[4] === compSymbol && board[8] === compSymbol) ||
    (board[2] === compSymbol && board[4] === compSymbol && board[6] === compSymbol)
  ) {
    return true
  } else {
    return false
  }
}

// ------------------------------------------------------------------

function computerTakeSquare(player) {
  boardState = getBoardState()
  console.log(boardState)

  const bestMove = minimax(boardState, player)

  gridSquares[bestMove].innerHTML = player
  if(player === 'X') {
    playerOnePositions.push(bestMove)
  } else if(player === 'O') {
    playerTwoPositions.push(bestMove)
  }
  turnResult()
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
