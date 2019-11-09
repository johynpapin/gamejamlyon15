import Cell from './cell'
import TileNeutral from './tiles/tile-neutral'
import TileEmpty from './tiles/tile-empty'
// import TileConnector from './tiles/tile-connector'

export default class Grid {
  constructor (level) {
    this.sizeX = level.sizeX + 2
    this.sizeY = level.sizeY + 2
    this.level = level
    this.cells = this.createCells()
    this.load()
    this.ingredients = []
  }

  possibilies () {
    return this.level.ingredients
  }

  createCells () {
    const cells = []

    for (let x = 0; x < this.sizeX; x++) {
      cells.push([])

      for (let y = 0; y < this.sizeY; y++) {
        if (x === this.sizeX - 3 && y === this.sizeY - 3) {
          cells[x].push(new Cell(x, y, new TileEmpty(x, y), null))
        } else if (x === this.sizeX - 3 || y === this.sizeY - 3) {
          // TODO: add direction to the TileConnector
          // cells[x].push(new Cell(x, y, new TileConnector(x, y), null))
        } else {
          cells[x].push(new Cell(x, y, new TileNeutral(x, y), null))
        }
      }
    }

    return cells
  }

  load () {
    for (const [key, value] of this.level.tileMap) {
      this.cells[key.x][key.y].tile = value
    }
  }

  isFree (x, y) {
    const cell = this.cells[x][y]

    return cell.ingredient === null && (cell.utensil === null || cell.utensil.isFree())
  }

  hasIngredient (x, y) {
    const cell = this.cells[x][y]

    return cell.ingredient !== null
  }

  isFullUtensil (x, y) {
    const cell = this.cells[x][y]

    return cell.utensil !== null && !cell.utensil.isFree()
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
