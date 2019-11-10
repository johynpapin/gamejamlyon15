import Cell from './cell'
import MovingTile from './tiles/tile-moving'
import TileConnector from './tiles/tile-connector'
import TileEmpty from './tiles/tile-empty'
import TileNeutral from './tiles/tile-neutral'

export default class Grid {
  constructor (gridManager, level) {
    this.gridManager = gridManager
    this.sizeX = level.sizeX + 2
    this.sizeY = level.sizeY + 2
    this.possibilies = level.ingredients
    this.cells = this.createCells()
    this.loadUtensils(level)
  }

  createCells () {
    const cells = []

    for (let x = 0; x < this.sizeX; x++) {
      cells.push([])

      for (let y = 0; y < this.sizeY; y++) {
        if (x === this.sizeX - 2 && y === this.sizeY - 2) {
          // Empty tile (bottom right)
          cells[x].push(new Cell(x, y, new TileEmpty(x, y)))
        } else if ((x === this.sizeX - 2 && y < this.sizeY - 2) || (y === this.sizeY - 2 && x < this.sizeX - 2)) {
          // Connector tile
          const target = { x: x, y: y }
          if (x === this.sizeX - 2) {
            target.x--
          } else {
            target.y--
          }
          cells[x].push(new Cell(x, y, new TileConnector(x, y, target)))
        } else if (x === this.sizeX - 1 || y === this.sizeY - 1) {
          // Conveyor belt
          const target = { x: x, y: y }
          if (x === this.sizeX - 1 && y === this.sizeY - 1) {
            target.x--
          } else if (x === this.sizeX - 1) {
            target.y++
          } else {
            target.x--
          }
          cells[x].push(new Cell(x, y, new MovingTile(x, y, target, true)))
        } else {
          // Normal grid
          cells[x].push(new Cell(x, y, new TileNeutral(x, y)))
        }
      }
    }

    return cells
  }

  loadUtensils (level) {
    for (const [key, value] of level.utensilsMap) {
      const cell = key.cell
      const targetCell = this.cells[key.targetCell.x][key.targetCell.y]
      let targetOpt = null
      if (key.targetOpt != null) {
        targetOpt = this.cells[key.targetOpt.x][key.targetOpt.y]
      }

      this.cells[cell.x][cell.y].addUtensil(value, targetCell, targetOpt)
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

  draw (container, resources) {
    for (const line of this.cells) {
      for (const cell of line) {
        cell.draw(container, resources)
      }
    }
  }
}
