import * as PIXI from 'pixi.js'
import Tile from './tile'

class TileCold extends Tile {
  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.coldTile)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}
