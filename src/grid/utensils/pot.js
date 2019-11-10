import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Pot extends Utensil {
  constructor (cell) {
    super(cell)
    this.state = utensils.pot.state
    this.hasOtherResult = false
  }

  createTransitions () {
    const transitions = new Map()

    return transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.pot.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}