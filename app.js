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
// Old saved positions
let playerOnePositions = []
let playerTwoPositions = []
// player one always has 'X' & Two 'O'
const playerOneSymbol = 'X'
const playerTwoSymbol = 'O'
// Whos Turn
let playerTurn
// What the board currently looks like (array)
let boardState

const pOneRadios = document.getElementsByName('playerOne')
const pTwoRadios = document.getElementsByName('playerTwo')
const startPlayerRadios = document.getElementsByName('startPlayer')
const start = document.querySelector('.startGame')
const infobox = document.querySelector('.infoBox')
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
  infobox.style.color = 'black'
  // clear the board
  for(let i=0; i<gridSquares.length; i++) {
    gridSquares[i].innerHTML = ''
  }
  // Start the first turn
  turn()
}

function turn() {

  // whos turn is it? Are they Human or computer
  if((playerTurn === 'X' && playerOneType === 'human') || (playerTurn === 'O' && playerTwoType === 'human')) {
    humanChoice()
  } else if((playerTurn === 'X' && playerOneType === 'computer') || (playerTurn === 'O' && playerTwoType === 'computer')) {
    computerChoice(playerTurn)
  }
}

// ---- Human box choosing logic

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
  if(playerTurn === 'X') {
    playerPositions = playerOnePositions
    playerSymbol = playerOneSymbol
  } else if(playerTurn === 'O') {
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

// ---- Computer box choosing logic

function computerChoice(player) {
  let bestMove
  // bestMove is decided for the computer.
  // if less then two moves on the board its chosen by compFirstMove().
  if(playerOnePositions.length + playerTwoPositions.length < 2) {
    bestMove = compFirstMove(player)
  } else {
    // otherwise minimax algorthium is then used to choose bestMove.
    boardState = getBoardState()
    bestMove = (minimax(boardState, player)).index
  }
  // move is then made from bestChoice
  gridSquares[bestMove].innerHTML = player
  if(player === 'X') {
    playerOnePositions.push(bestMove)
  } else if(player === 'O') {
    playerTwoPositions.push(bestMove)
  }
  turnResult()
}

function compFirstMove(player) {
  // comp takes 4 if human hasen't, next best is 0
  let firstMove
  if(gridSquares[4].innerHTML === '') {
    gridSquares[4].innerHTML = player
    firstMove = 4
  } else if(gridSquares[0].innerHTML === '') {
    gridSquares[0].innerHTML = player
    firstMove = 0
  }
  return firstMove
}

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
  if(player === '') {
    return {score: 0}
  }
  // available spots
  const availSpots = avialableSquares(newBoard)

  // is there a terminal position
  if (winning(newBoard, playerOneSymbol)) {
    return {score: -10}
  } else if (winning(newBoard, playerTwoSymbol)){
    return {score: 10}
  } else if (availSpots.length === 0){
    return {score: 0}
  }
  // array for all possible moves
  const moves = []
  // loop through available spots
  for (let i = 0; i < availSpots.length; i++) {
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

  const symbolIndexs = []
  let i = -1
  while(( i = board.indexOf(symbol, i+1)) !== -1) {
    symbolIndexs.push(i)
  }
  // This code below is the same as checkWin()
  // however calling checkWin() here leeds to computational limits.
  for(let i = 0; i< winningCombos.length; i++) {
    if(winningCombos[i].every(v => symbolIndexs.includes(v))) {
      return true
    } else {
      continue
    }
  }
  return false
}

// ---- Outcome of Move logic

function turnResult() {

  // swap player turns
  if(playerTurn === 'X') {
    playerTurn = 'O'
  } else if(playerTurn === 'O') {
    playerTurn = 'X'
  }
  // check the result
  if(checkWin(playerOnePositions)) {
    endGame('Player One')
  } else if(checkWin(playerTwoPositions)) {
    endGame('Player Two')
  } else if(checkDraw()) {
    endGame('Draw')
  } else {
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
    infobox.innerHTML = 'It\'s a draw.'
    infobox.style.color = 'grey'
  } else {
    infobox.innerHTML = `${winner} has won!`
    infobox.style.color = 'green'
  }
  start.innerHTML = 'Re-start Game'

}
