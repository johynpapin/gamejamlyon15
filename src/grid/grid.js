import Cell from './cell'
import TileNeutral from './tiles/tile-neutral'
import TileEmpty from './tiles/tile-empty'
import MovingTile from './tiles/moving-tile'
// import TileConnector from './tiles/tile-connector'

export default class Grid {
  constructor (level) {
    this.sizeX = level.sizeX + 2
    this.sizeY = level.sizeY + 2
    this.cells = this.createCells(level)
    this.load(level)
    this.ingredients = []
  }

  createCells (level) {
    const cells = []

    for (let x = 0; x < this.sizeX; x++) {
      cells.push([])

      for (let y = 0; y < this.sizeY; y++) {
        if (x === this.sizeX - 2 && y === this.sizeY - 2) {
          // Empty tile (bottom right)
          cells[x].push(new Cell(x, y, new TileEmpty(x, y), null))
        } else if ((x === this.sizeX - 2 && y < this.sizeY - 2) || (y === this.sizeY - 2 && x < this.sizeX - 2)) {
          // Connector tile
          // cells[x].push(new Cell(x, y, new TileConnector(x, y), null))
        } else if (x === this.sizeX - 1 || y === this.sizeY - 1) {
          // Conveyor belt
          const target = { x: x, y: y }
          if (x === this.sizeX - 1) {
            target.y--
          } else {
            target.x++
          }
          cells[x].push(new Cell(x, y, new MovingTile(x, y, target, true), null))
        } else {
          // Normal grid
          cells[x].push(new Cell(x, y, new TileNeutral(x, y), null))
        }
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

  isFullUtensil (x, y) {
    const cell = this.cells[x][y]

    return cell.utensil !== null && !cell.utensil.isFree()
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
