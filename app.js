
// Decide
// Human v Human
// Human v Comp
// comp v comp

// Decide
// who starts?

// class Player(type, symbol) {
//   this.type = type
//   this.symbol = symbol
// }

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


let playerOne = 'X'
let playerTwo = 'O'
let playerTurn

document.addEventListener('DOMContentLoaded', () => {

  const pOneRadios = document.getElementsByName('playerOne')
  const pTwoRadios = document.getElementsByName('playerTwo')
  const startPlayerRadios = document.getElementsByName('startPlayer')
  const start = document.querySelector('.startGame')
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
        playerOne = pOneRadios[i].value
        break
      }
    }
    for(let i=0; i < pTwoRadios.length; i++) {
      if (pTwoRadios[i].checked) {
        playerTwo = pTwoRadios[i].value
        break
      }
    }
    startGame()
  })

  function startGame() {
    console.log(playerOne + playerTwo + playerTurn)

    if(playerTurn === 'p1') {
      playerTurn = 'X'
    } else if (playerTurn === 'p2') {
      playerTurn = 'O'
    }
    console.log(playerTurn)
    // should add eventListeners to each grid Square
    for(let i=0; i<gridSquares.length; i++) {
      gridSquares[i].innerHTML = ''
      gridSquares[i].addEventListener('click', squareClick, false)
    }
  }

  function squareClick(square) {
    square.target.innerHTML = playerTurn
    console.log(square.target.id)
    checkWin()
    changeTurn()
  }

  function changeTurn() {
    if(playerTurn === 'O') {
      playerTurn = 'X'
    } else if (playerTurn === 'X') {
      playerTurn = 'O'
    }

  }

  function checkWin() {

  }
















})
