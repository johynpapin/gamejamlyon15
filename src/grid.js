import Cell from './cell.js'

export default class Grid {
  constructor (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.cells = this.createCells()
    this.ingredients = []
  }

  createCells () {
    const cells = []

    for (let i = 0; i < this.sizeX; i++) {
      cells[i] = []

      for (let j = 0; i < this.sizeY; i++) {
        cells[i][j] = new Cell(i, j, null, null)
      }
    }

    return cells
  }

  initSprite (resources) {

  }

  draw (resources) {
  }
}
