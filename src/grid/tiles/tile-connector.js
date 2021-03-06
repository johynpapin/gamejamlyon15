import * as PIXI from 'pixi.js'
import MovingTile from './tile-moving'

export default class TileConnector extends MovingTile {
  constructor (x, y, nextCell, connected = false) {
    super(x, y, nextCell, false)
    this.connected = connected
  }

  switchConnect () {
    this.connected = !this.connected
  }

  draw (container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.AnimatedSprite(resources.launcher.spritesheet.animations['Sp_Launcher_v1-Sheet'])
      this.sprite.animationSpeed = 0.1
      this.sprite.play()
      if (this.x === this.targetX) {
        if (this.y < this.targetY) {
          //          this.sprite = new PIXI.Sprite(resources.arrowTop.texture)
        } else {
          this.sprite.angle = 90
          this.sprite.pivot.y = this.sprite.height
          // this.sprite = new PIXI.Sprite(resources.arrowDown.texture)
        }
      } else {
        if (this.x < this.targetX) {
          // this.sprite = new PIXI.Sprite(resources.arrowRight.texture)
        } else {
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
