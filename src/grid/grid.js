import Cell from './cell'

export default class Grid {
  constructor (sizeX, sizeY, level) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.cells = this.createCells(level)
    this.ingredients = []
  }

  createCells (level) {
    const cells = []

    for (let i = 0; i < this.sizeX; i++) {
      cells[i] = []

      for (let j = 0; i < this.sizeY; i++) {
        cells[i][j] = new Cell(i, j, null, null)
      }
    }

    this.load(level)

    return cells
  }

  load (level) {
    for (const [key, value] of level.tileMap) {
      this.cells[key.x][key.y].tile = value
    }
  }

  initSprite (resources) {

  }

  draw (resources, offset) {
    for (const ingredient of this.ingredients) {
      ingredient.draw(resources, offset)
    }

    for (const line of this.cells) {
      for (const cell of line) {
        cell.draw(resources, offset)
      }
    }
  }
}
