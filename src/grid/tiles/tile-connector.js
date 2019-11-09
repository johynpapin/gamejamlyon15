import * as PIXI from 'pixi.js'
import MovingTile from './moving-tile'

export default class TileConnector extends MovingTile {
  constructor (x, y, nextCell, connected = false) {
    super(x, y, nextCell, false)
    this.connected = connected
  }

  switchConnect () {
    this.connected = !this.connected
    console.log(this.connected)
  }

  draw (container, resources) {
    if (!this.sprite) {
      if (this.x === this.targetX) {
        if (this.y < this.targetY) {
          this.sprite = new PIXI.Sprite(resources.arrowRight.texture)
        } else {
          this.sprite = new PIXI.Sprite(resources.arrowLeft.texture)
        }
      } else {
        if (this.x < this.targetX) {
          this.sprite = new PIXI.Sprite(resources.arrowTop.texture)
        } else {
          this.sprite = new PIXI.Sprite(resources.arrowDown.texture)
        }
      }
      container.addChild(this.sprite)

      this.sprite.interactive = true
      this.sprite.on('click', this.onClick.bind(this))
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }

  onClick () {
    this.switchConnect()
  }
}
