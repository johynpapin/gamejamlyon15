import * as PIXI from 'pixi.js'
import Ingredient from './ingredient'

export default class Waste extends Ingredient {
  draw (delta, container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.waste.texture)
      this.sprite.anchor.set(0.5)
      container.addChild(this.sprite)
    }

    super.draw(delta)
  }
}
