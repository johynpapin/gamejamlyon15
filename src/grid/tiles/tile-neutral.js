import * as PIXI from 'pixi.js'
import Tile from './tile'

export default class TileNeutral extends Tile {
  draw (resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.mainTileNeutral)
    }

    this.sprite.x = this.x * 32 + offset.x
    this.sprite.y = this.y * 32 + offset.y
  }
}
