import Cell from './cell'
import TileNeutral from './tiles/tile-neutral'

export default class Grid {
  constructor (level) {
    this.sizeX = level.sizeX
    this.sizeY = level.sizeY
    this.cells = this.createCells(level)
    this.load(level)
    this.ingredients = []
  }

  createCells (level) {
    const cells = []

    for (let x = 0; x < this.sizeX; x++) {
      cells.push([])

      for (let y = 0; y < this.sizeY; y++) {
        cells[x].push(new Cell(x, y, new TileNeutral(x, y), null))
      }
    }

    return cells
  }

  isFree (x, y) {
    const cell = this.cells[x][y]

    return cell.ingredient === null && (cell.utensil === null || cell.utensil.isFree())
  }

  hasIngredient (x, y) {
    const cell = this.cells[x][y]

    return cell.ingredient !== null
  }

  load (level) {
    for (const [key, value] of level.tileMap) {
      this.cells[key.x][key.y].tile = value
    }
  }

  draw (container, resources, offset) {
    for (const ingredient of this.ingredients) {
      ingredient.draw(container, resources, offset)
    }

    for (const line of this.cells) {
      for (const cell of line) {
        cell.draw(container, resources, offset)
      }
    }
  }
}
