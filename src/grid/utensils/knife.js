import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Knife extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.states = utensils.knife.states
    this.transitions = utensils.knife.transitions
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
