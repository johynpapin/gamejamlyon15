import * as PIXI from 'pixi.js'
import ustensils from './ustensils'

export default class Peeler {
  constructor () {
    this.state = ustensils.peeler.state
    this.hasOtherResult = true
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([ustensils.knife.state], this.state)
    transitions.set([ustensils.pot.state], this.state)
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
