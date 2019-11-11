import * as PIXI from 'pixi.js'
import Ingredient from './ingredient'

export default class Potato extends Ingredient {
  draw (delta, container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.potato.texture)
      this.sprite.anchor.set(0.5)
      container.addChild(this.sprite)
    } else if (this.states === ['peel', 'fry']) {
      this.sprite = new PIXI.Sprite(resources.potatoFries.texture)
    } else if (this.states === ['peel']) {

    }

    super.draw(container, delta)
  }
}
