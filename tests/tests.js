/* global describe, it */
/* eslint-disable no-undef */

const chai = window.chai
const expect = chai.expect

// ---- testing for Computer logic

describe('The getBoardState() function', () => {
  it('should an array with length 9', () => {
    expect(getBoardState()).to.have.length(9)
  })
  it('should be an array', () => {
    expect(getBoardState()).to.be.an('array')
  })
})

describe('The minimax() recursive function', () => {
  it('should return an object', () => {
    expect(minimax(['X', 1, 2, 3, 4, 5, 6, 7, 8], 'O')).to.be.an('object')
    expect(minimax([], 'X')).to.be.an('object')
    expect(minimax(['X', 1, 2, 3, 4, 5, 6, 7, 8], 'O')).to.be.an('object')
  })
  it('should return the correct object', () => {
    expect(minimax(['X', 1, 2, 'O', 'O', 5, 6, 7, 'X'], 'O')).to.deep.eq({index: 1, score: 10})
    expect(minimax(['X', 'X', 2, 3, 'O', 5, 6, 7, 8], 'O')).to.deep.eq({index: 2, score: 0})
    expect(minimax(['X', 1, 2, 3, 'O', 5, 'X', 7, 8], 'O')).to.deep.eq({index: 3, score: 0})
    expect(minimax(['O', 1, 2, 3, 'O', 5, 'X', 'O', 'X'], 'O')).to.deep.eq({index: 1, score: 10})
    expect(minimax(['X', 'X', 2, 'O', 'O', 5, 6, 7, 8], 'X')).to.deep.eq({ index: 2, score: -10})
  })
  it('should return no .index with empty string or empty array', () => {
    expect(minimax(['X', 'X', 2, 'O', 'O', 5, 6, 7, 8], '')).to.deep.eq({score: 0})
    expect(minimax([], 'X')).to.deep.eq({score: 0})
  })

})

describe('The availableSquares() function', () => {
  it('should return the available Squares', () => {
    expect(avialableSquares(['X', 'O', 2, 3, 4, 5, 6, 7, 8])).to.deep.eq([2, 3, 4, 5, 6, 7, 8])
    expect(avialableSquares(['X', 'O', 2, 3, 4, 5, 6, 7, 8])).to.deep.eq([2, 3, 4, 5, 6, 7, 8])
    expect(avialableSquares(['X', 'O', 'O', 'X', 'X', 5, 6, 'O', 8])).to.deep.eq([5, 6, 8])
  })
  it('should return an array', () => {
    expect(avialableSquares(['X', 'O', 2, 3, 4, 5, 6, 7, 8])).to.be.an('array')
  })
})

describe('The winning() function', () => {
  it('should return a boolean', () => {
    expect(winning(['X', 1, 2, 3, 4, 5, 6, 7, 8], 'O')).to.be.an('boolean')
    expect(winning([], 'X')).to.be.an('boolean')
  })
  it('should return the correct boolean', () => {
    expect(winning([], 'X')).to.be.false
    expect(winning(['X', 1, 2, 3, 4, 5, 6, 7, 8], 'O')).to.be.false
    expect(winning(['X', 'X', 'X', 3, 'O', 'O', 6, 7, 8], 'O')).to.be.false
    expect(winning(['X', 'X', 'X', 3, 'O', 'O', 6, 7, 8], 'X')).to.be.true
  })

})

// ---- Testing for results logic

describe('The checkWin() function', () => {
  it('should return a boolean', () => {
    expect(checkWin([0, 1, 2])).to.be.a('boolean')
    expect(checkWin([0, 0, 0])).to.be.a('boolean')
    expect(checkWin([])).to.be.a('boolean')
  })
  it('should return the correct boolean', () => {
    expect(checkWin([0, 1, 2])).to.eq(true)
    expect(checkWin([3, 4, 5])).to.eq(true)
    expect(checkWin([6, 7, 8])).to.eq(true)
    expect(checkWin([0, 3, 6])).to.eq(true)
    expect(checkWin([1, 4, 7])).to.eq(true)
    expect(checkWin([2, 5, 8, 3, 9])).to.eq(true)
    expect(checkWin([0, 4, 8, 2, 1])).to.eq(true)
    expect(checkWin([2, 4, 6, 1, 5])).to.eq(true)
    expect(checkWin([0, 3, 4])).to.eq(false)
    expect(checkWin([2, 1, 3])).to.eq(false)
    expect(checkWin([0, 8, 6])).to.eq(false)
  })
  it('should return false if given an empty array', () => {
    expect(checkWin([])).to.eq(false)
  })
  it('should return a boolean', () => {
    expect(checkWin([0, 1, 2])).to.be.a('boolean')
    expect(checkWin([0, 0, 0])).to.be.a('boolean')
    expect(checkWin([])).to.be.a('boolean')
  })
})

describe('The checkDraw() function', () => {
  it('should return a boolean', () => {
    expect(checkDraw()).to.be.an('boolean')
  })
})
