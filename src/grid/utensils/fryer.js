import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Fryer extends Utensil {
  constructor (cell) {
    super(cell)
    this.state = utensils.fryer.state
    this.hasOtherResult = false
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], this.state)
    transitions.set([utensils.peeler.state], this.state)
    transitions.set([utensils.pot.state], this.state)

    return transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.fryer.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}
