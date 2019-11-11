import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Fryer extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.states = utensils.fryer.states
    this.transitions = utensils.fryer.transitions
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
