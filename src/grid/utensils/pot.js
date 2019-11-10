import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Pot extends Utensil {
  constructor (cell, targetCell) {
    super(cell, targetCell)
    this.state = utensils.pot.state
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
