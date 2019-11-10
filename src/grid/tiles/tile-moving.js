import * as PIXI from 'pixi.js'
import Tile from './tile'

// N : 0
// E : 1
// S : 2
// W : 3

export default class MovingTile extends Tile {
  constructor (x, y, nextCell, conveyorBelt = false) {
    super(x, y)
    this.targetX = nextCell.x
    this.targetY = nextCell.y
    this.conveyorBelt = conveyorBelt
  }

  apply (grid) {
    if (this.targetX < 0 || grid.cells[this.x][this.y].ingredient === null) {
    // TODO
    } else if (grid.isFree(this.targetX, this.targetY)) {
      var currentIngredient = grid.cells[this.x][this.y].ingredient
      currentIngredient.x = this.targetX
      currentIngredient.y = this.targetY
      // grid.cells[this.targetX][this.targetY].ingredient = grid.cells[this.x][this.y].ingredient
      grid.cells[this.targetX][this.targetY].ingredient = currentIngredient
      grid.cells[this.x][this.y].ingredient = null
      return null
    } else {
      return [grid.cells[this.targetX][this.targetY].tile]
    }
  }

  draw (container, resources) {
    if (!this.sprite) {
      if (this.conveyorBelt) {
        this.sprite = new PIXI.Sprite(resources.rollDown.texture)
        this.sprite2 = new PIXI.Sprite(resources.rollLeft.texture)
        this.sprite2.visible = false
        container.addChild(this.sprite2)

        if (this.x === this.targetX) {
          this.sprite.visible = true
          this.sprite2.visible = false
        } else {
          this.sprite.visible = false
          this.sprite2.visible = true
        }
      } else {
        if (this.x === this.targetX) {
          if (this.y < this.targetY) {
            this.sprite = new PIXI.Sprite(resources.arrowTop.texture)
          } else {
            this.sprite = new PIXI.Sprite(resources.arrowDown.texture)
          }
        } else {
          if (this.x < this.targetX) {
            this.sprite = new PIXI.Sprite(resources.arrowRight.texture)
          } else {
            this.sprite = new PIXI.Sprite(resources.arrowLeft.texture)
          }
        }
      }
      container.addChild(this.sprite)
    }

    if (this.conveyorBelt) {
      this.sprite2.x = this.x * this.sprite2.width
      this.sprite2.y = this.y * this.sprite2.height

      if (this.x === this.targetX) {
        this.sprite.visible = true
        this.sprite2.visible = false
      } else {
        this.sprite.visible = false
        this.sprite2.visible = true
      }
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }
}
