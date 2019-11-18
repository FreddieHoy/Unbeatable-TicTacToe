
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
      computerChoice(playerOneSymbol)
    }
  } else if(playerTurn === 'p2') {
    if(playerTwoType === 'human') {
      humanChoice()
    } else if(playerTwoType === 'computer') {
      computerChoice(playerTwoSymbol)
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

function computerChoice(player) {
  if(playerOnePositions.length + playerTwoPositions.length < 2) {
    compFirstMove(player)
  } else {
    boardState = getBoardState()
    console.log(boardState)
    console.log(player)

    const bestMove = (minimax(boardState, player)).index
    console.log(JSON.stringify(bestMove))

    gridSquares[bestMove].innerHTML = player
    if(player === 'X') {
      playerOnePositions.push(bestMove)
    } else if(player === 'O') {
      playerTwoPositions.push(bestMove)
    }
  }
  turnResult()
}

function compFirstMove(player) {
  let firstMove
  if(gridSquares[4].innerHTML === '') {
    gridSquares[4].innerHTML = player
    firstMove = 4
  } else if(gridSquares[0].innerHTML === '') {
    gridSquares[0].innerHTML = player
    firstMove = 0
  }
  if(player === 'X') {
    playerOnePositions.push(firstMove)
  } else if(player === 'O') {
    playerTwoPositions.push(firstMove)
  }
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
  return boardState
  // returns array
}

function minimax(newBoard, player) {

  // available spots
  const availSpots = avialableSquares(newBoard)
  if (winning(newBoard, playerOneSymbol)) {
    return {score: -10}
  } else if (winning(newBoard, playerTwoSymbol)){
    return {score: 10}
  } else if (availSpots.length === 0){
    return {score: 0}
  }

  const moves = []
  // loop through available spots
  for (let i = 0; i < availSpots.length; i++){
    const move = {}
    move.index = newBoard[availSpots[i]]
    newBoard[availSpots[i]] = player

    if (player === playerTwoSymbol){
      const result = minimax(newBoard, playerOneSymbol)
      move.score = result.score
    } else {
      const result = minimax(newBoard, playerTwoSymbol)
      move.score = result.score
    }
    newBoard[availSpots[i]] = move.index
    moves.push(move)
  }
  let bestMove
  if(player === playerTwoSymbol){
    let bestScore = -10000
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}

function avialableSquares(boardState) {
  return boardState.filter(s => s !== 'O' && s !== 'X')
}

function winning(board, symbol) {
  if(
    (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
    (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
    (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
    (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
    (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
    (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
    (board[2] === symbol && board[4] === symbol && board[6] === symbol)
  ) {
    return true
  } else {
    return false
  }
}

// ------------------------------------------------------------------

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
