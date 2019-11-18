/* global describe, it */
/* eslint-disable no-undef */


const chai  = window.chai
const expect = chai.expect


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
})

describe('The computerClick() function', () => {
  it('should return a boolean', () => {
    expect(checkWin([0, 1, 2])).to.be.a('boolean')
    expect(checkWin([0, 0, 0])).to.be.a('boolean')
    expect(checkWin([])).to.be.a('boolean')
  })

})

describe('The getBoardState() function', () => {

  it('should an array with length 9', () => {
    expect(getBoardState()).to.have.length(9)
  })

  // it('should return the correct Array', () => {
  //   expect(getBoardState([0, 1], [2, 8])).to.deep.eq(['X', 'X', 'O', 3, 4, 5, 6, 7, 'O'])
  //   expect(getBoardState([0, 7, 8], [2, 3, 5])).to.deep.eq(['X', 1, 'O', 'O', 4, 'O', 6, 'X', 'X'])
  //   expect(getBoardState([], [])).to.deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8])
  // })

})
