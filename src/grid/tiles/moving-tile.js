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

  draw (container, resources) {
    if (!this.sprite) {
      if (this.conveyorBelt) {
        if (this.x === this.targetX) {
          this.sprite = new PIXI.Sprite(resources.rollDown.texture)
        } else {
          this.sprite = new PIXI.Sprite(resources.rollLeft.texture)
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
