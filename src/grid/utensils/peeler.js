import * as PIXI from 'pixi.js'
import utensils from './utensils'

export default class Peeler {
  constructor () {
    this.state = utensils.peeler.state
    this.hasOtherResult = true
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], this.state)
    transitions.set([utensils.pot.state], this.state)
    transitions.set([this.state], this.state)

    return transitions
  }

  produce (ingredient) {
    // TODO: create new ingredient ?
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.peeler.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width + offset.x
    this.sprite.y = this.y * this.sprite.height + offset.y
  }
}
