import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Knife extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.transitions = utensils.knife.transitions
  }

  draw (container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.AnimatedSprite(resources.knife.spritesheet.animations['Couteau_Top_Down_v1-Sheet'])
      this.sprite.animationSpeed = 0.1
      this.sprite.play()
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height

    this.drawLoadingBar(container, this.sprite.x, this.sprite.y)
  }
}
