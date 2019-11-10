import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Fryer extends Utensil {
  constructor (cell, targetCell) {
    super(cell, targetCell)
    this.state = utensils.fryer.state
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], [this.state])
    transitions.set([utensils.peeler.state], [this.state])
    transitions.set([utensils.pot.state], [this.state])

    return transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.fryer.texture)
      this.sprite.zIndex = 1
      container.addChild(this.sprite)
    }

    this.sprite.x = this.cell.x * this.sprite.width
    this.sprite.y = this.cell.y * this.sprite.height
  }
}
