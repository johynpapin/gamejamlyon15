import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Peeler extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.states = utensils.peeler.states
    this.transitions = utensils.peeler.transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.peeler.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.cell.x * this.sprite.width
    this.sprite.y = this.cell.y * this.sprite.height
  }
}
