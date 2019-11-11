import * as PIXI from 'pixi.js'
import Ingredient from './ingredient'

export default class Potato extends Ingredient {
  draw (delta, container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.potato.texture)
      this.sprite.anchor.set(0.5)
      container.addChild(this.sprite)
    } else {
      if (this.states.includes('peel')) {
        this.sprite.texture = resources.potatoPeel.texture
      }
      if (this.states.includes('peeling')) {
        this.sprite.texture = resources.potatoPeeling.texture
      }
      if (this.states.includes('peel') && this.states.includes('fry')) {
        this.sprite.texture = resources.potatoFries.texture
      }
      if (this.states.includes('peeling') && this.states.includes('fry')) {
        this.sprite.texture = resources.potatoChips.texture
      }
    }

    super.draw(container, delta)
  }
}
