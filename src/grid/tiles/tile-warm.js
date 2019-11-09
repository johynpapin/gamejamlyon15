import * as PIXI from 'pixi.js'
import Tile from './tile'

class TileWarm extends Tile {
  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.warnTile)
      this.container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}
