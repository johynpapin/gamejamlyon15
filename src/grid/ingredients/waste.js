import * as PIXI from 'pixi.js'
import Ingredient from './ingredient'

export default class Waste extends Ingredient {
  draw (container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.waste.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }
}
