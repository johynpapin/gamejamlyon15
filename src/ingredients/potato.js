import * as PIXI from 'pixi.js'
import Ingredient from './ingredient'

export default class Potato extends Ingredient {
  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.potato.texture)
      this.sprite.anchor.set(0.5)
      container.addChild(this.sprite)
    }

    super.draw()
  }
}
