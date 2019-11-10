import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Knife extends Utensil {
  constructor () {
    super()
    this.state = utensils.knife.state
    this.hasOtherResult = false
  }

  createTransitions () {
    const transitions = new Map()

    return transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.knife.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}
