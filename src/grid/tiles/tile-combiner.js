import * as PIXI from 'pixi.js'
import Tile from './tile'
import Pair from '../grid/pair'

export default class TileCombiner extends Tile {
  constructor (x, y, nextCell) {
    super(x, y)
    this.targetX = nextCell.x
    this.targetY = nextCell.y
    this.waitingIngredient = null
  }

  apply (grid, id) {
    const cell = grid.cells[this.x][this.y]

    if (cell.ingredient && !this.waitingIngredient) {
      this.waitingIngredient = cell.ingredient
      cell.ingredient = null

      return null
    } else if (cell.ingredient && this.waitingIngredient) {
      if (grid.cells[this.targetX][this.targetY].isFree()) {
        const pair = new Pair(this.targetX, this.targetY, this.waitingIngredient, cell[this.x][this.y].ingredient)

        grid.cells[this.targetX][this.targetY].ingredient = pair

        return null
      } else {
        return [grid.cells[this.targetX][this.targetY].tile]
      }
    }
  }

  draw (container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.AnimatedSprite(resources.mainTileNeutral.spritesheet.animations['Main_Tile_Neutral_v2-Sheet'])
      this.sprite.animationSpeed = 0.1
      this.sprite.play()
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }
}
