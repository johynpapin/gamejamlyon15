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

  apply (grid, id) {
    const cell = grid.cells[this.x][this.y]
    const beanY = grid.sizeY

    if (cell.ingredient && this.targetX === -1 && this.targetY === beanY - 1) {
      cell.ingredient.sprite.visible = false
      cell.ingredient = null
      return null
    } else if (cell.ingredient && this.targetX === -1 && this.targetY === grid.sizeY - 3) {
      grid.gridManager.gameManager.check(cell.ingredient)
    } else if (!cell.ingredient || cell.ingredient.lastId === id) {
      return null
    } else if (grid.isFree(this.targetX, this.targetY)) {
      const currentIngredient = grid.cells[this.x][this.y].ingredient
      currentIngredient.x = this.targetX
      currentIngredient.y = this.targetY
      currentIngredient.lastId = id

      grid.cells[this.targetX][this.targetY].ingredient = currentIngredient
      cell.ingredient = null

      return null
    } else {
      return [grid.cells[this.targetX][this.targetY].tile]
    }
  }

  draw (container, resources) {
    if (!this.sprite) {
      if (this.conveyorBelt) {
        if (this.x === this.y) {
          this.sprite = new PIXI.AnimatedSprite(resources.rollTurn.spritesheet.animations['Roll_Turn-Sheet'])
          this.sprite.animationSpeed = 0.1
          this.sprite.zIndex = 3
          this.sprite.play()
        } else {
          this.sprite = new PIXI.AnimatedSprite(resources.rollLeft.spritesheet.animations['Roll_left_v1-Sheet'])
          this.sprite.animationSpeed = 0.1
          this.sprite.play()

          if (this.x !== this.targetX) {
            this.sprite.angle = 90
            this.sprite.pivot.y = this.sprite.height
          }
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

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }
}
