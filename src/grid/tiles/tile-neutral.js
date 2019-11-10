import * as PIXI from 'pixi.js'
import Tile from './tile'

export default class TileNeutral extends Tile {
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
